"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Indicatore di scorrimento, fisso al viewport e attivo su tutta la pagina.
 *
 * Non e' un collegamento a una sezione: puntare sempre allo stesso punto
 * diventa sbagliato appena lo si e' superato. E' un comando che fa scendere
 * di una schermata, quindi ha lo stesso significato ovunque ci si trovi.
 *
 * Sparisce solo a fondo pagina, dove non c'e' piu' niente sotto e la freccia
 * mentirebbe.
 */
export function ScrollHint({ label }: { label: string }) {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const sync = () => {
      const doc = document.documentElement;
      setAtBottom(window.scrollY + window.innerHeight >= doc.scrollHeight - 8);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const scrollDown = useCallback(() => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollDown}
      aria-label={label}
      className={`fixed inset-x-0 bottom-6 z-30 mx-auto flex w-fit flex-col items-center gap-1.5 text-slate-500 transition-opacity duration-300 hover:text-slate-900 md:bottom-[70px] ${
        atBottom ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* pastiglia chiara dietro: sulla pagina prodotto la scritta cade sopra
          il modello 3D e senza sfondo diventa illeggibile */}
      <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.25em] shadow-sm backdrop-blur">
        {label}
      </span>
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="h-5 w-5 animate-bounce drop-shadow-sm"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
