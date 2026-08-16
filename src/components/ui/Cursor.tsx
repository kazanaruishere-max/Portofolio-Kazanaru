"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/reduced-motion";

const DOT = 8;
const RING = 32;

/**
 * Custom cursor minimal (PRD: dot 8px + ring 32px, TANPA trail).
 * - Pakai useRef + gsap.quickTo (amendemen #9: dilarang useState untuk pointer physics)
 * - Hanya aktif di device fine-pointer (desktop); touch pakai native
 * - aria-hidden + pointer-events-none (amendemen #5)
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;
    if (typeof window === "undefined") return;

    // Nonaktif di touch / reduced-motion
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = prefersReducedMotion();
    if (!finePointer || reduceMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    // quickTo = lerp tanpa re-render React
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let hovering = false;
    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.3, ease: "power2.out" });
    };

    const onMove = (e: MouseEvent) => {
      reveal();
      dotX(e.clientX - DOT / 2);
      dotY(e.clientY - DOT / 2);
      ringX(e.clientX - RING / 2);
      ringY(e.clientY - RING / 2);
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest(
        "a, button, [data-cursor='interactive']"
      );
      if (interactive && !hovering) {
        hovering = true;
        gsap.to(ring, { scale: 1.8, opacity: 0.35, duration: 0.3, ease: "power2.out" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest(
        "a, button, [data-cursor='interactive']"
      );
      if (!interactive && hovering) {
        hovering = false;
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[var(--z-cursor)] hidden opacity-0 md:block"
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full bg-accent will-change-transform"
        style={{ width: DOT, height: DOT }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border border-accent/40 will-change-transform"
        style={{ width: RING, height: RING }}
      />
    </div>
  );
}
