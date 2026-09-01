"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

/**
 * Footer unico del sito.
 *
 * Riporta l'indicazione completa del fabbricante: diventera' obbligatoria
 * post-CE, ed e' gia' qui per evitare un secondo intervento.
 *
 * Prima esistevano sei copie divergenti di questo blocco (home, prodotto,
 * dataset, supporto, privacy, cookies): tenerne una sola evita che i dati
 * societari vadano fuori sincrono.
 */

const COMPANY = "Intus.AI S.r.l.";
const ADDRESS = "Via San Senatore 6/1, 20122 Milano (MI), Italia";
const VAT = "P.IVA/C.F. 14342480960";
const EMAIL = "info@intus-ai.com";

export function SiteFooter({ width = "wide" }: { width?: "wide" | "narrow" }) {
  // era un componente server, quindi "All rights reserved" e i nomi dei link
  // restavano in inglese anche in italiano
  const { dict } = useLanguage();
  const t = dict.footer;

  // "wide": nessun contenitore centrato, cosi' i dati societari finiscono a
  // filo sinistro e i link a filo destro, come la barra in alto. "narrow"
  // resta centrato per privacy e cookies, che hanno il testo su max-w-4xl.
  const container = width === "narrow" ? "mx-auto max-w-4xl px-4" : "px-5 sm:px-8";

  return (
    <>
      {/* Segnaposto: da md in su il footer e' fisso e quindi fuori dal flusso,
          senza questo coprirebbe la fine della pagina. Sotto md resta in
          flusso: su telefono una barra fissa mangia schermo, e li' l'altezza
          varia perche' i dati societari vanno a capo. */}
      <div aria-hidden className="hidden md:block md:h-[53px]" />
      <footer className="border-t border-slate-200 bg-white/90 backdrop-blur md:fixed md:inset-x-0 md:bottom-0 md:z-40">
        <div
          className={`${container} flex flex-col gap-2 py-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between`}
        >
          <p className="leading-relaxed">
            © {new Date().getFullYear()} {COMPANY} — {ADDRESS} — {VAT} —{" "}
            <a href={`mailto:${EMAIL}`} className="hover:text-slate-700">
              {EMAIL}
            </a>{" "}
            — {t.rights}
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <Link href="/" className="hover:text-slate-700">
              {t.company}
            </Link>
            <Link href="/privacy" className="hover:text-slate-700">
              {t.privacy}
            </Link>
            <Link href="/cookies" className="hover:text-slate-700">
              {t.cookies}
            </Link>
          </div>
          </div>
      </footer>
    </>
  );
}
