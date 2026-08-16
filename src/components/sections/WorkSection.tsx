"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { useLang } from "@/lib/lang";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { CountUp, PinSection, useProximity } from "@/components/ui";
import { projects, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

interface ChapterProps {
  project: Project;
}

function Chapter({ project }: ChapterProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isData = project.layout === "data";
  const { lang } = useLang();

  // scrub halus: konten meredup + mengecil menjelang akhir pin
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const reduce = prefersReducedMotion();
    if (reduce) return;
    const tween = gsap.to(inner, {
      scale: 0.97,
      opacity: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: inner,
        start: "top top",
        end: "+=70vh",
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // a11y: chapter di luar viewport → inert (tab tidak loncat, screen reader skip)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    if (reduce) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        el.toggleAttribute("inert", !self.isActive);
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div ref={sectionRef}>
      <PinSection className="flex min-h-[100dvh] items-center px-6 md:px-10">
        <div ref={innerRef} className="w-full will-change-transform">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Kiri: identitas */}
          <div className="lg:col-span-6">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-text-muted">
              {project.number} / 03
            </p>
            <h3 className="mt-4 font-display text-5xl font-medium tracking-tight text-text md:text-7xl">
              <Link
                href={`/work/${project.slug}`}
                className="group inline-flex items-baseline gap-3 underline-offset-8 transition-colors hover:underline"
              >
                {project.name}
                <ArrowUpRight
                  size={28}
                  aria-hidden="true"
                  className="inline self-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </h3>
            <p className="mt-3 font-mono text-sm uppercase tracking-[0.15em] text-text-secondary">
              {project.tagline[lang]}
            </p>

{project.badges?.map((badge) => (
              <span
                key={badge}
                className="mt-4 inline-flex items-center gap-2 bg-text px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-bg"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-bg" />
                {badge}
              </span>
            ))}

            <p className="mt-8 max-w-[55ch] leading-relaxed text-text-secondary">
              {project.story[lang]}
            </p>

            <ul className="mt-6 space-y-2">
              {project.proof.map((p) => (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3 font-mono text-sm text-text-muted"
                >
                  <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-line-strong" />
                  {p[lang]}
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  className="rounded-[3px] border border-line px-2.5 py-1 font-mono text-xs text-text-secondary"
                >
                  {t}
                </motion.span>
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
                    <ExternalLink
                      size={14}
                      aria-hidden="true"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Kanan: visual unik per proyek (metrics + screenshot/terminal) */}
          <div className="lg:col-span-5 lg:col-start-8">
            {isData && project.metrics && (
              <dl className="mb-8 space-y-6 border-l border-line pl-8">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                      {metric.label}
                    </dt>
<dd className="mt-1 font-display text-4xl font-medium tracking-tight text-text md:text-5xl">
  <CountUp value={metric.value} />
  <span aria-hidden="true" className="mt-2 block h-0.5 w-10 bg-text" />
</dd>
                    {metric.note && (
                      <dd className="mt-1 font-mono text-xs text-text-muted">* {metric.note[lang]}</dd>
                    )}
                  </div>
                ))}
              </dl>
            )}
            <VisualTilt project={project} />
          </div>
        </div>
        </div>
      </PinSection>
    </div>
  );
}

/**
 * Work — 3 chapter pin (PRD §6.6). Tiap proyek 150vh-feel:
 * chapter "menetap" di layar, konten scrub meredup, lepas → chapter berikut.
 */
export function WorkSection() {
  return (
    <section id="work" className="relative">
      <div className="px-6 pt-24 md:px-10">
        <h2 className="font-mono text-sm uppercase tracking-[0.3em] text-text-muted">03 / Work</h2>
      </div>
      {projects.map((project) => (
        <Chapter key={project.slug} project={project} />
      ))}
    </section>
  );
}

/** Visual proyek — screenshot nyata (jika ada), terminal typing (SEITH), atau gradien. */
function VisualTilt({ project }: { project: Project }) {
  const ref = useProximity<HTMLDivElement>({ type: "tilt", strength: 0.5, range: 200, maxTilt: 4 });

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden border border-line will-change-transform",
        project.layout === "terminal" && "bg-surface font-mono"
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {project.image || project.gallery?.[0] ? (
        <Image
          src={project.image ?? project.gallery![0]}
          alt={`${project.name} · ${project.tagline.en}`}
          width={1280}
          height={720}
          sizes="(max-width: 768px) 100vw, 40vw"
          className="h-auto w-full object-cover"
        />
      ) : project.layout === "terminal" ? (
        <div className="min-h-64 md:min-h-80">
          <TerminalType name={project.name} />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="aspect-[16/9]"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, var(--surface-elevated) 0%, transparent 55%), radial-gradient(circle at 80% 20%, var(--surface-elevated) 0%, transparent 45%)",
          }}
        />
      )}
    </div>
  );
}

const TERMINAL_LINES = [
  "systems.check --filters=4",
  "bayesian: pass",
  "cvar: pass",
  "market.compass: aligned",
  "orderflow: confirmed",
  "status: autonomous",
];

function TerminalType({ name }: { name: string }) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(reduce ? TERMINAL_LINES.length : 0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDone(i);
      if (i >= TERMINAL_LINES.length) clearInterval(id);
    }, 320);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 p-6 text-sm leading-relaxed text-text-muted md:p-8"
    >
      <p className="text-text-secondary">{name.toLowerCase()}</p>
      {TERMINAL_LINES.slice(0, done).map((line) => (
        <p key={line} className="mt-2 text-text-muted">
          &gt; {line}
        </p>
      ))}
      <span className="mt-2 inline-block h-4 w-2 animate-pulse bg-text" />
    </div>
  );
}
