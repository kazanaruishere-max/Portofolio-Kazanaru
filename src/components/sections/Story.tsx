"use client";

import { Monogram, OutlinedText, Reveal, SectionHeading } from "@/components/ui";
import { useLang, useT } from "@/lib/lang";
import { profile } from "@/content/profile";

/**
 * Story (PRD §6.4) — editorial 2 kolom asimetris.
 * Badge Top-100, poin kunci, quote, stats. Backdrop outlined word 2D.
 */
export function Story() {
  const { lang } = useLang();
  const story = useT(profile.story);
  const quote = useT(profile.quote);
  const storyTitle = useT(profile.titles.story);
  const points = profile.points[lang];
  const stats = profile.stats[lang];
  const facts = profile.facts[lang];

  return (
    <section id="about" className="cv-auto relative overflow-hidden px-6 py-32 md:px-10 md:py-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <OutlinedText
          text="IMPACT"
          className="absolute right-0 top-8 whitespace-nowrap font-display font-bold leading-none md:right-4 [font-size:clamp(3rem,10vw,9rem)]"
        />
      </div>

      <div className="relative z-[var(--z-content)]">
        <SectionHeading index="02" title={storyTitle} />

        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="max-w-[65ch] text-xl leading-relaxed text-text md:text-2xl">
              {story}
            </p>

            <ul className="mt-10 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 font-mono text-sm text-text-secondary">
                  <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                  {point}
                </li>
              ))}
            </ul>

            <blockquote className="mt-12 border-t border-line pt-8">
              <p className="font-display text-2xl leading-snug text-text md:text-3xl">
                “{quote}”
              </p>
              <footer className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                · {profile.name}
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <div className="flex flex-col gap-8">
              <Monogram />

              <div className="inline-flex w-fit items-center gap-3 border border-line px-4 py-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-text">
                  {profile.badge}
                </span>
              </div>

              <ul className="space-y-3">
                {facts.map((fact, i) => (
                  <li key={fact} className="flex gap-3 font-mono text-sm leading-relaxed text-text-secondary">
                    <span aria-hidden="true" className="font-display text-text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>

              <dl className="space-y-6 border-t border-line pt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
                    <dd className="font-display text-3xl text-text">{stat.value}</dd>
                    <dt className="text-right font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
