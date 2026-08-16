"use client";

import { PullUp, useProximity } from "@/components/ui";
import { useLang } from "@/lib/lang";
import { profile } from "@/content/profile";

/**
 * Manifesto "How I Work" (PRD §6.5) — 3 baris besar.
 * Word PullUp per baris (POLISH §5) + proximity shift saat mouse dekat.
 */
export function Manifesto() {
  const { lang } = useLang();
  const lines = profile.manifesto[lang];

  return (
    <section className="cv-auto relative px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-5xl">
        <div className="border-b border-line">
          {lines.map((line) => (
            <ManifestoLine key={line} line={line} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ManifestoLine({ line }: { line: string }) {
  const ref = useProximity<HTMLParagraphElement>({
    type: "shift",
    strength: 0.14,
    range: 180,
    maxShift: 10,
  });

  return (
    <div className="overflow-hidden">
      <p
        ref={ref}
        className="border-t border-line py-6 font-display text-3xl font-medium leading-tight tracking-tight text-text will-change-transform md:text-5xl"
      >
        <PullUp text={line} />
      </p>
    </div>
  );
}
