"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay sebelum mulai (dalam detik) */
  delay?: number;
  /** Stagger antar child langsung (dalam detik) — untuk group */
  stagger?: number;
  /** Offset awal (px) */
  y?: number;
  once?: boolean;
}

/**
 * Scroll reveal GSAP (PRD §8: GSAP = narasi scroll).
 * - animasi hanya transform+opacity (amendemen #7)
 * - reduced-motion → tampil langsung (amendemen #6)
 * - gunakan useGSAP → cleanup otomatis StrictMode
 */
export function Reveal({
  children,
  as,
  className,
  delay = 0,
  stagger = 0,
  y = 32,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as ?? "div") as React.ComponentType<Record<string, unknown>>;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = stagger > 0 ? Array.from(el.children) : [el];
      const reduceMotion = prefersReducedMotion();

      if (reduceMotion) {
        gsap.set(targets, { clearProps: "all" });
        return;
      }

      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          delay,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className)}>
      {children}
    </Tag>
  );
}
