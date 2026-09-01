"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { HeaderNav } from "@/components/HeaderNav";
import { RegulatoryBanner } from "@/components/RegulatoryBanner";
import { SiteFooter } from "@/components/SiteFooter";

const productCopy = {
  en: {
    hero: {
      badge: "ViC",
      title: "VirtualClone (ViC) turns",
      highlight: "images",
      afterHighlight: "into 3D models.",
      jumpAnatomy: "ViC – Anatomy Explorer",
      jumpSurgical: "ViC – Surgical Planning",
      stats: [
        { label: "DICOM", caption: "Compliance" },
        { label: "AI", caption: "Segmentation" },
        { label: "3D", caption: "Planning" },
      ],
    },
    surgical: {
      status: "Undergoing CE certification",
      title: "VirtualClone (ViC) – Surgical Planning: from images to the patient's 3D model.",
      description:
        "DICOM/NRRD files are AI-segmented and turned into an interactive 3D model, designed to support pre-operative planning.",
    },
    intro: {
      title: "What is VirtualClone (ViC) – Surgical Planning?",
      paragraphs: [
        "ViC is an AI-based multimodal DICOM viewer that automatically detects and segments organs, vessels and lesions to produce an accurate 3D model.",
        "It is designed to let clinicians visualize and understand parenchyma–vessel relationships and to support the definition of the pre-operative plan.",
      ],
      listTitle: "At a glance",
      list: [
        "Upload DICOM or NRRD; automatic anonymization and conversion",
        "2D viewer with standard radiological tools",
        "AI segmentation for abdominal–thoracic districts",
        "Manual brush editing for quick refinements",
        "Real-time 3D rendering with opacity controls, visualization, and volume info",
      ],
    },
    workflow: {
      badge: "Workflow",
      title: "Workflow in four main steps",
      steps: [
        {
          title: "Import & anonymize",
          body: "Upload DICOM or NRRD; automatic anonymization and conversion with secure storage.",
        },
        {
          title: "AI segmentation",
          body: "Run ViC models to obtain anatomical masks for thoraco-abdominal organs, vessels, and lesions.",
        },
        {
          title: "Assisted reconstruction",
          body: "Refine masks manually or request Assisted Reconstruction from Intus.AI specialists for precision adjustments.",
        },
        {
          title: "3D visualization",
          body: "Generate a patient-specific 3D reconstruction with opacity controls, presets, and interactive viewers.",
        },
      ],
      note: "Anonymised cases shown for demonstration purposes.",
    },
    reconstructions: {
      title: "Patient-specific 3D reconstructions.",
      description:
        "Each reconstruction focuses on the thoraco-abdominal district of interest and is designed to support pre-operative planning.",
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
        { title: "Privacy by design", body: "Automatic anonymization on import and data handling fully compliant with privacy standards." },
        { title: "AI segmentation", body: "Automatic detection of organs, vessels and lesions from CT/MRI with advanced, fast and scientifically validated algorithms." },
        { title: "2D DICOM viewer", body: "DICOM visualization with standard radiology tools and additional utilities." },
        { title: "Editing tools", body: "Manual correction of masks with automated and standard tools." },
        { title: "Assisted reconstruction", body: "The platform is designed to allow users to request specialist support for the review and refinement of reconstructions. Available with the certified release." },
        { title: "Interactive 3D", body: "Real-time 3D visualization with rotation, zoom, opacity adjustment, and district-specific anatomical presets." },
        { title: "Collaborative review", body: "Interactive 3D reconstructions for clinical assessment and teamwork." },
      ],
    },
    benefits: {
      title: "Why teams choose ViC",
      cards: [
        {
          title: "Accessibility",
          body: "Fully web-based and device-independent: no installation required. Upload studies from any workstation and access them securely from anywhere.",
        },
        {
          title: "Usability",
          body: "Intuitive interface with automatic anonymization and structure segmentation.",
        },
        {
          title: "Time",
          body: "Fast data processing with 3D reconstruction and dedicated functionalities.",
        },
      ],
    },
    contact: {
      badge: "Contact us",
      title: "Want to see ViC in action?",
      description:
        "Request a demonstration in our demo environment: our team will guide you through the platform and collect your clinical feedback.",
      cta: "Request a demo",
    },
  },
  it: {
    hero: {
      badge: "ViC",
      title: "VirtualClone (ViC) trasforma",
      highlight: "le immagini",
      afterHighlight: "in modelli 3D.",
      jumpAnatomy: "ViC – Anatomy Explorer",
      jumpSurgical: "ViC – Surgical Planning",
      stats: [
        { label: "DICOM", caption: "Conformità" },
        { label: "AI", caption: "Segmentazione" },
        { label: "3D", caption: "Pianificazione" },
      ],
    },
    surgical: {
      status: "In corso di certificazione CE",
      title: "VirtualClone (ViC) – Surgical Planning: dalle immagini al modello 3D del paziente.",
      description:
        "DICOM/NRRD segmentati dall'AI e trasformati in un modello 3D interattivo, progettato per supportare la pianificazione pre-operatoria.",
    },
    intro: {
      title: "Cos’è VirtualClone (ViC) – Surgical Planning",
      paragraphs: [
        "ViC è un viewer DICOM multimodale basato sull'AI che rileva e segmenta automaticamente organi, vasi e lesioni per produrre un modello 3D accurato.",
        "È progettato per consentire al clinico di visualizzare e comprendere i rapporti parenchima–vasi e per supportare la definizione del piano pre-operatorio.",
      ],
      listTitle: "In sintesi",
      list: [
        "Caricamento DICOM o NRRD con anonimizzazione e conversione automatiche",
        "Viewer 2D con strumenti radiologici standard",
        "Segmentazione AI per i distretti toraco-addominali",
        "Editing manuale con pennello per rifiniture rapide",
        "Rendering 3D in tempo reale con controlli di opacità, visualizzazione e calcolo dei volumi",
      ],
    },
    workflow: {
      badge: "Workflow",
      title: "Workflow in quattro passaggi",
      steps: [
        {
          title: "Importa e anonimizza",
          body: "Carica DICOM o NRRD: anonimizzazione e conversione automatiche, storage sicuro accessibile da ogni device.",
        },
        {
          title: "Segmentazione AI",
          body: "Esegui la segmentazione automatica di ViC per ottenere maschere di organi, vasi e lesioni.",
        },
        {
          title: "Ricostruzione assistita",
          body: "Rifinisci manualmente o richiedi supporto da specialisti per aggiustamenti di precisione.",
        },
        {
          title: "Visualizzazione 3D",
          body: "Genera una ricostruzione 3D specifica del paziente con controlli di opacità, preset e funzionalità specifiche del distretto d'interesse.",
        },
      ],
      note: "Casi anonimizzati mostrati a scopo dimostrativo.",
    },
    reconstructions: {
      title: "Ricostruzioni 3D su misura per ogni caso.",
      description:
        "Ogni ricostruzione si concentra sul distretto toraco-addominale di interesse ed è progettata per supportare il planning preoperatorio.",
      cards: [
        {
          title: "Ricostruzione 3D distretto epatico",
          body: "Volumi, territori arteriosi/venosi, modalità negative staining e resezioni non anatomiche.",
          model: "/models/liver_card.glb",
        },
        {
          title: "Ricostruzione 3D distretto renale",
          body: "Volumi, territori arteriosi/venosi, modalità negative staining e resezioni non anatomiche.",
          model: "/models/kidney_card.glb",
        },
        {
          title: "Ricostruzione 3D distretto pancreatico",
          body: "Volumi, proposte di resezione, vicinanza dei vasi al tumore.",
          model: "/models/pancreas_card.glb",
        },
        {
          title: "Ricostruzione 3D distretto polmonare",
          body: "Visualizzazione nitida di bronchi e strutture vascolari.",
          model: "/models/lungs_card.glb",
        },
      ],
    },
    features: {
      title: "Funzionalità principali",
      cards: [
        { title: "Privacy by design", body: "Anonimizzazione automatica all'importazione e gestione sicura dei dati nel pieno rispetto della privacy." },
        { title: "Segmentazione AI", body: "Rilevamento automatico di organi, vasi e lesioni da TC/RM con algoritmi avanzati, rapidi e scientificamente validati." },
        { title: "Viewer DICOM 2D", body: "Visualizzazione completa degli studi DICOM con strumenti radiologici standard e funzionalità avanzate." },
        { title: "Strumenti di editing", body: "Correzione manuale delle maschere con tool automatizzati e standard." },
        { title: "Ricostruzione Assistita", body: "La piattaforma prevede la possibilità di richiedere il supporto di specialisti per la revisione e la rifinitura delle ricostruzioni. Funzionalità disponibile con la versione certificata." },
        { title: "3D interattivo", body: "Visualizzazione 3D in tempo reale con controlli di rotazione, zoom, opacità e preset anatomici specifici per distretto." },
        { title: "Revisione collaborativa", body: "Ricostruzioni 3D interattive per la valutazione clinica e il lavoro di squadra." },
      ],
    },
    benefits: {
      title: "Perché scegliere ViC",
      cards: [
        {
          title: "Accessibilità",
          body: "Totalmente web e device-independent: nessuna installazione. Carichi gli studi da qualsiasi workstation e accedi in sicurezza ovunque.",
        },
        {
          title: "Usabilità",
          body: "Interfaccia intuitiva, con anonimizzazione e segmentazione automatica delle strutture.",
        },
        {
          title: "Velocità",
          body: "Elaborazione rapida dei dati con ricostruzione 3D e funzionalità distretto-specifiche.",
        },
      ],
    },
    contact: {
      badge: "Contattaci",
      title: "Vuoi vedere ViC in azione?",
      description:
        "Richiedi una dimostrazione in ambiente demo: il nostro team ti guiderà nell'utilizzo della piattaforma e raccoglierà il tuo feedback clinico.",
      cta: "Richiedi una demo",
    },
  },
} as const;

