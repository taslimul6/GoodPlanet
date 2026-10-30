"use client";

import { useState } from "react";

export default function NavBar() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-bg/85 backdrop-blur border-b border-line">
      <nav className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-extrabold text-xl">
          <span className="size-9 grid place-items-center rounded-xl bg-pri text-on">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16z" />
              <path d="M4 21c3-6 6-9 10-11" />
            </svg>
          </span>
          GoodPlanet
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-mut">
          {["Mission", "Initiatives", "Events", "Stories", "Impact"].map((item) => (
            <a key={item} className="hover:text-pri" href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="size-10 grid place-items-center rounded-full hover:bg-line transition"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
              </svg>
            )}
          </button>

          <a href="#login" className="hidden sm:inline-flex h-10 items-center px-5 rounded-full bg-pri text-on text-sm font-bold hover:opacity-90 transition">
            Login
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden size-10 grid place-items-center rounded-full hover:bg-line"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-line bg-bg px-5 py-4 grid gap-1 font-semibold">
          {["Mission", "Initiatives", "Events", "Stories", "Impact"].map((item) => (
            <a
              key={item}
              className="py-3"
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a className="py-3 text-pri" href="#login" onClick={() => setMenuOpen(false)}>
            Login
          </a>
        </div>
      )}
    </header>
  );
}