"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { gsap } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { useT } from "@/lib/lang";
import { useMediaQuery } from "@/lib/use-media-query";
import { Magnetic, OutlinedText, useProximity } from "@/components/ui";
import { profile } from "@/content/profile";

const SplineSceneLazy = dynamic(
  () => import("@/components/SplineScene").then((m) => m.SplineScene),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full w-full place-items-center" aria-hidden="true">
        <OutlinedText
          text="AZKA"
          className="whitespace-nowrap font-display font-bold leading-none [font-size:clamp(3rem,8vw,7rem)]"
        />
      </div>
    ),
  }
);

gsap.registerPlugin(useGSAP);

/**
 * Hero split editorial (PERSONALIZE):
 * LEFT — role line · nama raksasa · tagline singkat · 2 CTA (4 elemen teks)
 * RIGHT — Spline robot monokrom (lazy, dekoratif)
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const available = useT(profile.available);
  const role = useT(profile.role);
  const tagline = useT(profile.tagline);
  const nameProximity = useProximity<HTMLHeadingElement>({ type: "shift", strength: 0.18, range: 160 });
  const robotParallax = useProximity<HTMLDivElement>({ type: "shift", strength: 0.35, range: 400, maxShift: 32 });
  // Spline hanya dimuat di tablet+desktop (Android <768px: tidak mount → hemat TBT/bytes)
  const isTabletUp = useMediaQuery("(min-width: 768px)");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      if (prefersReducedMotion()) return;

      // Nama hero TIDAK di-hide (LCP: teks tampil langsung di HTML).
      // Pertahankan hanya scrub parallax konten.
      const content = root.querySelector<HTMLElement>("[data-hero-content]");
      if (content) {
        gsap.to(content, {
          y: -50,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: rootRef }
  );

  const goTo = (href: string) => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(href, { offset: 0 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-6 pb-24 pt-28 md:px-10"
    >
      <div className="grid items-center gap-4 lg:grid-cols-12" data-hero-content>
        {/* LEFT — teks */}
        <div className="relative z-[var(--z-content)] lg:col-span-6">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-text-muted" data-cursor="interactive">
          {role} · {available}
        </p>

        <h1
          ref={nameProximity}
          data-hero-name
          className="font-display font-medium leading-[0.95] tracking-[-0.04em] text-balance will-change-transform"
          style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
        >
          <span className="block overflow-hidden">
            <span data-hero-line className="block will-change-transform">AZKA</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block will-change-transform">SYAHIRULL</span>
          </span>
        </h1>

        <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-text-secondary">{tagline}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <button
              type="button"
              onClick={() => goTo("#work")}
              className="group flex items-center gap-2 rounded-full border border-line px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-text transition-colors hover:border-text active:scale-[0.98]"
            >
              View Work
              <ArrowDown
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </button>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={() => goTo("#contact")}
              className="rounded-full bg-text px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85 active:scale-[0.98]"
            >
              Contact
            </button>
          </Magnetic>
        </div>
        </div>

        {/* RIGHT — Spline robot (paralaks ikut kursor) — tablet + desktop, white ghost mono */}
        <div
          ref={robotParallax}
          className="relative hidden bg-bg will-change-transform md:block lg:col-span-6"
        >
          {isTabletUp && (
            <div className="h-[80vh] w-full will-change-transform [filter:grayscale(1)_brightness(1.1)]">
              <SplineSceneLazy scene={profile.spline} className="h-full w-full" />
            </div>
          )}
          <p
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted"
          >
            digital twin · motion on
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-6 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted [writing-mode:vertical-rl]">
          {profile.email}
        </span>
        <span aria-hidden="true" className="h-8 w-px bg-line-strong" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted [writing-mode:vertical-rl]">
          {role} · {available}
        </span>
      </div>

      <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted">
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
