"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "id" | "en";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
  lang: "id",
  setLang: () => {},
});

/** Struktur teks bilingual yang dipakai seluruh content data. */
export interface LText {
  id: string;
  en: string;
}

/**
 * i18n provider (PRD: dual ID/EN toggle).
 * Men-sinkronkan `lang` attribute di <html> (a11y/SEO).
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}

/** Ambil teks sesuai bahasa aktif — berubah otomatis saat lang berubah. */
export function useT(text: LText): string {
  const { lang } = useLang();
  return text[lang];
}
