"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { HeaderNav } from "@/components/HeaderNav";

const productCopy = {
  en: {
    hero: {
      badge: "ViC • Visual Intelligence for Care",
      title: "VirtualClone (ViC) turns",
      highlight: "images",
      afterHighlight: "into decisions.",
      description:
        "Surgeons upload DICOM/NRRD; data are anonymized automatically. AI models segment abdominal–thoracic anatomy and generate a clean, interactive 3D patient twin to plan procedures and develop a preoperative plan.",
      ctaPrimary: "Request a demo",
      ctaSecondary: "See features",
      stats: [
        { label: "DICOM", caption: "Compliance" },
        { label: "AI", caption: "Segmentation" },
        { label: "3D", caption: "Planning" },
      ],
    },
    intro: {
      title: "What is VirtualClone (ViC)?",
      paragraphs: [
        "A multimodal DICOM viewer enhanced with AI. ViC automatically detects and segments organs and vessels, producing an accurate 3D model of the patient with minimal manual correction.",
        "Assess parenchyma–vessel relationships pre-operatively and use the reconstructed model to guide dissection strategy and resection feasibility. AR alignment is under active development.",
      ],
      listTitle: "At a glance",
      list: [
        "Upload DICOM or NRRD; automatic anonymization and conversion",
        "2D viewer with familiar radiological tools",
        "AI segmentation for abdominal–thoracic anatomy",
        "Brush-based manual editing for quick refinements",
        "Real-time 3D rendering with opacity controls",
      ],
    },
    workflow: {
      badge: "Workflow",
      title: "Workflow in four main steps",
      steps: [
        {
          title: "Import & anonymize",
          body: "Upload DICOM or NRRD; automatic anonymization and conversion with secure storage for device-agnostic access.",
        },
        {
          title: "AI segmentation",
          body: "Run ViC models to obtain anatomical masks for liver, pancreas, kidney, vessels, and lesions.",
        },
        {
          title: "Assisted reconstruction",
          body: "Refine masks manually or request Assisted Reconstruction from IntusAI specialists for precision adjustments.",
        },
        {
          title: "3D visualization",
          body: "Generate a patient-specific 3D reconstruction with opacity controls, presets, and shareable interactive viewers.",
        },
      ],
    },
    reconstructions: {
      title: "3D reconstructions tailored to each case.",
      description:
        "Each reconstruction focuses on the specific thoraco-abdominal district required for surgical planning—each designed to support preoperative planning.",
      cards: [
        {
          title: "Liver 3D Reconstruction",
          body: "Volumes, arterial/venous territories, negative staining and non anatomical resection modes.",
          model: "/models/liver_card.glb",
        },
        {
          title: "Kidney 3D Reconstruction",
          body: "Volumes, arterial/venous territories, negative staining and non anatomical resection modes.",
          model: "/models/kidney_card.glb",
        },
        {
          title: "Pancreas 3D Reconstruction",
          body: "Volumes, resection proposals, vessels proximity to the tumor.",
          model: "/models/pancreas_card.glb",
        },
        {
          title: "Lung 3D Reconstruction",
          body: "Clear visualization of bronchi and vascular structures.",
          model: "/models/lungs_card.glb",
        },
      ],
    },
    features: {
      title: "Core features",
      cards: [
        { title: "AI segmentation", body: "Automatic detection of organs, vessels and lesions from CT/MR with fast inference and accuracy." },
        { title: "Interactive 3D", body: "Real-time 3D visualization with rotation, opacity adjustment, and anatomical presets." },
        { title: "Privacy by design", body: "Automatic anonymization on import and fully auditable data handling for secure processing." },
        { title: "2D DICOM viewer", body: "Multi-planar navigation with standard radiological tools and fast visual verification." },
        { title: "Editing tools", body: "Manual refinement of AI masks or assisted reconstruction service by expert radiologists." },
        { title: "Collaborative review", body: "Interactive 3D reconstructions for multidisciplinary evaluation." },
      ],
    },
    benefits: {
      title: "Why teams choose ViC",
      cards: [
        {
          title: "Accessibility",
          body: "Fully web-based and device-independent: no installation required. Upload studies from any workstation or PACS and access securely from anywhere.",
        },
        {
          title: "Usability",
          body: "Intuitive interface with automatic anonymization and registration. Manual tools and assisted reconstruction support precise yet simple refinements.",
        },
        {
          title: "Time",
          body: "Cloud-based processing ensures rapid results for 3D reconstruction and territory segmentation.",
        },
      ],
    },
    contact: {
      badge: "Contact us",
      title: "Want to see ViC in action or discuss deployment?",
      description:
        "Our team can guide you through onboarding, integrations, or custom workflows. Reach out from the dedicated support page.",
      cta: "Go to support page",
    },
  },
  it: {
    hero: {
      badge: "ViC • Visual Intelligence for Care",
      title: "VirtualClone (ViC) trasforma",
      highlight: "le immagini",
      afterHighlight: "in decisioni.",
      description:
        "I chirurghi caricano DICOM/NRRD e i dati vengono anonimizzati automaticamente. I modelli AI segmentano l’anatomia addominale-toracica e producono un gemello 3D interattivo per pianificare procedure e definire un piano preoperatorio.",
      ctaPrimary: "Richiedi una demo",
      ctaSecondary: "Vedi le funzionalità",
      stats: [
        { label: "DICOM", caption: "Conformità" },
        { label: "AI", caption: "Segmentazione" },
        { label: "3D", caption: "Pianificazione" },
      ],
    },
    intro: {
      title: "Cos’è VirtualClone (ViC)?",
      paragraphs: [
        "Un viewer DICOM multimodale potenziato dall’AI. ViC rileva e segmenta automaticamente organi e vasi, producendo un modello 3D accurato con correzioni minime.",
        "Analizza i rapporti parenchima–vasi in fase preoperatoria e usa il modello per guidare dissezione e fattibilità della resezione. L’allineamento AR è in sviluppo attivo.",
      ],
      listTitle: "In sintesi",
      list: [
        "Carica DICOM o NRRD; anonimizzazione e conversione automatiche",
        "Viewer 2D con strumenti radiologici familiari",
        "Segmentazione AI per l’anatomia addominale-toracica",
        "Editing manuale a pennello per rifiniture rapide",
        "Rendering 3D in tempo reale con controlli di opacità",
      ],
    },
    workflow: {
      badge: "Workflow",
      title: "Workflow in quattro passaggi",
      steps: [
        {
          title: "Importa e anonimizza",
          body: "Carica DICOM o NRRD; anonimizzazione e conversione automatiche con storage sicuro accessibile da ogni device.",
        },
        {
          title: "Segmentazione AI",
          body: "Esegui i modelli ViC per ottenere maschere anatomiche di fegato, pancreas, reni, vasi e lesioni.",
        },
        {
          title: "Ricostruzione assistita",
          body: "Rifinisci manualmente oppure richiedi la Ricostruzione Assistita da specialisti IntusAI per aggiustamenti di precisione.",
        },
        {
          title: "Visualizzazione 3D",
          body: "Genera una ricostruzione 3D specifica del paziente con controlli di opacità, preset e viewer condivisibili.",
        },
      ],
    },
    reconstructions: {
      title: "Ricostruzioni 3D su misura per ogni caso.",
      description:
        "Ogni ricostruzione si concentra sul distretto toraco-addominale richiesto per la pianificazione chirurgica ed è progettata per supportare il planning preoperatorio.",
      cards: [
        {
          title: "Ricostruzione 3D del fegato",
          body: "Volumi, territori arteriosi/venosi, modalità negative staining e resezioni non anatomiche.",
          model: "/models/liver_card.glb",
        },
        {
          title: "Ricostruzione 3D del rene",
          body: "Volumi, territori arteriosi/venosi, modalità negative staining e resezioni non anatomiche.",
          model: "/models/kidney_card.glb",
        },
        {
          title: "Ricostruzione 3D del pancreas",
          body: "Volumi, proposte di resezione, vicinanza dei vasi al tumore.",
          model: "/models/pancreas_card.glb",
        },
        {
          title: "Ricostruzione 3D del polmone",
          body: "Visualizzazione nitida di bronchi e strutture vascolari.",
          model: "/models/lungs_card.glb",
        },
      ],
    },
    features: {
      title: "Funzionalità principali",
      cards: [
        { title: "Segmentazione AI", body: "Rilevamento automatico di organi, vasi e lesioni da TC/RM con inferenza rapida e alta accuratezza." },
        { title: "3D interattivo", body: "Visualizzazione 3D in tempo reale con rotazione, slicing, regolazione dell’opacità e preset anatomici." },
        { title: "Privacy by design", body: "Anonimizzazione automatica all’import e gestione dei dati completamente tracciabile." },
        { title: "Viewer DICOM 2D", body: "Navigazione multi-planare con strumenti radiologici standard e rapida verifica visiva." },
        { title: "Strumenti di editing", body: "Rifinitura manuale delle maschere AI o servizio di ricostruzione assistita da radiologi esperti." },
        { title: "Revisione collaborativa", body: "Condividi ricostruzioni 3D interattive con i clinici per valutazioni multidisciplinari." },
      ],
    },
    benefits: {
      title: "Perché i team scelgono ViC",
      cards: [
        {
          title: "Accessibilità",
          body: "Totalmente web e device-independent: nessuna installazione. Carichi gli studi da qualsiasi workstation o PACS e accedi in sicurezza ovunque.",
        },
        {
          title: "Usabilità",
          body: "Interfaccia intuitiva guidata, con anonimizzazione e registrazione automatiche, oltre a strumenti manuali e ricostruzioni assistite.",
        },
        {
          title: "Velocità",
          body: "Elaborazione cloud per risultati rapidi su ricostruzioni 3D e segmentazioni dei territori.",
        },
      ],
    },
    contact: {
      badge: "Contattaci",
      title: "Vuoi vedere ViC in azione o discuterne il deployment?",
      description:
        "Il nostro team può guidarti nell’onboarding, nelle integrazioni o in workflow personalizzati. Contattaci dalla pagina di supporto dedicata.",
      cta: "Vai al supporto",
    },
  },
} as const;

