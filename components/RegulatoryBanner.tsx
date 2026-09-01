"use client";

import { useLanguage } from "@/components/LanguageContext";

/**
 * Banner di stato regolatorio per ViC – Surgical Planning.
 *
 * Obbligatorio su tutte le pagine che descrivono il prodotto (Prodotto,
 * Supporto). Non rimovibile e mai relegato al footer.
 *
 *   variant="short"    barra sottile in testa alla pagina, con link alla
 *                      versione estesa
 *   variant="extended" riquadro completo, sotto il titolo della sezione
 *                      ViC – Surgical Planning
 */

export const REGULATORY_ANCHOR = "regulatory-status";
const EXTENDED_HREF = `/product/surgical-planning#${REGULATORY_ANCHOR}`;

const copy = {
  it: {
    short:
      "ViC – Surgical Planning — dispositivo medico Classe IIa in corso di certificazione CE (MDR 2017/745). Non disponibile per uso clinico.",
    shortLink: "Leggi di più",
    extendedLabel: "Stato regolatorio",
    extended:
      "VirtualClone (ViC) – Surgical Planning è un software dispositivo medico di Classe IIa in corso di certificazione CE ai sensi del Regolamento (UE) 2017/745 (MDR). Non è disponibile per la vendita né per l'uso clinico. Le dimostrazioni avvengono esclusivamente in ambiente demo, su casi anonimizzati o fittizi, e sono riservate ai professionisti sanitari.",
  },
  en: {
    short:
      "ViC – Surgical Planning — Class IIa medical device undergoing CE certification (MDR 2017/745). Not available for clinical use.",
    shortLink: "Read more",
    extendedLabel: "Regulatory status",
    extended:
      "VirtualClone (ViC) – Surgical Planning is a Class IIa medical device software currently undergoing CE certification under Regulation (EU) 2017/745 (MDR). It is not available for sale or clinical use. Demonstrations take place exclusively in a demo environment, on anonymised or fictitious cases, and are reserved for healthcare professionals.",
  },
} as const;

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.25 9a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .74.75v4a.75.75 0 0 1-1.5 0V9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function RegulatoryBanner({
  variant = "short",
  withLink = true,
}: {
  variant?: "short" | "extended";
  withLink?: boolean;
}) {
  const { lang } = useLanguage();
  const t = copy[lang] ?? copy.en;

  if (variant === "extended") {
    return (
      <aside
        id={REGULATORY_ANCHOR}
        role="note"
        className="scroll-mt-28 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-slate-800 sm:p-6"
      >
        <div className="flex gap-3">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              {t.extendedLabel}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{t.extended}</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <div role="note" className="border-b border-slate-200 bg-slate-100">
      <div className="mx-auto flex max-w-7xl items-start justify-center gap-2.5 px-4 py-2.5 text-center text-xs leading-relaxed text-slate-700 sm:items-center">
        <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 sm:mt-0" />
        <p>
          {t.short}
          {withLink && (
            <>
              {" "}
              <a
                href={EXTENDED_HREF}
                className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
              >
                {t.shortLink}
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
