"use client";

import { useLanguage } from "./LanguageContext";

const flags: Record<"en" | "it", string> = {
  en: "ENG",
  it: "ITA",
};

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm shadow-sm">
      {(Object.keys(flags) as Array<keyof typeof flags>).map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => setLang(locale)}
          className={`transition ${lang === locale ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
          aria-label={locale === "en" ? "Switch to English" : "Passa all'italiano"}
        >
          {flags[locale]}
        </button>
      ))}
    </div>
  );
}