type ProductCopy = (typeof productCopy)[keyof typeof productCopy];

export function ProductPageContent() {
  const { lang } = useLanguage();
  const content: ProductCopy = productCopy[lang] ?? productCopy.en;

  useEffect(() => {
    const cards = document.querySelectorAll("model-viewer[data-mv-hover]");
    const cleanup: Array<() => void> = [];
    cards.forEach((el) => {
      const element = el as HTMLElement & { dataset: DOMStringMap };
      let savedOrbit: string | null = null;
      let savedFov: string | null = null;
      let saved = false;

      const saveBase = () => {
        if (saved) return;
        saved = true;
        savedOrbit = element.getAttribute("camera-orbit") || "0deg 70deg auto";
        savedFov = element.getAttribute("field-of-view") || "20deg";
      };

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const tween = (from: number, to: number, setter: (value: number) => void) => {
        const duration = 280;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          setter(lerp(from, to, eased));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };

      const onEnter = () => {
        saveBase();
        element.setAttribute("auto-rotate", "");
        element.setAttribute("auto-rotate-delay", "0");
        element.setAttribute("auto-rotate-speed", element.dataset.rotateSpeed || "20deg/s");
        const initialFov = parseFloat((element.getAttribute("field-of-view") || savedFov || "20deg").replace("deg", ""));
        const targetFov = parseFloat(element.dataset.fovHover || "16");
        tween(initialFov, targetFov, (v) => element.setAttribute("field-of-view", `${v.toFixed(2)}deg`));
      };

      const onLeave = () => {
        element.removeAttribute("auto-rotate");
        element.removeAttribute("auto-rotate-speed");
        const currentFov = parseFloat((element.getAttribute("field-of-view") || "20deg").replace("deg", ""));
        const baseFov = parseFloat((savedFov || "20deg").replace("deg", ""));
        tween(currentFov, baseFov, (v) => element.setAttribute("field-of-view", `${v.toFixed(2)}deg`));
        if (savedOrbit) element.setAttribute("camera-orbit", savedOrbit);
      };

      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);
      cleanup.push(() => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanup.forEach((fn) => fn());
    };
  }, [lang]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeaderNav active="product" cta={{ href: "#demo", labelKey: "requestDemo" }} />

      <section id="vic" className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="lg:max-w-[54%] relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
              {content.hero.badge}
            </div>
            <h1 className="mt-4 text-4xl lg:text-6xl font-extrabold leading-[1.05]">
              {content.hero.title}{" "}
              <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">{content.hero.highlight}</span>{" "}
              {content.hero.afterHighlight}
            </h1>
            <p className="mt-5 text-lg text-slate-700">{content.hero.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#demo" className="rounded-full bg-blue-700 text-white px-5 py-3 text-sm font-medium hover:bg-blue-800 transition">
                {content.hero.ctaPrimary}
              </a>
              <a href="#features" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium hover:bg-slate-50">
                {content.hero.ctaSecondary}
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {content.hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                  <div className="text-2xl font-bold">{stat.label}</div>
                  <div className="text-[11px] uppercase tracking-widest text-slate-500">{stat.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute right-[8vw] top-[2.5vh] hidden lg:block z-10">
          <Image
            src="/vic_logo.png"
            alt="VirtualClone (ViC) logo"
            width={320}
            height={140}
            quality={100}
            priority
            className="w-auto opacity-95"
          />
        </div>
        <div className="absolute right-0 top-[3vh] w-[62vw] h-[92vh] md:w-[64vw] md:h-[110vh] z-0">
          <model-viewer
            suppressHydrationWarning
            src="/models/vic_hero.glb"
            poster="/models/vic_hero_poster.webp"
            preload
            loading="eager"
            reveal="auto"
            importance="high"
            auto-rotate
            autoplay
            interaction-prompt="none"
            environment-image="neutral"
            exposure="1.3"
            shadow-intensity="1"
            shadow-softness="0.8"
            tone-mapping="aces"
            bounds="tight"
            camera-target="10m -30m 0m"
            camera-orbit="5deg 90deg 95%"
            field-of-view="14deg"
            min-field-of-view="10deg"
            max-field-of-view="22deg"
            style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
          />
        </div>
        <div className="pointer-events-none absolute right-[-20vw] top-0 h-[90vh] w-[70vw] rounded-[40px] bg-gradient-to-tr from-emerald-200/40 via-transparent to-blue-200/50 blur-3xl z-[-1]" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold">{content.intro.title}</h2>
            {content.intro.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="mt-4 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="rounded-3xl border border-slate-200 p-6 bg-white">
            <h3 className="font-semibold">{content.intro.listTitle}</h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              {content.intro.list.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-200">{content.workflow.badge}</p>
          <h2 className="mt-4 text-3xl lg:text-4xl font-semibold">{content.workflow.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-left">
            {content.workflow.steps.map((step, idx) => (
              <article key={step.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white shadow-lg shadow-black/20">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">Step {idx + 1}</p>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-200">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="models" className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl lg:text-5xl font-semibold text-slate-900 tracking-tight">{content.reconstructions.title}</h2>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">{content.reconstructions.description}</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6 lg:gap-8">
          {content.reconstructions.cards.map((card, idx) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="p-6 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{card.body}</p>
                </div>
                <span className="text-sm font-medium text-blue-700 opacity-0 transition group-hover:opacity-100" aria-hidden="true">
                  •
                </span>
              </div>
              <div className="relative aspect-[16/9]">
                <model-viewer
                  suppressHydrationWarning
                  camera-controls
                  src={card.model}
                  interaction-prompt="none"
                  environment-image="neutral"
                  exposure="1.1"
                  shadow-intensity="0.8"
                  camera-orbit="0deg 70deg auto"
                  field-of-view="20deg"
                  data-mv-hover
                  data-theta-delta={["14", "12", "13", "12"][idx] ?? "14"}
                  data-fov-hover="16"
                  className="transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                  style={{ width: "100%", height: "150%", backgroundColor: "transparent", transformOrigin: "50% 50%" }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="features" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#0f2f63]">{content.features.title}</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {content.features.cards.map((card) => (
              <article key={card.title} className="group rounded-3xl border border-slate-200 bg-white p-6 hover:-translate-y-[2px] hover:shadow-lg transition">
                <h3 className="font-semibold text-blue-700">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#0f2f63]">{content.benefits.title}</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {content.benefits.cards.map((card) => (
              <article key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-blue-700">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-200">{content.contact.badge}</p>
          <h2 className="mt-4 text-3xl lg:text-4xl font-semibold">{content.contact.title}</h2>
          <p className="mt-3 text-slate-300">{content.contact.description}</p>
          <div className="mt-8">
            <a
              href="/support"
              className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-slate-100"
            >
              {content.contact.cta}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} IntusAI S.r.l. — All rights reserved</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="/" className="hover:text-slate-900">
              Company
            </a>
            <a href="#" className="hover:text-slate-900">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-900">
              Cookies
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
