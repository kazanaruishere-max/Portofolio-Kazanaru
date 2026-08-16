"use client";

import { useLang } from "@/lib/lang";

/**
 * Toggle bahasa ID/EN (PRD: dual language).
 */
export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "id" ? "en" : "id")}
      aria-label={lang === "id" ? "EN · ganti bahasa" : "ID · ganti bahasa"}
      className="rounded-full border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors hover:border-line-strong hover:text-text"
    >
      {lang === "id" ? "EN" : "ID"}
    </button>
  );
}
