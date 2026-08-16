"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/reduced-motion";

/**
 * Count-up angka (PRD §6.6 metrics). GSAP + ScrollTrigger,
 * tulis textContent langsung (bukan setState per-frame).
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    const match = value.match(/^(\$?)(\d[\d,]*)(.*)$/);
    if (reduce || !match) {
      el.textContent = value;
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.v).toLocaleString("en-US")}${suffix}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