type ProductCopy = (typeof productCopy)[keyof typeof productCopy];

export function SurgicalPlanningPageContent() {
  const { lang } = useLanguage();
  const content: ProductCopy = productCopy[lang] ?? productCopy.en;
  const rotateHint = lang === "it" ? "Trascina per ruotare" : "Drag to rotate";

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
      {/* Header e banner regolatorio scorrono insieme: il banner deve restare
          sempre visibile, e avvolgerli in un unico contenitore sticky evita di
          inchiodare l'altezza dell'header in un offset. */}
      <div className="sticky top-0 z-50">
        <HeaderNav active="product" activeProduct="surgicalPlanning" />
        <RegulatoryBanner variant="short" />
      </div>

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
            <div className="mt-16 flex flex-wrap gap-3">
              <a
                href="#surgical-planning"
                className="rounded-full bg-blue-700 text-white px-5 py-3 text-sm font-medium hover:bg-blue-800 transition"
              >
                {content.hero.jumpSurgical}
              </a>
              <Link
                href="/product/anatomy-explorer"
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium hover:bg-slate-50"
              >
                {content.hero.jumpAnatomy}
              </Link>
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
            preload
          loading="eager"
          reveal="auto"
          importance="high"
          auto-rotate
          autoplay
          interaction-prompt="none"
          environment-image="neutral"
          exposure="1.1"
          shadow-intensity="0.7"
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

      {/* ---------------- ViC – Surgical Planning (in certificazione) ---------------- */}
      {/* Una sezione sola: prima erano due blocchi con padding e larghezze
          diverse (banner a tutta larghezza, testo a max-w-3xl, griglia a due
          colonne), impilati e sfalsati. La gerarchia ora e' esplicita:
          titolo di sezione > occhiello > sottotitolo del blocco. */}
      <section id="surgical-planning" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-amber-700">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
          {content.surgical.status}
        </span>
        <h2 className="mt-4 text-3xl lg:text-4xl font-semibold leading-tight text-[#0f2f63]">
          {content.surgical.title}
        </h2>
        <p className="mt-4 text-lg text-slate-700">{content.surgical.description}</p>

        <div className="mt-8">
          <RegulatoryBanner variant="extended" />
        </div>

        {/* Paragrafi impilati, non affiancati: sono due frasi consecutive e
            leggerle saltando da una colonna all'altra spezzava il discorso.
            A piena larghezza stanno su una riga ciascuna. */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-[#0f2f63]">{content.intro.title}</h3>
          {content.intro.paragraphs.map((paragraph, idx) => (
            <p key={idx} className="mt-4 text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>

        {/* "In sintesi" come fila di card, stesso trattamento della pagina
            Anatomy Explorer: il riquadro unico che raccoglieva l'elenco
            leggeva come una tabella e restava sbilanciato accanto al testo. */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-slate-900">{content.intro.listTitle}</h3>
          <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {content.intro.list.map((item) => (
              <li
                key={item}
                className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-[2px] hover:shadow-lg"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 text-blue-600" fill="currentColor">
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
        </div>
      </section>

      <section id="workflow" className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
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
          <p className="mt-8 text-sm text-slate-400">{content.workflow.note}</p>
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
              <div className="pointer-events-none absolute right-4 top-4 z-10 opacity-0 transition duration-200 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-md shadow-blue-100/60">
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-blue-600">
                    <path
                      fill="currentColor"
                      d="M10 3a6.97 6.97 0 0 0-4.95 2.05L3.4 3.4a1 1 0 1 0-1.4 1.4l2.12 2.12a1 1 0 0 0 1.4 0L7.65 4.2A5 5 0 1 1 5 10a1 1 0 0 0-2 0 7 7 0 1 0 7-7Z"
                    />
                    <path
                      fill="currentColor"
                      d="M15 10a1 1 0 0 0-1-1H8.41l1.3-1.29a1 1 0 1 0-1.42-1.42L5.3 8.29a1 1 0 0 0 0 1.42l2.99 2.99a1 1 0 0 0 1.42-1.42L8.41 11H14a1 1 0 0 0 1-1Z"
                    />
                  </svg>
                  {rotateHint}
                </span>
              </div>
              <div className="p-6 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{card.body}</p>
                </div>
                <span className="text-sm font-medium text-blue-700 opacity-0 transition group-hover:opacity-100" aria-hidden="true">
                  •
                </span>
              </div>
              <div className={idx === 3 ? "relative h-[450px]" : "relative aspect-[16/9]"}>
                {idx === 3 ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white">
                    <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Coming Soon</span>
                  </div>
                ) : (
                  <model-viewer
                    suppressHydrationWarning
                    camera-controls
                    src={card.model}
                    poster={`/posters/${card.model.split('/').pop()?.replace('.glb', '.jpg')}`}
                    loading="lazy"
                    reveal="auto"
                    interaction-prompt="none"
                    environment-image="neutral"
                    exposure="0.95"
                    shadow-intensity="0.45"
                    camera-orbit="0deg 70deg auto"
                    field-of-view="20deg"
                    data-mv-hover
                    data-theta-delta={["14", "12", "13", "12"][idx] ?? "14"}
                    data-fov-hover="16"
                    className="transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                    style={{ width: "100%", height: "150%", backgroundColor: "transparent", transformOrigin: "50% 50%" }}
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Niente riquadri: filetti sottili e testo, come le griglie di
          caratteristiche di apple.com. Impaginato con le colonne CSS e non
          con una griglia perche' le voci sono sette: una griglia da tre
          lasciava una card orfana nell'ultima riga, mentre le colonne si
          bilanciano da sole in altezza. */}
      <section id="features" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:py-24">
          <h2 className="max-w-3xl text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-[#0f2f63]">
            {content.features.title}
          </h2>
          <div className="mt-12 gap-x-14 md:columns-2 lg:columns-3">
            {content.features.cards.map((card) => (
              <div key={card.title} className="mb-10 break-inside-avoid border-t border-slate-200 pt-5">
                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
              </div>
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
              href="/support#contact"
              className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-slate-100"
            >
              {content.contact.cta}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
