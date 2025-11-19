"use client";

import Image, { type ImageLoader } from "next/image";
import { useMemo, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";

const framePaths = [8, 7, 6, 5, 4, 3, 2, 1].map((n) => `/hero/${n}.png`);
const legendImageSrc = "/hero/tab.png";
const legendLoader: ImageLoader = ({ src }) => `${src}?v=2`;

export function SliceViewer() {
  const frames = useMemo(() => framePaths, []);
  const [index, setIndex] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const { dict } = useLanguage();
  const { sliceViewer } = dict;

  const handleStep = (direction: "prev" | "next") => {
    setIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? frames.length - 1 : prev - 1;
      }
      return prev === frames.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <section className="relative mx-auto mt-12 max-w-5xl rounded-[40px] border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-[#f1fbf6] p-8 shadow-[0_25px_80px_rgba(15,35,80,0.1)]">
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
        {sliceViewer.title}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.45fr_0.55fr] items-start">
        <div ref={viewerRef} className="relative overflow-hidden rounded-[44px] border border-white/60 bg-black p-7">
          <Image
            src={frames[index]}
            alt={`CT slice ${frames.length - index}`}
            width={900}
            height={600}
            priority
            className="w-full object-contain rounded-[36px]"
          />
          <div className="pointer-events-none absolute left-7 top-7 rounded-full bg-black/60 px-5 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            ViC demo
          </div>
        </div>

        <div className="flex items-start justify-center">
          <Image
            src={legendImageSrc}
            loader={legendLoader}
            alt="Legend of segmented structures"
            width={360}
            height={480}
            className="w-full max-w-[260px] rounded-[20px] border border-white/70 object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            onClick={() => handleStep("prev")}
          >
            &larr;
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            onClick={() => handleStep("next")}
          >
            &rarr;
          </button>
        </div>
        <input
          type="range"
          min={0}
          max={frames.length - 1}
          value={index}
          onChange={(event) => setIndex(Number(event.target.value))}
          className="w-full accent-slate-900"
        />
      </div>
      <p className="mt-4 text-sm text-slate-500">{sliceViewer.caption}</p>
    </section>
  );
}
