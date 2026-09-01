"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageContext";

/**
 * Atlante anatomico interattivo per la sezione ViC – Anatomy Explorer.
 *
 * Passando il mouse sul modello 3D si legge il nome della struttura sotto al
 * puntatore. L'identificazione usa model-viewer.materialFromPoint(), che
 * restituisce il materiale colpito dal raycast in coordinate client.
 *
 * IMPORTANTE — la mappa qui sotto lega i NOMI DEI MATERIALI di
 * liver_card.glb alle strutture anatomiche. In quel file ogni mesh ha un
 * materiale proprio e nessun materiale e' condiviso, quindi la
 * corrispondenza e' univoca. Se il modello viene riesportato i nomi
 * "Material.00N" possono cambiare: un materiale non presente in mappa non
 * mostra nessuna etichetta (mai un'etichetta sbagliata).
 */

const PARENCHYMA = "Material.002";   // materiale del guscio esterno, alpha 0.20
const PARENCHYMA_MESH = "liver";     // nome della mesh corrispondente nel .glb

type Structure = { mesh: string; color: string; it: string; en: string };

const STRUCTURES: Record<string, Structure> = {
  "Material.002": { mesh: "liver", color: "#dc8165", it: "Fegato", en: "Liver" },
  "Material.006": { mesh: "mass", color: "#8fed8f", it: "Lesione", en: "Lesion" },
  "Material.001": { mesh: "artery", color: "#d83418", it: "Arteria epatica", en: "Hepatic artery" },
  "Material.004": { mesh: "hepatic_portal_veins", color: "#63baff", it: "Vena porta", en: "Portal vein" },
  "Material.005": { mesh: "hepatic_veins", color: "#8ca6f4", it: "Vene epatiche", en: "Hepatic veins" },
  "Material.007": { mesh: "svc", color: "#8ca6f4", it: "Vena cava", en: "Vena cava" },
  "Material.003": { mesh: "gallbladder", color: "#8a9562", it: "Colecisti", en: "Gallbladder" },
};

const ORDER = [
  "Material.002",
  "Material.006",
  "Material.001",
  "Material.004",
  "Material.005",
  "Material.007",
  "Material.003",
];

const copy = {
  it: {
    eyebrow: "Atlante interattivo",
    title: "Esplora l'anatomia",
    hint: "Passa il mouse sul modello per identificare le strutture. Trascina per ruotare.",
    hintTouch: "Tocca il modello per identificare le strutture. Trascina per ruotare.",
    hideParenchyma: "Nascondi parenchima",
    showParenchyma: "Mostra parenchima",
    legend: "Strutture nel modello",
    demoNote: "Caso anonimizzato mostrato a scopo dimostrativo.",
  },
  en: {
    eyebrow: "Interactive atlas",
    title: "Explore the anatomy",
    hint: "Hover the model to identify structures. Drag to rotate.",
    hintTouch: "Tap the model to identify structures. Drag to rotate.",
    hideParenchyma: "Hide parenchyma",
    showParenchyma: "Show parenchyma",
    legend: "Structures in this model",
    demoNote: "Anonymised case shown for demonstration purposes.",
  },
} as const;

type ThreeMesh = {
  isMesh?: boolean;
  name?: string;
  userData: Record<string, unknown>;
  material?: { name?: string } | Array<{ name?: string }>;
};

type ModelViewerElement = HTMLElement & {
  materialFromPoint?: (x: number, y: number) => { name: string } | null;
  model?: {
    materials: Array<{
      name: string;
      setAlphaMode?: (mode: string) => void;
      pbrMetallicRoughness?: {
        baseColorFactor: number[];
        setBaseColorFactor: (rgba: number[]) => void;
      };
    }>;
  };
};

/**
 * Trova le mesh three.js del parenchima dentro il grafo di model-viewer.
 *
 * Il raycast di model-viewer scarta gli oggetti con `userData.noHit`
 * (ModelScene.getHit: `e.object.visible && !e.object.userData.noHit`), ed e'
 * l'unico modo per far passare il raggio oltre il guscio del fegato senza
 * nasconderlo. L'API pubblica pero' espone solo i materiali, non le mesh:
 * qui si scorrono i simboli privati di `model` cercando i nodi che portano
 * una mesh. Se model-viewer cambia struttura questa ricerca torna vuota e il
 * componente ricade sul sondaggio singolo, senza rompersi.
 */
function findParenchymaMeshes(viewer: ModelViewerElement | null): ThreeMesh[] {
  const model = viewer?.model;
  if (!model) return [];

  const found: ThreeMesh[] = [];
  for (const symbol of Object.getOwnPropertySymbols(model)) {
    const value = (model as unknown as Record<symbol, unknown>)[symbol];
    if (!Array.isArray(value)) continue;

    for (const node of value) {
      const mesh = (node as { mesh?: ThreeMesh } | null)?.mesh;
      if (!mesh?.isMesh) continue;

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const matches =
        mesh.name === PARENCHYMA_MESH || materials.some((m) => m?.name === PARENCHYMA);
      if (matches && !found.includes(mesh)) found.push(mesh);
    }
  }
  return found;
}

