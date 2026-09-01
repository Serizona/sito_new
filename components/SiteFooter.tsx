import Link from "next/link";

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
  const maxWidth = width === "narrow" ? "max-w-4xl" : "max-w-7xl";

  return (
    <footer className="border-t border-slate-200">
      <div
        className={`mx-auto ${maxWidth} flex flex-col gap-3 px-4 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between`}
      >
        <p className="leading-relaxed">
          © {new Date().getFullYear()} {COMPANY} — {ADDRESS} — {VAT} —{" "}
          <a href={`mailto:${EMAIL}`} className="hover:text-slate-700">
            {EMAIL}
          </a>{" "}
          — All rights reserved.
        </p>
        <div className="flex shrink-0 items-center gap-4">
          <Link href="/" className="hover:text-slate-700">
            Company
          </Link>
          <Link href="/privacy" className="hover:text-slate-700">
            Privacy
          </Link>
          <Link href="/cookies" className="hover:text-slate-700">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
