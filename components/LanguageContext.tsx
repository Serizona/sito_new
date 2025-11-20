"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { translations, type Locale, type TranslationDict } from "@/lib/translations";

type LanguageContextValue = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  dict: TranslationDict;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "it",
  setLang: () => {},
  dict: translations.it,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>("it");
  const value = useMemo(
    () => ({
      lang,
      setLang,
      dict: translations[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
