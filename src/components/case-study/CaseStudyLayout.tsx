"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CountUp, MotionToggle, Reveal } from "@/components/ui";
import { useLang } from "@/lib/lang";
import { profile } from "@/content/profile";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

interface CaseStudyLayoutProps {
  project: Project;
}

function resetScroll() {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(0, { duration: 0 });
  else window.scrollTo(0, 0);
}

/**
 * Case study — 3 layout unik per proyek (PRD §6.6, bukan template sama):
 * tilt (SafeWallet): editorial 2-kolom, sticky title kiri
 * data (Xondra): metrics hero + count-up
 * terminal (SEITH): blok terminal mono
 */
export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  const { lang } = useLang();

  useEffect(() => {
    resetScroll();
  }, [project.slug]);

  const data = project.layout === "data";

  return (
    <main className="min-h-dvh">
      <header className="fixed inset-x-0 top-0 z-[var(--z-ui)] flex items-center justify-between border-b border-line bg-bg/80 px-6 py-4 backdrop-blur md:px-10">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.3em] text-text"
        >
          {profile.name}
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-text"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Work
          </Link>
          <MotionToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-36 md:px-10 md:pt-44">
        <div className={cn("grid gap-10", data && "lg:grid-cols-12 lg:items-end")}>
          <div className={cn(data && "lg:col-span-7")}>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-text-muted">
              {project.number} / Case Study
            </p>
            <h1
              className="mt-4 font-display font-medium leading-[0.95] tracking-[-0.04em] text-balance text-text"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
            >
              {project.name}
            </h1>
            <p className="mt-4 font-mono text-sm uppercase tracking-[0.15em] text-text-secondary">
              {project.tagline[lang]}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-[3px] border border-line px-2.5 py-1 font-mono text-xs text-text-secondary">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-text underline-offset-4 hover:underline"
                >
                  {link.label}
                  {link.external && (
                    <ExternalLink size={14} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {data && project.metrics && (
            <div className="lg:col-span-4 lg:col-start-9">
              <dl className="grid grid-cols-1 gap-8">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="border-l border-line pl-6">
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                      {metric.label}
                    </dt>
<dd className="mt-1 font-display text-5xl font-medium tracking-tight text-text">
  <CountUp value={metric.value} />
  <span aria-hidden="true" className="mt-2 block h-0.5 w-12 bg-text" />
</dd>
                    {metric.note && (
                      <dd className="mt-1 font-mono text-xs text-text-muted">* {metric.note[lang]}</dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Konteks</p>
          <p className="mt-6 text-xl leading-relaxed text-text md:text-2xl">{project.story[lang]}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-20 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Yang dibangun</p>
          <ul className="mt-8 space-y-6 border-t border-line pt-8">
            {project.proof.map((p, i) => (
              <li key={p[lang]} className="flex gap-6">
                <span className="font-display text-2xl font-medium text-text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-lg leading-relaxed text-text-secondary">{p[lang]}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {project.gallery && project.gallery.length > 0 && (
          <Reveal delay={0.1} className="mt-20">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Bukti / Hasil</p>
            <div className="mt-8 gap-2 sm:columns-2">
              {project.gallery.map((src) => (
                <div key={src} className="mb-2 break-inside-avoid border border-line bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element -- galeri screenshot: natural ratio, masonry */}
                  <img
                    src={src}
                    alt={`${project.name} · ${project.tagline.en}`}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {project.layout === "terminal" && (
          <Reveal delay={0.1} className="mt-20 max-w-3xl">
            <div className="border border-line bg-surface p-6 font-mono text-sm leading-relaxed text-text-muted md:p-8">
              <p className="text-text-secondary">$ seith --status</p>
              <p className="mt-3">&gt; filters: bayesian, cvar, compass, orderflow</p>
              <p className="mt-2">&gt; instrument: XAUUSD</p>
              <p className="mt-2">&gt; interface: cli-only</p>
              <p className="mt-2">&gt; learning: journal → recalibrate → auto-kill</p>
              <p className="mt-6 text-text">&gt; status: autonomous ✓</p>
            </div>
          </Reveal>
        )}

        {project.layout === "tilt" && (
          <Reveal delay={0.1} className="mt-20 max-w-3xl">
            <div
              aria-hidden="true"
              className="relative h-64 overflow-hidden border border-line md:h-96"
              style={{
                background:
                  "radial-gradient(circle at 20% 80%, var(--surface-elevated) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--surface-elevated) 0%, transparent 45%)",
              }}
            />
          </Reveal>
        )}
      </section>

      {/* Next */}
      <section className="border-t border-line px-6 py-16 md:px-10">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-3 font-display text-2xl font-medium tracking-tight text-text transition-opacity hover:opacity-70 md:text-4xl"
        >
          <ArrowLeft size={20} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
          Semua proyek
        </Link>
      </section>
    </main>
  );
}
