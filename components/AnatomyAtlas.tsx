"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageContext";

/**
 * Atlante anatomico interattivo per la sezione ViC – Anatomy Explorer.
 *
 * COME IDENTIFICA LE STRUTTURE
 * model-viewer.surfaceFromPoint(x, y) restituisce una stringa la cui prima
 * parola e' l'INDICE glTF della mesh colpita ("2 0 92080 87570 ..."). Le
 * mappe qui sotto legano quell'indice al nome anatomico, letto dai nomi mesh
 * dei .glb. Si identifica per mesh e non per materiale perche' nel modello
 * renale un materiale e' condiviso fra right_kidney e aorta: per materiale
 * sarebbe ambiguo, per mesh no. Un indice non presente in mappa non produce
 * nessuna etichetta (mai una sbagliata).
 *
 * PRIORITA' AI VASI
 * Gli organi (fegato, pancreas, reni) sono gusci semitrasparenti che pero'
 * avvolgono geometricamente tutto: il raycast li colpisce per primi e i vasi
 * interni sarebbero irraggiungibili. Il raycast di model-viewer scarta gli
 * oggetti con `userData.noHit` (ModelScene.getHit), quindi si sonda una prima
 * volta con i gusci esclusi — se colpisce, e' una struttura interna e vince —
 * e solo se non colpisce nulla si risonda includendoli.
 *
 * ATTENZIONE — l'API pubblica non espone le mesh three.js, solo i materiali:
 * findMeshes() attraversa i simboli privati di `model`. Se model-viewer
 * cambia struttura interna la ricerca torna vuota e l'atlante ricade sul
 * sondaggio singolo, senza rompersi.
 */

type Structure = {
  color: string;
  /** nome mostrato al passaggio del mouse: qui il lato va distinto */
  it: string;
  en: string;
  /**
   * Voce di legenda. Piu' strutture che condividono lo stesso gruppo
   * compaiono nell'albero come una riga sola — l'albero elenca i tipi di
   * struttura, il lato si legge passandoci sopra.
   */
  group?: { color: string; it: string; en: string };
};

/**
 * Gruppi di legenda del distretto renale. Il colore segue la convenzione
 * anatomica (arterie rosse, vene blu) e non quello delle singole mesh: nel
 * .glb il lato destro ha arteria blu e vene rosse, cioe' invertite rispetto
 * al sinistro. Da far verificare: o i nomi mesh o i colori sono sbagliati
 * nel file sorgente.
 */
const ARTERIES = { color: "#d83418", it: "Arterie renali", en: "Renal arteries" };
const VEINS = { color: "#8ca6f4", it: "Vene renali", en: "Renal veins" };
const URINARY = { color: "#cfe567", it: "Vie urinarie", en: "Urinary tracts" };

type District = {
  id: string;
  src: string;
  it: string;
  en: string;
  /** indici mesh dei gusci semitrasparenti, esclusi al primo sondaggio */
  shells: number[];
  /** indice mesh glTF -> struttura anatomica */
  structures: Record<number, Structure>;
  /** indici in ordine di legenda (le etichette ripetute vengono unite) */
  legend: number[];
  orbit: string;
  fov: string;
  /** centro di rotazione esplicito, quando il bounding box del file non e' affidabile */
  target?: string;
  /** mesh da ricolorare a runtime perche' nel .glb condividono un materiale */
  recolor?: Array<{ index: number; hex: number; opaque?: boolean }>;
};

