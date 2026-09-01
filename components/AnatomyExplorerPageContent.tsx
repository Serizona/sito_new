"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { HeaderNav } from "@/components/HeaderNav";
import { AnatomyAtlas } from "@/components/AnatomyAtlas";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * Pagina ViC – Anatomy Explorer.
 *
 * Non porta il banner di stato regolatorio: quello riguarda ViC – Surgical
 * Planning, che qui non viene descritto. Anatomy Explorer non e' un
 * dispositivo medico e ha una sua dichiarazione dedicata, in fondo alla
 * sezione: mettere qui l'avviso MDR confonderebbe due prodotti diversi.
 */

const copy = {
  en: {
    status: "Available today",
    title: "ViC – Anatomy Explorer",
    description:
      "ViC – Anatomy Explorer brings VirtualClone's 3D reconstructions to education and communication: interactive thoraco-abdominal anatomy, teaching cases and visual material for training, educational tumour boards and patient communication.",
    list: [
      "Interactive 3D models by anatomical district",
      "Anonymised teaching cases with quizzes and annotations",
      "Web access, no installation",
      "Ideal for universities, residency programmes and surgical training",
    ],
    disclaimer:
      "ViC – Anatomy Explorer is not a medical device and is not intended for diagnosis, prevention or treatment: it is an education and communication tool.",
    otherProduct: "ViC – Surgical Planning",
    contact: {
      badge: "Contact us",
      title: "Want to see ViC in action?",
      description:
        "Request a demonstration in our demo environment: our team will guide you through the platform and collect your clinical feedback.",
      cta: "Request a demo",
    },
  },
  it: {
    status: "Disponibile oggi",
    title: "ViC – Anatomy Explorer",
    description:
      "ViC – Anatomy Explorer porta le ricostruzioni 3D di VirtualClone nella formazione e nella comunicazione: anatomia toraco-addominale interattiva, casi didattici e materiale visivo per l'insegnamento, tumor board formativi e colloquio con il paziente.",
    list: [
      "Modelli 3D interattivi per distretto anatomico",
      "Casi didattici anonimizzati con quiz e annotazioni",
      "Accesso web, nessuna installazione",
      "Ideale per università, scuole di specializzazione e programmi di formazione chirurgica",
    ],
    disclaimer:
      "ViC – Anatomy Explorer non è un dispositivo medico e non è destinato alla diagnosi, alla prevenzione o al trattamento: è uno strumento di formazione e comunicazione.",
    otherProduct: "ViC – Surgical Planning",
    contact: {
      badge: "Contattaci",
      title: "Vuoi vedere ViC in azione?",
      description:
        "Richiedi una dimostrazione in ambiente demo: il nostro team ti guiderà nell'utilizzo della piattaforma e raccoglierà il tuo feedback clinico.",
      cta: "Richiedi una demo",
    },
  },
} as const;

export function AnatomyExplorerPageContent() {
  const { lang } = useLanguage();
  const t = copy[lang] ?? copy.en;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeaderNav active="product" activeProduct="anatomyExplorer" />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            {t.status}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold tracking-tight leading-tight text-[#0f2f63]">{t.title}</h1>

          {/* L'atlante viene per primo: e' la cosa che si prova, e mostrarla
              subito dopo il titolo vale piu' di descriverla. Testo e card
              spiegano dopo. */}
          <AnatomyAtlas />

          <p className="mt-16 text-lg text-slate-700">{t.description}</p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.list.map((item) => (
              <li
                key={item}
                className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-[2px] hover:shadow-lg"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 text-emerald-500" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="mt-3 text-sm text-slate-700">{item}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-slate-500">{t.disclaimer}</p>
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-200">{t.contact.badge}</p>
          <h2 className="mt-4 text-3xl lg:text-4xl font-semibold tracking-tight">{t.contact.title}</h2>
          <p className="mt-3 text-slate-300">{t.contact.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/support#contact"
              className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-slate-100"
            >
              {t.contact.cta}
            </Link>
            <Link
              href="/product/surgical-planning"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t.otherProduct}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
