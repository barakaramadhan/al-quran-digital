import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSurahDetail, toggleBookmark } from "../features/quranSlice";
import { SkeletonAyat } from "../components/Skeleton";
import { 
  ArrowLeft, Settings2, Play, Pause, X, 
  Share2, Bookmark, CheckCircle2, Volume2, Mic2
} from 'lucide-react';

const Detail = () => {
  const { nomor } = useParams();
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const { detailSurah, loading, bookmarks } = useSelector((state) => state.quran);
  
  const [localLastRead, setLocalLastRead] = useState(JSON.parse(localStorage.getItem("lastRead")));
  const [selectedQori, setSelectedQori] = useState("01"); 
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioTitle, setAudioTitle] = useState("");

  const qoriList = [
    { id: "01", name: "Misyari Rasyid Al-Afasy" },
    { id: "02", name: "Abdullah Al-Juhany" },
    { id: "03", name: "Abdurrahman As-Sudais" },
    { id: "04", name: "Sa'ad Al-Ghamidi" },
    { id: "05", name: "Maher Al-Muaiqly" },
  ];

  useEffect(() => {
    dispatch(getSurahDetail(nomor));
    window.scrollTo(0, 0);
  }, [dispatch, nomor]);

  // Efek untuk handle play/pause secara imperatif agar lebih ringan
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentAudio]);

  const playAudio = (url, title) => {
    if (currentAudio === url) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentAudio(url);
      setAudioTitle(title);
      setIsPlaying(true);
    }
  };

  const handleShare = (ayat) => {
    const text = `*${detailSurah.namaLatin} - Ayat ${ayat.nomorAyat}*\n\n${ayat.teksArab}\n\n_"${ayat.teksIndonesia}"_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleLastRead = (ayat) => {
    const data = { surah: detailSurah.namaLatin, ayat: ayat.nomorAyat, nomorSurah: detailSurah.nomor };
    localStorage.setItem("lastRead", JSON.stringify(data));
    setLocalLastRead(data);
  };

  if (loading || !detailSurah) return <div className="p-10 container mx-auto"><SkeletonAyat /></div>;

  return (
    // PERBAIKAN: Menggunakan warna adaptif (bg-slate-50 untuk light, bg-slate-950 untuk dark)
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 pb-32 transition-colors duration-300">
      
      <audio 
        ref={audioRef} 
        src={currentAudio} 
        onEnded={() => setIsPlaying(false)} 
        preload="auto"
      />

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-5xl">
        
        {/* --- NAV BAR --- */}
        <nav className="flex justify-between items-center mb-10 sticky top-0 z-30 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md py-4 px-2 rounded-b-xl">
          <Link to="/" className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-105">
              <ArrowLeft size={20} />
          </Link>
          <div className="text-center">
            <h2 className="text-sm font-bold tracking-widest uppercase">{detailSurah.namaLatin}</h2>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase">{detailSurah.arti}</p>
          </div>
          {/* PERBAIKAN: Ganti Ikon Settings ke Mic2 agar lebih relevan dengan Qori */}
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-500 shadow-sm transition-all hover:bg-emerald-50"
          >
            <Mic2 size={20} />
          </button>
        </nav>

        {/* --- HERO HEADER --- */}
        <section className="relative mb-16">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-emerald-900 p-10 text-center shadow-xl text-white">
            <h1 className="font-arabic text-6xl md:text-7xl mb-4">{detailSurah.nama}</h1>
            <h3 className="text-2xl font-bold mb-6">{detailSurah.namaLatin}</h3>
            <button 
              onClick={() => playAudio(detailSurah.audioFull[selectedQori], `Surah ${detailSurah.namaLatin}`)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/40 transition-all"
            >
              {isPlaying && currentAudio === detailSurah.audioFull[selectedQori] ? <Pause size={18} fill="white"/> : <Play size={18} fill="white"/>}
              <span className="text-xs font-bold uppercase tracking-wider">Putar Satu Surat</span>
            </button>
          </div>
        </section>

        {/* --- AYAT LIST --- */}
        <main className="space-y-6">
          {detailSurah.ayat.map((ayat) => {
            const isBookmarked = bookmarks.some(b => b.nomorAyat === ayat.nomorAyat && b.surah === detailSurah.namaLatin);
            const activeLastRead = localLastRead?.nomorSurah === detailSurah.nomor && localLastRead?.ayat === ayat.nomorAyat;

            return (
              <article key={ayat.nomorAyat} className={`bg-white dark:bg-slate-900/50 rounded-[2rem] border transition-all p-6 md:p-8 ${activeLastRead ? 'border-emerald-500 ring-1 ring-emerald-500/20' : 'border-slate-200 dark:border-slate-800'}`}>
                
                <div className="flex justify-between items-center mb-8">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold ${activeLastRead ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    {ayat.nomorAyat}
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => playAudio(ayat.audio[selectedQori], `Ayat ${ayat.nomorAyat}`)} className="p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-600 transition-all">
                      <Volume2 size={18} />
                    </button>
                    <button onClick={() => handleShare(ayat)} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-all">
                      <Share2 size={18} />
                    </button>
                    <button 
                      onClick={() => dispatch(toggleBookmark({ ...ayat, surah: detailSurah.namaLatin }))}
                      className={`p-2.5 rounded-xl transition-all ${isBookmarked ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : 'text-slate-400'}`}
                    >
                      <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>

                <div className="mb-8 text-right">
                  <p className="font-arabic text-3xl md:text-4xl leading-[2.8] text-slate-800 dark:text-slate-50">
                    {ayat.teksArab}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">{ayat.teksLatin}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{ayat.teksIndonesia}</p>
                  
                  <div className="flex justify-end pt-4">
                    <button 
                      onClick={() => handleLastRead(ayat)}
                      className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-all ${activeLastRead ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' : 'text-slate-400 hover:text-emerald-600'}`}
                    >
                      {activeLastRead ? "Dibaca" : "Tandai Terakhir Baca"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </main>
      </div>

      {/* --- FIXED PLAYER --- */}
      {currentAudio && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-50">
          <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shrink-0">
                {isPlaying ? <Volume2 size={20} className="animate-bounce" /> : <Volume2 size={20} />}
              </div>
              <div className="truncate">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Memutar {detailSurah.namaLatin}</p>
                <p className="text-sm font-bold truncate dark:text-white">{audioTitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-all">
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </button>
              <button onClick={() => { setCurrentAudio(null); setIsPlaying(false); }} className="p-3 text-slate-400 hover:text-red-500 transition-all">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL QORI --- */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Pilih Qori</h3>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"><X size={20}/></button>
            </div>
            <div className="grid gap-2">
              {qoriList.map((q) => (
                <button
                  key={q.id}
                  onClick={() => { setSelectedQori(q.id); setIsSettingsOpen(false); }}
                  className={`w-full p-4 rounded-xl text-left text-sm font-bold transition-all border ${selectedQori === q.id ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-slate-50 dark:bg-slate-800 border-transparent hover:border-emerald-500'}`}
                >
                  {q.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;