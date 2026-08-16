"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { gsap } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/reduced-motion";

interface MagneticProps {
  children: ReactNode;
  /** Kekuatan magnet (0-1). Default 0.4 */
  strength?: number;
  as?: ElementType;
  className?: string;
}

/**
 * Magnetic wrapper (PRD: magnetic button / CTA).
 * - useRef + quickTo (amendemen #9 — dilarang useState untuk pointer physics)
 * - rect di-cache saat pointer masuk (anti layout-thrash / reflow per-frame)
 * - reset tween di-track → di-kill saat unmount (anti memory leak)
 * - nonaktif di touch (pointer coarse) & reduced-motion; animasi transform-only
 */
export function Magnetic({
  children,
  strength = 0.4,
  as,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as ?? "div") as React.ComponentType<Record<string, unknown>>;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = prefersReducedMotion();
    if (!finePointer || reduceMotion) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });

    // rect di-cache saat enter, bukan dihitung tiap mousemove
    let rect: DOMRect | null = null;
    let resetTween: gsap.core.Tween | null = null;

    const onEnter = () => {
      rect = el.getBoundingClientRect();
    };

    const onMove = (e: MouseEvent) => {
      if (!rect) return;
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const onLeave = () => {
      resetTween = gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      resetTween?.kill();
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <Tag ref={ref as React.Ref<never>} className={className} style={{ willChange: "transform" }}>
      {children}
    </Tag>
  );
}
