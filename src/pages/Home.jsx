import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSurah, setSearchTerm } from "../features/quranSlice";
import { Link } from "react-router-dom";
import { SkeletonCard } from "../components/Skeleton";

const Home = ({ isDark, setIsDark }) => {
  const dispatch = useDispatch();
  const { surahList, loading, searchTerm } = useSelector((state) => state.quran);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const lastRead = JSON.parse(localStorage.getItem("lastRead"));

  useEffect(() => {
    dispatch(getAllSurah());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
  const IconList = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-700">
      <div className="container mx-auto px-4 md:px-8 py-10 max-w-7xl animate-fade-in">
        
        {/* --- HEADER --- */}
        <header className="flex justify-between items-center mb-12">
          <div className="group">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-lg rotate-3">Q</span>
              <span>URANKU</span>
            </h1>
            <p className="text-[10px] font-bold tracking-[0.3em] text-emerald-600 uppercase mt-1">Light of Guidance</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/bookmark" className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-all">
              <IconBookmark />
            </Link>
            <button onClick={() => setIsDark(!isDark)} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-all">
              {isDark ? <IconSun /> : <IconMoon />}
            </button>
          </div>
        </header>

        {/* --- HERO --- */}
        <section className="mb-12">
          {lastRead ? (
            <Link to={`/surat/${lastRead.nomorSurah}`}>
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-white shadow-2xl hover:shadow-emerald-500/20 transition-all group">
                <div className="relative z-10 flex items-center gap-6">
                  <div className="bg-white/20 p-5 rounded-2xl border border-white/20 group-hover:scale-110 transition-transform"><IconBook /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Lanjutkan Membaca</p>
                    <h3 className="text-3xl font-black italic">{lastRead.surah}</h3>
                    <p className="text-sm">Ayat <span className="font-bold">{lastRead.ayat}</span></p>
                  </div>
                </div>
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </Link>
          ) : (
            <div className="w-full bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 p-10 rounded-[2.5rem] text-slate-400 text-center text-sm italic">
              Pilih surah untuk memulai keberkahan hari ini.
            </div>
          )}
        </section>

        {/* --- DAFTAR SURAH HEADER (Search Bar Dipanjangkan) --- */}
        <div className="flex flex-row justify-between items-center px-2 mb-8 gap-4">
          <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight uppercase shrink-0">
            <span className="hidden md:block">Daftar Surah</span>
            <div className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-600 shadow-sm">
              <IconList />
            </div>
          </h2>

          {/* Search Bar yang lebih panjang: max-w diperbesar */}
          <div className="relative group w-full max-w-[350px] md:max-w-[500px]">
            <div className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <IconSearch />
            </div>
            <input
              type="text"
              placeholder="Cari surah yang ingin dibaca..."
              className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 outline-none text-sm dark:text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all shadow-sm"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
        </div>

        {/* --- SURAH GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [...Array(9)].map((_, i) => <SkeletonCard key={i} />)
            : filteredSurah.map((surah) => (
                <Link key={surah.nomor} to={`/surat/${surah.nomor}`}>
                  <div className="group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 hover:border-emerald-500 transition-all duration-300 relative overflow-hidden active:scale-95">
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all">
                          {surah.nomor}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                            {surah.namaLatin}
                          </h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{surah.arti}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 font-arabic">{surah.nama}</h3>
                        <p className="text-[9px] font-black text-slate-300 uppercase mt-1">{surah.jumlahAyat} Verses</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-emerald-600 text-white w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center z-50 hover:-translate-y-1 transition-all active:scale-90"
        >
          <IconArrowUp />
        </button>
      )}
    </div>
  );
};

export default Home;