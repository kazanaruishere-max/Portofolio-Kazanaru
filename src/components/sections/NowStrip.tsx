"use client";

import { useT } from "@/lib/lang";
import { profile } from "@/content/profile";

/**
 * "Currently" strip personal (POLISH §B) — sinyal aktivitas & availability.
 * Slender, mono, di bawah hero.
 */
export function NowStrip() {
  const now = useT(profile.now);
  return (
    <section className="border-y border-line px-6 py-4 md:px-10" aria-label="Currently">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
        <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        {now}
      </p>
    </section>
  );
}