const DISTRICTS: District[] = [
  {
    id: "liver",
    src: "/models/liver_card.glb",
    it: "Fegato",
    en: "Liver",
    shells: [0],
    orbit: "0deg 72deg auto",
    fov: "22deg",
    structures: {
      0: { color: "#dc8165", it: "Fegato", en: "Liver" },
      1: { color: "#8fed8f", it: "Lesione", en: "Lesion" },
      2: { color: "#8ca6f4", it: "Vena cava", en: "Vena cava" },
      3: { color: "#d83418", it: "Arteria epatica", en: "Hepatic artery" },
      4: { color: "#8a9562", it: "Colecisti", en: "Gallbladder" },
      5: { color: "#63baff", it: "Vena porta", en: "Portal vein" },
      6: { color: "#8ca6f4", it: "Vene epatiche", en: "Hepatic veins" },
    },
    legend: [0, 1, 3, 5, 6, 2, 4],
  },
  {
    id: "pancreas",
    src: "/models/pancreas_card.glb",
    it: "Pancreas",
    en: "Pancreas",
    shells: [1],
    orbit: "0deg 72deg auto",
    fov: "22deg",
    structures: {
      0: { color: "#8fed8f", it: "Lesione", en: "Lesion" },
      1: { color: "#e6c782", it: "Pancreas", en: "Pancreas" },
      2: { color: "#9c6ca1", it: "Milza", en: "Spleen" },
      3: { color: "#8ca6f4", it: "Vene", en: "Veins" },
      4: { color: "#d83418", it: "Arterie", en: "Arteries" },
      5: { color: "#d7a8a8", it: "Duodeno", en: "Duodenum" },
      6: { color: "#8a9562", it: "Colecisti", en: "Gallbladder" },
    },
    legend: [1, 0, 2, 5, 4, 3, 6],
  },
  {
    // NB: il file si chiama lungs_card.glb ma contiene un modello RENALE
    // (right_kidney, left_kidney, urinary_system...). E' l'unico modello di
    // rene con le mesh separate e nominate: kidney_card.glb e' una mesh unica
    // fusa e non permette di identificare nulla.
    id: "kidney",
    src: "/models/lungs_card.glb",
    it: "Rene",
    en: "Kidney",
    shells: [2, 10],
    // Il file contiene una mesh "Cube" di 2 unita' piantata all'origine, mentre
    // l'anatomia sta attorno a (-8.6, -252, -137.5). Il bounding box complessivo
    // risulta alto 349 invece di 193 e centrato nel vuoto fra i due, percio'
    // l'inquadratura automatica rimpicciolisce e scentra il modello: centro di
    // rotazione e raggio vanno imposti a mano sull'ingombro della sola anatomia.
    orbit: "0deg 75deg 500m",
    target: "-8.6m -252m -137.5m",
    fov: "24deg",
    // l'aorta condivide il materiale del rene destro e verrebbe resa marrone
    recolor: [{ index: 6, hex: 0xd83418, opaque: true }],
    structures: {
      // indice 0 = "Cube": elemento di scena, volutamente senza etichetta
      // le quattro cisti (1, 8, 9, 15) condividono un'unica etichetta, quindi
      // in legenda compaiono come una voce sola
      1: { color: "#d9a425", it: "Cisti renali", en: "Renal cysts" },
      2: { color: "#b86654", it: "Rene destro", en: "Right kidney" },
      3: { color: "#cfe567", it: "Via urinaria destra", en: "Right urinary tract", group: URINARY },
      4: { color: "#d83418", it: "Vene renali destre", en: "Right renal veins", group: VEINS },
      5: { color: "#8ca6f4", it: "Vena cava", en: "Vena cava" },
      // l'aorta e' un'arteria: pastiglia rossa come le altre arteriose, anche
      // se nel .glb condivide il materiale del rene destro e viene resa marrone
      6: { color: "#d83418", it: "Aorta", en: "Aorta" },
      7: { color: "#d83418", it: "Arteria renale sinistra", en: "Left renal artery", group: ARTERIES },
      8: { color: "#d9a425", it: "Cisti renali", en: "Renal cysts" },
      9: { color: "#d9a425", it: "Cisti renali", en: "Renal cysts" },
      10: { color: "#b86654", it: "Rene sinistro", en: "Left kidney" },
      11: { color: "#8fed8f", it: "Lesione", en: "Lesion" },
      12: { color: "#cfe567", it: "Via urinaria sinistra", en: "Left urinary tract", group: URINARY },
      13: { color: "#8ca6f4", it: "Vene renali sinistre", en: "Left renal veins", group: VEINS },
      14: { color: "#8ca6f4", it: "Arteria renale destra", en: "Right renal artery", group: ARTERIES },
      15: { color: "#d9a425", it: "Cisti renali", en: "Renal cysts" },
    },
    legend: [2, 10, 11, 1, 3, 6, 7, 5, 4],
  },
];

const copy = {
  it: {
    eyebrow: "Atlante interattivo",
    title: "Esplora l'anatomia",
    hint: "Passa il mouse sul modello per identificare le strutture. Trascina per ruotare.",
    hintTouch: "Tocca il modello per identificare le strutture. Trascina per ruotare.",
    legend: "Strutture nel modello",
    demoNote: "Casi anonimizzati mostrati a scopo dimostrativo.",
    loading: "Caricamento del modello",
  },
  en: {
    eyebrow: "Interactive atlas",
    title: "Explore the anatomy",
    hint: "Hover the model to identify structures. Drag to rotate.",
    hintTouch: "Tap the model to identify structures. Drag to rotate.",
    legend: "Structures in this model",
    demoNote: "Anonymised cases shown for demonstration purposes.",
    loading: "Loading model",
  },
} as const;

