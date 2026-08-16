"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { useLang } from "@/lib/lang";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { useProximity } from "@/components/ui";
import { profile } from "@/content/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Timeline — horizontal pin scroll (PRD §6.7, pola design-taste 5.B).
 * Scroll vertikal → section ter-pin → track bergerak horizontal.
 * Fallback reduced-motion: tanpa pin, konten tampil vertikal.
 */
export function TimelineSection() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;

      const reduce = prefersReducedMotion();
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      if (reduce || coarsePointer) return;

      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: wrapRef }
  );

  return (
    <section ref={wrapRef} className="timeline-scene relative overflow-hidden">
      <div ref={trackRef} className="timeline-track flex h-[100dvh] items-center gap-0 px-6 md:px-10">
        <div className="w-[70vw] shrink-0 md:w-[40vw]">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-text-muted">04 / Momentum</p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-text md:text-6xl">
            Perjalanan
          </h2>
        </div>

        {profile.timeline.map((item, i) => (
          <TimelineItem key={item.id} text={item[lang]} index={i} />
        ))}
      </div>
    </section>
  );
}

function TimelineItem({ text, index }: { text: string; index: number }) {
  const ref = useProximity<HTMLDivElement>({ type: "shift", strength: 0.2, range: 150, maxShift: 6 });
  return (
    <div
      ref={ref}
      className="w-[75vw] shrink-0 border-l border-line pl-8 will-change-transform md:w-[38vw]"
    >
      <motion.p
        className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        2026 · {String(index + 1).padStart(2, "0")}
      </motion.p>
      <motion.p
        className="mt-4 max-w-[28ch] font-display text-2xl font-medium leading-snug text-text md:text-3xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        {text}
      </motion.p>
    </div>
  );
}
