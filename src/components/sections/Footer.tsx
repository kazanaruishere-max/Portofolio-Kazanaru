"use client";

import { ArrowUp } from "lucide-react";
import { useT } from "@/lib/lang";
import { profile } from "@/content/profile";

export function Footer() {
  const builtIn = useT(profile.builtIn);

  return (
    <footer className="cv-auto relative border-t border-line px-6 py-10 md:px-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs text-text-muted">{builtIn}</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-text"
        >
          Kembali ke atas
          <ArrowUp size={14} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
