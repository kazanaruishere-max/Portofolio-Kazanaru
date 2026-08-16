"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/reduced-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PinSectionProps {
  children: ReactNode;
  className?: string;
  /** Jarak pin dalam px dari viewport (default 100dvh) */
  distance?: number;
}

/**
 * Generic pinned section (PRD §6.6/6.7, pola design-taste 5.A).
 * Konten "menetap" di viewport selama `distance` scroll, lalu lepas.
 * - ScrollTrigger.create (bukan dummy tween) + start "top top"
 * - reduced-motion → tanpa pin (scroll normal)
 */
export function PinSection({ children, className, distance }: PinSectionProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduceMotion = prefersReducedMotion();
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      if (reduceMotion || coarsePointer) return;

      const amount = distance ?? window.innerHeight;

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${amount}`,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
