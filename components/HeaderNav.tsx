"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavKey = "company" | "product" | "dataset" | "support";
/** le due pagine della suite: servono a segnare quale voce del menu e' attiva */
export type ProductKey = "surgicalPlanning" | "anatomyExplorer";

type CTAKey = "exploreProduct" | "talkToUs" | "requestDemo" | "emailSupport";

type HeaderNavProps = {
  active?: NavKey;
  activeProduct?: ProductKey;
  cta?: {
    href: string;
    labelKey: CTAKey;
  };
};

export const PRODUCT_LINKS: Array<{ key: ProductKey; href: string }> = [
  { key: "anatomyExplorer", href: "/product/anatomy-explorer" },
  { key: "surgicalPlanning", href: "/product/surgical-planning" },
];

export function HeaderNav({ active, activeProduct, cta }: HeaderNavProps) {
  const { dict } = useLanguage();
  const { nav } = dict;

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  // il menu si apre al passaggio del mouse, ma con un ritardo alla chiusura:
  // senza, basta sfiorare il vuoto fra il bottone e il pannello per perderlo
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const productActive = active === "product";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="flex items-center justify-between px-5 py-2.5 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Intus.AI"
            width={280}
            height={120}
            quality={100}
            priority
            className="h-10 w-auto drop-shadow-sm"
          />
          <span className="text-xl md:text-2xl font-bold tracking-wide text-slate-900">IntusAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className={active === "company" ? "text-blue-700 font-semibold" : "hover:text-slate-700"}>
            {nav.company}
          </Link>

          <div
            ref={menuRef}
            className="relative"
            onMouseEnter={() => {
              cancelClose();
              setOpen(true);
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 ${
                productActive ? "text-blue-700 font-semibold" : "hover:text-slate-700"
              }`}
            >
              {nav.product}
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                fill="currentColor"
              >
                <path d="M5.5 7.5 10 12l4.5-4.5H5.5Z" />
              </svg>
            </button>

            {open && (
              <div
                id={menuId}
                role="menu"
                className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3"
              >
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-300/40">
                  {PRODUCT_LINKS.map(({ key, href }) => (
                    <Link
                      key={key}
                      href={href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-3 py-2.5 transition hover:bg-slate-50 ${
                        activeProduct === key ? "bg-slate-50" : ""
                      }`}
                    >
                      <span
                        className={`block font-semibold ${
                          activeProduct === key ? "text-blue-700" : "text-slate-900"
                        }`}
                      >
                        {nav[key]}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {key === "anatomyExplorer" ? nav.anatomyExplorerNote : nav.surgicalPlanningNote}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span className="text-slate-300 cursor-not-allowed select-none" title="Coming soon">
            {nav.dataset}
          </span>

          <Link
            href="/support"
            className={active === "support" ? "text-blue-700 font-semibold" : "hover:text-slate-700"}
          >
            {nav.support}
          </Link>
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href={cta?.href ?? "/support#contact"}
            className="rounded-full bg-blue-700 text-white px-4 py-2 text-sm hover:bg-blue-800"
          >
            {nav[cta?.labelKey ?? "emailSupport"]}
          </Link>
        </div>
      </div>
    </header>
  );
}
