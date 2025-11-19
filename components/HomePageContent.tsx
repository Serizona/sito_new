"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import { HeaderNav } from "@/components/HeaderNav";
import ModelViewer from "@/components/ModelViewer";

export function HomePageContent() {
  const { dict } = useLanguage();
  const { home } = dict;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeaderNav active="company" cta={{ href: "/product/vic", labelKey: "exploreProduct" }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5f8ff] via-white to-[#eefdf5]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-64 -left-40 h-[520px] w-[520px] rounded-full bg-blue-200/40 blur-[120px]" />
          <div className="absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-200/30 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="mt-6 text-5xl md:text-6xl lg:text-[64px] font-black leading-[1.05] text-slate-900">
                {home.hero.titleLine1}
                <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {home.hero.titleLine2}
                </span>
              </h1>
              <p className="mt-6 text-lg text-slate-700 max-w-2xl">{home.hero.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/product/vic"
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
              <div className="relative w-full max-w-[720px]">
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
                  style={{ width: "120%", height: "460px", background: "transparent" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-28">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold">{home.about.title}</h2>
            <p className="mt-4 text-slate-700">{home.about.paragraph1}</p>
            <p className="mt-4 text-slate-700">{home.about.paragraph2}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold">What we do</h3>
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
          <h2 className="text-2xl lg:text-3xl font-semibold">{home.why.title}</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {home.why.cards.map((card) => (
              <article key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-blue-700">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{card.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="/product/vic"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-semibold hover:bg-slate-800"
            >
              {home.why.cta}
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-200">{home.contact.badge}</p>
          <h2 className="mt-4 text-3xl lg:text-4xl font-semibold">{home.contact.title}</h2>
          <p className="mt-3 text-slate-300">{home.contact.description}</p>
          <div className="mt-8">
            <a
              href="/support"
              className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-slate-100"
            >
              {home.contact.cta}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} IntusAI S.r.l. — All rights reserved</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="hover:text-slate-200 md:hover:text-slate-900">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-200 md:hover:text-slate-900">
              Cookies
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