type ThreeMaterial = {
  clone: () => ThreeMaterial;
  color?: { setHex: (hex: number) => void };
  transparent?: boolean;
  opacity?: number;
  depthWrite?: boolean;
};

type ThreeMesh = {
  isMesh?: boolean;
  userData: { associations?: { meshes?: number }; noHit?: boolean };
  material?: ThreeMaterial | ThreeMaterial[];
};

type ModelViewerElement = HTMLElement & {
  surfaceFromPoint?: (x: number, y: number) => string | null;
  model?: {
    materials?: Array<{
      pbrMetallicRoughness?: {
        baseColorFactor: number[];
        setBaseColorFactor: (rgba: number[]) => void;
      };
    }>;
  };
};

/** mesh three.js corrispondenti agli indici glTF richiesti */
function findMeshes(viewer: ModelViewerElement | null, indices: number[]): ThreeMesh[] {
  const model = viewer?.model;
  if (!model || indices.length === 0) return [];

  const wanted = new Set(indices);
  const found: ThreeMesh[] = [];
  for (const symbol of Object.getOwnPropertySymbols(model)) {
    const value = (model as Record<symbol, unknown>)[symbol];
    if (!Array.isArray(value)) continue;

    for (const node of value) {
      const mesh = (node as { mesh?: ThreeMesh } | null)?.mesh;
      const index = mesh?.userData?.associations?.meshes;
      if (mesh?.isMesh && index !== undefined && wanted.has(index) && !found.includes(mesh)) {
        found.push(mesh);
      }
    }
  }
  return found;
}

type Hover = { index: number; x: number; y: number };

