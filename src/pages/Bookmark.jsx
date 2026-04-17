import { useSelector, useDispatch } from 'react-redux'; // Tambah useDispatch
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark as BookmarkIcon, Trash2 } from 'lucide-react'; // Tambah Trash2
import { toggleBookmark } from '../features/quranSlice'; // Import action untuk hapus

const Bookmark = () => {
  const { bookmarks } = useSelector((state) => state.quran);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fungsi untuk menghapus bookmark
  const handleRemove = (item) => {
    // Kita kirimkan objek yang sama agar logic toggle di slice menghapusnya
    dispatch(toggleBookmark(item));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] dark:bg-[#020617] font-sans text-gray-900 dark:text-slate-100 pb-12 transition-colors duration-500">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between py-8">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 flex items-center justify-center bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 rounded-2xl shadow-sm hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-100 transition-all active:scale-90"
          >
            <ArrowLeft size={20} />
          </button>
          
          <h1 className="text-xl font-bold text-[#064E3B] dark:text-emerald-500 tracking-tight">
            Ayat Difavoritkan
          </h1>
          
          <div className="w-11"></div>
        </header>

        {/* --- CONTENT --- */}
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-32 text-center">
            <div className="mb-6 opacity-20 dark:opacity-10 text-gray-400">
              <BookmarkIcon size={80} strokeWidth={1} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-2">Belum ada bookmark</h2>
            <p className="text-sm text-gray-400 max-w-[200px]">
              Ayat yang kamu tandai akan muncul secara rapi di sini.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              {bookmarks.length} Ayat Tersimpan
            </p>
            
            {bookmarks.map((b, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900/50 p-6 rounded-[28px] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                {/* CARD HEADER */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest mb-0.5">
                      Surah
                    </span>
                    <h3 className="font-bold text-gray-800 dark:text-slate-200">
                      {b.surah}
                    </h3>
                  </div>
                  
                  {/* TOMBOL HAPUS */}
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-xl text-xs font-bold border border-emerald-100 dark:border-emerald-500/20">
                      Ayat {b.nomorAyat}
                    </div>
                    <button 
                      onClick={() => handleRemove(b)}
                      className="p-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 transition-all border border-red-100 dark:border-red-500/20"
                      title="Hapus dari favorit"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* ARAB SECTION */}
                <div className="bg-[#F8FAF9] dark:bg-emerald-950/20 p-6 rounded-2xl mb-4 border border-transparent dark:border-emerald-900/30">
                  <p
                    className="text-right text-3xl leading-[2.2] font-arabic text-emerald-950 dark:text-emerald-50"
                    dir="rtl"
                  >
                    {b.teksArab}
                  </p>
                </div>

                {/* TRANSLATION SECTION */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 leading-relaxed italic">
                    {b.teksLatin}
                  </p>
                  <div className="h-[1px] w-12 bg-gray-100 dark:bg-slate-800"></div>
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed font-medium">
                    "{b.teksIndonesia}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;