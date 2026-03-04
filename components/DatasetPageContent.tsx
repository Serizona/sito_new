"use client";

import Image from "next/image";
import { SliceViewer } from "@/components/SliceViewer";
import { useLanguage } from "@/components/LanguageContext";
import { HeaderNav } from "@/components/HeaderNav";

export function DatasetPageContent() {
  const { dict } = useLanguage();
  const { dataset } = dict;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeaderNav active="dataset" cta={{ href: "/support", labelKey: "talkToUs" }} />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#eef3ff] via-white to-[#e8fff4]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-[110px]" />
            <div className="absolute -bottom-32 right-[-80px] h-[420px] w-[420px] rounded-full bg-emerald-200/40 blur-[130px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur">
              {dataset.hero.badge}
            </p>
            <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-slate-900">{dataset.hero.title}</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-700">{dataset.hero.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#ircad"
                className="rounded-full bg-[#0047ff] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:-translate-y-0.5 hover:bg-[#003ae0]"
              >
                {dataset.hero.explore}
              </a>
            </div>
          </div>
        </section>

        <SliceViewer />

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-8 rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_40px_120px_rgba(15,35,80,0.08)]">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900">{dataset.stats.title}</h2>
                <p className="mt-4 text-slate-600">{dataset.stats.description}</p>
              </div>
              <div className="rounded-[36px] border border-slate-100 bg-slate-50/80 p-6 mt-6 md:mt-0">
                <dl className="space-y-4 text-sm text-slate-700">
                  {dataset.stats.metrics.map((metric) => (
                    <div key={metric.label} className="flex justify-between gap-4">
                      <dt>{metric.label}</dt>
                      <dd className="font-semibold text-slate-900">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <p className="text-sm text-slate-500">{dataset.stats.note}</p>
          </div>
        </section>

        {false && (
          <section
            id="ircad"
            className="relative overflow-hidden bg-gradient-to-br from-[#0c1533] via-[#0b1f3a] to-[#0a2d35] text-white"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
              <div className="absolute right-[-80px] -bottom-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-[130px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
            </div>
            <div className="relative mx-auto max-w-6xl px-4 py-16 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold tracking-[0.3em] uppercase text-blue-100 shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
                  {dataset.ircad.badge}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">{dataset.ircad.title}</h2>
                <p className="text-base md:text-lg text-white/80">{dataset.ircad.description}</p>
                {dataset.ircad.note ? (
                  <p className="text-base md:text-lg text-white/70 italic">{dataset.ircad.note}</p>
                ) : null}
              </div>
            </div>
          </section>
        )}

      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} IntusAI S.r.l. — All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-slate-700">
              Privacy
            </a>
            <a href="mailto:info@intusai.com" className="hover:text-slate-700">
              info@intusai.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
