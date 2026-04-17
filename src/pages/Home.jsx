import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSurah, setSearchTerm } from "../features/quranSlice";
import { Link } from "react-router-dom";
import { SkeletonCard } from "../components/Skeleton";

// PENERIMA PROPS DARI APP.JSX
const Home = ({ isDark, setIsDark }) => {
  const dispatch = useDispatch();
  const { surahList, loading, searchTerm } = useSelector((state) => state.quran);

  const [showTopBtn, setShowTopBtn] = useState(false);
  const lastRead = JSON.parse(localStorage.getItem("lastRead"));

  useEffect(() => {
    dispatch(getAllSurah());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredSurah = surahList.filter((s) =>
    s.namaLatin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- ICONS ---
  const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
  const IconBook = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
  const IconBookmark = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>;
  const IconMoon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
  const IconSun = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
  const IconArrowUp = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-700 selection:bg-emerald-500/30">
      <div className="container mx-auto px-4 md:px-8 py-10 max-w-7xl animate-fade-in">

        {/* --- NAVBAR / HEADER --- */}
        <header className="flex justify-between items-center mb-12">
          <div className="group cursor-default">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-lg rotate-3 group-hover:rotate-0 transition-transform duration-300">Q</span>
              <span>URANKU</span>
            </h1>
            <p className="text-[10px] font-bold tracking-[0.3em] text-emerald-600 dark:text-emerald-500 uppercase mt-1">Light of Guidance</p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/bookmark" className="relative group">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-200 transition-all duration-300 shadow-sm">
                <IconBookmark />
              </div>
            </Link>

            {/* TOMBOL YANG SUDAH DIPERBAIKI: Menggunakan setIsDark dari props */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="relative z-50 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 transition-all duration-300 focus:outline-none shadow-sm cursor-pointer active:scale-95"
            >
              {/* Menampilkan ikon secara bergantian berdasarkan State isDark */}
              {isDark ? <IconSun /> : <IconMoon />}
            </button>
          </div>
        </header>

        {/* --- HERO SECTION --- */}
        <section className="mb-12 space-y-8">
          <div className="w-full">
            {lastRead ? (
              <Link to={`/surat/${lastRead.nomorSurah}`} className="block">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-emerald-600 dark:to-emerald-900 p-8 text-white shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500 group animate-slide-up">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/20 group-hover:scale-110 transition-transform duration-500">
                        <IconBook />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100/70 mb-1">Lanjutkan Membaca</p>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tighter italic">{lastRead.surah}</h3>
                        <p className="text-sm mt-1 opacity-80">
                          Ayat <span className="font-bold">{lastRead.ayat}</span> <span className="mx-2 opacity-30">|</span> Terakhir dibuka
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-12 h-12 items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover:bg-white group-hover:text-emerald-700 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                  <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                </div>
              </Link>
            ) : (
              <div className="w-full bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 p-10 rounded-[2.5rem] text-slate-400 text-center text-sm italic animate-fade-in">
                Pilih surah untuk memulai keberkahan hari ini.
              </div>
            )}
          </div>

          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight uppercase">Daftar Surah</h2>
            <div className="relative group w-full max-w-[280px]">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <IconSearch />
              </div>
              <input
                type="text"
                placeholder="Cari surah..."
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 focus:border-emerald-500 outline-none transition-all text-sm dark:text-white placeholder:text-slate-400/60 shadow-sm"
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
            </div>
          </div>
        </section>

        {/* --- SURAH LIST GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [...Array(12)].map((_, i) => <SkeletonCard key={i} />)
            : filteredSurah.map((surah) => (
                <Link key={surah.nomor} to={`/surat/${surah.nomor}`}>
                  <div className="group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 relative overflow-hidden active:scale-95 animate-slide-up">
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-[360deg] shadow-sm">
                          {surah.nomor}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-slate-800 dark:text-white text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                            {surah.namaLatin}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                              {surah.arti}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 font-arabic tracking-wide">
                          {surah.nama}
                        </h3>
                        <p className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em] mt-2">
                          {surah.jumlahAyat} Verses
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                  </div>
                </Link>
              ))}
        </div>
      </div>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-emerald-600 dark:bg-emerald-500 text-white w-14 h-14 rounded-2xl shadow-2xl hover:bg-emerald-700 dark:hover:bg-emerald-400 hover:-translate-y-2 active:scale-90 transition-all z-50 flex items-center justify-center cursor-pointer group"
        >
          <div className="group-hover:animate-bounce">
            <IconArrowUp />
          </div>
        </button>
      )}
    </div>
  );
};

export default Home;