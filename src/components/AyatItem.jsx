import React from "react";
import { Volume2, Bookmark } from "lucide-react";

const AyatItem = React.memo(({ ayat, isBookmarked, onPlay, onBookmark, activeLastRead }) => {
  return (
    <article 
      className={`animate-slide-up bg-white dark:bg-slate-900/40 rounded-[2rem] border transition-all p-6 md:p-8 
      ${activeLastRead ? 'border-emerald-500 ring-1 ring-emerald-500/20' : 'border-slate-200 dark:border-slate-800'}`}
    >
      <div className="flex justify-between items-center mb-8">
        <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold 
          ${activeLastRead ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
          {ayat.nomorAyat}
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onPlay(ayat.audio, ayat.nomorAyat)} 
            className="p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-400 transition-all active:scale-90"
          >
            <Volume2 size={18} />
          </button>
          <button 
            onClick={() => onBookmark(ayat)} 
            className={`p-2.5 rounded-xl transition-all active:scale-90 ${isBookmarked ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : 'text-slate-400'}`}
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
        <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm italic">{ayat.teksLatin}</p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{ayat.teksIndonesia}</p>
      </div>
    </article>
  );
});

export default AyatItem;