export function AnatomyAtlas() {
  const { lang } = useLanguage();
  const t = copy[lang] ?? copy.en;

  const [districtId, setDistrictId] = useState(DISTRICTS[0].id);
  const district = useMemo(
    () => DISTRICTS.find((d) => d.id === districtId) ?? DISTRICTS[0],
    [districtId],
  );

  const viewerRef = useRef<ModelViewerElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const shellsRef = useRef<ThreeMesh[] | null>(null);

  const [hover, setHover] = useState<Hover | null>(null);
  const [progress, setProgress] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // cambio distretto: il modello va ricaricato, la cache delle mesh non vale piu'
  useEffect(() => {
    shellsRef.current = null;
    setHover(null);
    setProgress(0);
  }, [districtId]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const onProgress = (event: Event) => {
      const detail = (event as CustomEvent<{ totalProgress?: number }>).detail;
      setProgress(detail?.totalProgress ?? 0);
    };
    viewer.addEventListener("progress", onProgress);
    return () => viewer.removeEventListener("progress", onProgress);
  }, [districtId]);

  /**
   * Ricolore a caricamento avvenuto. Serve per le mesh che nel .glb
   * condividono un materiale con un'altra struttura (l'aorta con il rene
   * destro): la scene-graph API pubblica lavora per materiale e le
   * ricolorerebbe entrambe, quindi alla singola mesh si assegna una copia
   * del materiale. Se qualcosa non torna si esce senza toccare nulla: il
   * modello resta com'e' nel file.
   */
  useEffect(() => {
    const viewer = viewerRef.current;
    const overrides = district.recolor;
    if (!viewer || !overrides?.length) return;

    const onLoad = () => {
      shellsRef.current = null; // il grafo e' nuovo, la cache non vale piu'
      let recolored = false;
      for (const { index, hex, opaque } of overrides) {
        const [mesh] = findMeshes(viewer, [index]);
        const current = mesh?.material;
        if (!mesh || !current || Array.isArray(current) || !current.color) continue;

        const copy = current.clone();
        copy.color?.setHex(hex);
        if (opaque) {
          copy.transparent = false;
          copy.opacity = 1;
          copy.depthWrite = true;
        }
        mesh.material = copy;
        recolored = true;
      }

      // model-viewer disegna su richiesta, e l'ultimo fotogramma lo produce
      // PRIMA di emettere "load": senza chiederne un altro la mesh ricolorata
      // resta del colore vecchio finche' l'utente non tocca il modello.
      // setBaseColorFactor riassegna il valore corrente — nessun effetto
      // visivo — ma passa dall'onUpdate interno, che accoda il disegno.
      if (recolored) {
        const pbr = viewer.model?.materials?.[0]?.pbrMetallicRoughness;
        pbr?.setBaseColorFactor([...pbr.baseColorFactor]);
      }
    };

    viewer.addEventListener("load", onLoad);
    return () => viewer.removeEventListener("load", onLoad);
  }, [district]);

  const probe = useCallback(
    (clientX: number, clientY: number) => {
      const viewer = viewerRef.current;
      const box = boxRef.current;
      if (!viewer?.surfaceFromPoint || !box) return;

      const hitIndex = (): number | null => {
        let surface: string | null = null;
        try {
          surface = viewer.surfaceFromPoint!(clientX, clientY);
        } catch {
          return null;
        }
        if (!surface) return null;
        const index = Number.parseInt(surface, 10);
        return Number.isNaN(index) ? null : index;
      };

      if (shellsRef.current === null) {
        shellsRef.current = findMeshes(viewer, district.shells);
      }
      const shells = shellsRef.current;

      let index: number | null;
      if (shells.length > 0) {
        // 1) gusci esclusi: se colpisco, e' una struttura interna e ha la precedenza
        shells.forEach((m) => {
          m.userData.noHit = true;
        });
        index = hitIndex();
        shells.forEach((m) => {
          m.userData.noHit = false;
        });

        // 2) niente lungo il raggio: solo allora vale il guscio dell'organo
        if (index === null) index = hitIndex();
      } else {
        index = hitIndex();
      }

      if (index === null || !district.structures[index]) {
        setHover(null);
        return;
      }

      const rect = box.getBoundingClientRect();
      setHover({ index, x: clientX - rect.left, y: clientY - rect.top });
    },
    [district],
  );

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

  const active = hover ? district.structures[hover.index] : null;
  // il tooltip usa sempre il nome specifico: e' li' che si legge il lato
  const activeLabel = active ? (lang === "it" ? active.it : active.en) : null;
  const activeGroup = active
    ? lang === "it"
      ? (active.group?.it ?? active.it)
      : (active.group?.en ?? active.en)
    : null;

  /**
   * Voci dell'albero. Le strutture con lo stesso gruppo — o con la stessa
   * etichetta, come le quattro cisti — si fondono in una riga sola.
   */
  const legend = useMemo(() => {
    const seen = new Set<string>();
    const rows: Array<{ key: string; label: string; color: string }> = [];

    for (const index of district.legend) {
      const structure = district.structures[index];
      if (!structure) continue;

      const source = structure.group ?? structure;
      const label = lang === "it" ? source.it : source.en;
      if (seen.has(label)) continue;

      seen.add(label);
      rows.push({ key: `${index}`, label, color: source.color });
    }
    return rows;
  }, [district, lang]);

  const loading = progress > 0 && progress < 1;

  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">{t.eyebrow}</p>
          <h3 className="mt-1 text-xl font-semibold text-[#0f2f63]">{t.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{isTouch ? t.hintTouch : t.hint}</p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.title}>
          {DISTRICTS.map((d) => {
            const selected = d.id === district.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setDistrictId(d.id)}
                aria-pressed={selected}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? "bg-blue-700 text-white shadow-md shadow-blue-500/25"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {lang === "it" ? d.it : d.en}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px]">
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
            key={district.id}
            src={district.src}
            alt={`${lang === "it" ? "Modello 3D" : "3D model"} — ${lang === "it" ? district.it : district.en}`}
            camera-controls
            disable-pan
            loading="lazy"
            reveal="auto"
            interaction-prompt="none"
            environment-image="neutral"
            exposure="0.95"
            shadow-intensity="0.35"
            camera-orbit={district.orbit}
            camera-target={district.target}
            field-of-view={district.fov}
            style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
          />

          {loading && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
              <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-slate-600 shadow">
                {t.loading} — {Math.round(progress * 100)}%
              </div>
            </div>
          )}

          {activeLabel && hover && active && (
            <div
              data-atlas-label
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[140%] whitespace-nowrap rounded-full bg-slate-900/92 px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
              style={{ left: hover.x, top: hover.y }}
            >
              <span
                className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                style={{ backgroundColor: active.color }}
              />
              {activeLabel}
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 px-6 py-5 lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t.legend}</p>
          <ul className="mt-3 space-y-1.5">
            {legend.map(({ key, label, color }) => (
              <li
                key={key}
                className={`flex items-center gap-2.5 rounded-lg px-2 py-1 text-sm transition ${
                  activeGroup === label
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "text-slate-600"
                }`}
              >
                <span
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {label}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-400">{t.demoNote}</p>
        </div>
      </div>
    </div>
  );
}
