"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { HeaderNav } from "@/components/HeaderNav";
import ModelViewer from "@/components/ModelViewer";
import { SiteFooter } from "@/components/SiteFooter";

export function HomePageContent() {
  const { dict } = useLanguage();
  const { home } = dict;

  // L'indicatore va fissato al viewport, non al fondo dell'hero: l'hero e'
  // alto 852px e ancorato li' finirebbe sotto la piega su schermi da 800px o
  // coperto dal footer fisso su quelli da 900. Sparisce appena si scorre.
  const [showHint, setShowHint] = useState(true);
  useEffect(() => {
    const onScroll = () => setShowHint(window.scrollY < 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeaderNav active="company" cta={{ href: "/product/surgical-planning", labelKey: "exploreProduct" }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5f8ff] via-white to-[#eefdf5]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-64 -left-40 h-[520px] w-[520px] rounded-full bg-blue-200/40 blur-[120px]" />
          <div className="absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-200/30 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-slate-900">
                {home.hero.titleLine1}
                <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {home.hero.titleLine2}
                </span>
              </h1>
              <p className="mt-6 text-lg text-slate-700 max-w-2xl">{home.hero.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/product/surgical-planning"
                  className="rounded-full bg-[#0047ff] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/35 transition hover:-translate-y-0.5 hover:bg-[#003ae0]"
                >
                  {home.hero.discover}
                </a>
                <a
                  href="#about"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                >
                  {home.hero.about}
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative w-full max-w-[980px] lg:-ml-28 xl:-ml-40">
                <ModelViewer
                  src="/models/logo3d.glb"
                  autoRotate={true}
                  autoplay={true}
                  cameraControls={true}
                  shadowIntensity="0.5"
                  suppressHydrationWarning={true}
                  {...{
                    "environment-image": "neutral",
                    "interaction-prompt": "none",
                    "disable-default-environment": true,
                  }}
                  style={{ width: "150%", height: "660px", background: "transparent" }}
                />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Indicatore di scorrimento. bottom-[70px] da md in su per stare sopra
          il footer fisso, alto 53px. */}
      <a
        href="#about"
        className={`fixed inset-x-0 bottom-6 z-30 mx-auto flex w-fit flex-col items-center gap-1.5 text-slate-400 transition-opacity duration-300 hover:text-slate-600 md:bottom-[70px] ${
          showHint ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.25em]">{home.hero.scrollHint}</span>
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <section id="about" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-28">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#0f2f63]">{home.about.title}</h2>
            <p className="mt-4 text-slate-700">{home.about.paragraph1}</p>
            <p className="mt-4 text-slate-700">{home.about.paragraph2}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">{home.about.listTitle}</h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              {home.about.list.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="why" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#0f2f63]">{home.why.title}</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {home.why.cards.map((card) => (
              <article key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{card.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="/product/surgical-planning"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-semibold hover:bg-slate-800"
            >
              {home.why.cta}
            </a>
          </div>
        </div>
      </section>

      {/* Percorso regolatorio e scientifico — dopo "Perché Intus.AI", prima della CTA finale */}
      <section id="regulatory" className="mx-auto max-w-7xl px-4 py-16 scroll-mt-28">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#0f2f63]">{home.regulatory.title}</h2>
          <p className="mt-4 max-w-4xl text-slate-700 leading-relaxed">{home.regulatory.body}</p>
        </div>
      </section>

      <section id="contact" className="bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-200">{home.contact.badge}</p>
          <h2 className="mt-4 text-3xl lg:text-4xl font-semibold tracking-tight">{home.contact.title}</h2>
          <p className="mt-3 text-slate-300">{home.contact.description}</p>
          <div className="mt-8">
            <a
              href="/support#contact"
              className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-slate-100"
            >
              {home.contact.cta}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
