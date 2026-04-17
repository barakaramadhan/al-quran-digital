import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Bookmark from "./pages/Bookmark";

function App() {
  // 1. Inisialisasi tema dari LocalStorage agar permanen
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // 2. Gunakan useEffect untuk sinkronisasi class .dark di HTML root
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      {/* Container utama agar footer tidak menutupi konten */}
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            {/* KIRIM isDark & setIsDark sebagai props ke Home */}
            <Route 
              path="/" 
              element={<Home isDark={isDark} setIsDark={setIsDark} />} 
            />
            <Route path="/surat/:nomor" element={<Detail />} />
            <Route path="/bookmark" element={<Bookmark />} />
          </Routes>
        </main>

        {/* --- FOOTER SECTION --- */}
        <footer className="mt-20 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
          <div className="max-w-2xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="max-w-xs">
                <div className="flex items-center gap-2 mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3H8C10.2091 3 12 4.79086 12 7V21C12 18.7909 10.2091 17 8 17H2V3Z" fill="#10B981" />
                    <path d="M22 3H16C13.7909 3 12 4.79086 12 7V21C12 18.7909 13.7909 17 16 17H22V3Z" fill="#10B981" />
                  </svg>
                  <span className="text-lg font-bold text-emerald-900 dark:text-emerald-500 tracking-tight">
                    The Divine Breath
                  </span>
                </div>
                <p className="text-sm text-gray-400 dark:text-slate-500 leading-relaxed">
                  Membaca, menghayati, dan mengamalkan Al-Qur'an dengan antarmuka yang modern dan nyaman.
                </p>
              </div>

              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-slate-900 text-gray-400 hover:text-emerald-600 transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-slate-900 text-gray-400 hover:text-emerald-600 transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-50 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs font-medium text-gray-400">
                © 2026 Quranku App. All rights reserved.
              </p>
              <div className="flex gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
                <a href="#" className="hover:text-emerald-600 transition-colors">Terms</a>
                <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;