type Hover = { key: string; x: number; y: number };

export function AnatomyAtlas() {
  const { lang } = useLanguage();
  const t = copy[lang] ?? copy.en;

  const viewerRef = useRef<ModelViewerElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const baseAlphaRef = useRef<number | null>(null);
  const parenchymaRef = useRef<ThreeMesh[] | null>(null);

  const [hover, setHover] = useState<Hover | null>(null);
  const [parenchymaHidden, setParenchymaHidden] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const probe = useCallback((clientX: number, clientY: number) => {
    const viewer = viewerRef.current;
    const box = boxRef.current;
    if (!viewer?.materialFromPoint || !box) return;

    const hit = (): { name: string } | null => {
      try {
        return viewer.materialFromPoint!(clientX, clientY);
      } catch {
        return null;
      }
    };

    if (parenchymaRef.current === null) {
      parenchymaRef.current = findParenchymaMeshes(viewer);
    }
    const parenchyma = parenchymaRef.current;

    let material: { name: string } | null;
    if (parenchyma.length > 0) {
      // 1) parenchima escluso dal raycast: se colpisco qualcosa e' un vaso,
      //    e i vasi hanno sempre la precedenza
      parenchyma.forEach((m) => {
        m.userData.noHit = true;
      });
      material = hit();
      parenchyma.forEach((m) => {
        m.userData.noHit = false;
      });

      // 2) niente lungo il raggio: solo allora vale il parenchima
      if (!material) material = hit();
    } else {
      material = hit();
    }

    // materiale sconosciuto => nessuna etichetta, mai un nome sbagliato
    if (!material || !STRUCTURES[material.name]) {
      setHover(null);
      return;
    }

    const rect = box.getBoundingClientRect();
    setHover({ key: material.name, x: clientX - rect.left, y: clientY - rect.top });
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      const { clientX, clientY } = event;
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => probe(clientX, clientY));
    },
    [probe],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => probe(event.clientX, event.clientY),
    [probe],
  );

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  // il guscio del fegato e' semitrasparente e intercetta il raycast prima dei
  // vasi: azzerarne l'alpha e' l'unico modo per raggiungere le strutture interne
  useEffect(() => {
    const material = viewerRef.current?.model?.materials.find((m) => m.name === PARENCHYMA);
    const pbr = material?.pbrMetallicRoughness;
    if (!pbr) return;

    if (baseAlphaRef.current === null) {
      baseAlphaRef.current = pbr.baseColorFactor[3] ?? 1;
    }

    const rgba = [...pbr.baseColorFactor];
    rgba[3] = parenchymaHidden ? 0 : baseAlphaRef.current;
    try {
      material?.setAlphaMode?.("BLEND");
      pbr.setBaseColorFactor(rgba);
    } catch {
      /* modello non ancora pronto: riprova al prossimo cambio */
    }
  }, [parenchymaHidden]);

  const active = hover ? STRUCTURES[hover.key] : null;

  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">{t.eyebrow}</p>
          <h3 className="mt-1 text-xl font-semibold text-[#0f2f63]">{t.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{isTouch ? t.hintTouch : t.hint}</p>
        </div>
        <button
          type="button"
          onClick={() => setParenchymaHidden((v) => !v)}
          aria-pressed={parenchymaHidden}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          {parenchymaHidden ? t.showParenchyma : t.hideParenchyma}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px]">
        <div
          ref={boxRef}
          data-atlas-box
          className="relative h-[380px] lg:h-[460px]"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHover(null)}
          onClick={handleClick}
        >
          <model-viewer
            suppressHydrationWarning
            ref={viewerRef}
            src="/models/liver_card.glb"
            alt={lang === "it" ? "Modello 3D del fegato" : "3D model of the liver"}
            camera-controls
            loading="lazy"
            reveal="auto"
            interaction-prompt="none"
            environment-image="neutral"
            exposure="0.95"
            shadow-intensity="0.35"
            camera-orbit="0deg 72deg auto"
            field-of-view="22deg"
            style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
          />

          {active && hover && (
            <div
              data-atlas-label
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[140%] whitespace-nowrap rounded-full bg-slate-900/92 px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
              style={{ left: hover.x, top: hover.y }}
            >
              <span
                className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                style={{ backgroundColor: active.color }}
              />
              {lang === "it" ? active.it : active.en}
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 px-6 py-5 lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t.legend}</p>
          <ul className="mt-3 space-y-2">
            {ORDER.map((key) => {
              const s = STRUCTURES[key];
              const isActive = hover?.key === key;
              return (
                <li
                  key={key}
                  className={`flex items-center gap-2.5 rounded-lg px-2 py-1 text-sm transition ${
                    isActive ? "bg-slate-100 font-semibold text-slate-900" : "text-slate-600"
                  }`}
                >
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {lang === "it" ? s.it : s.en}
                </li>
              );
            })}
          </ul>
          <p className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-400">{t.demoNote}</p>
        </div>
      </div>
    </div>
  );
}
