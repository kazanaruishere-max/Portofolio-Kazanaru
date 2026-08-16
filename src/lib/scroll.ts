"use client";

import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/animations";

export type { Lenis };

const rafMap = new WeakMap<Lenis, number>();

/**
 * Membuat instance Lenis sesuai feel scroll (PRD §8.1):
 * enteng (duration 1.15), tidak perlambat input user (wheelMultiplier 1),
 * mobile pakai native scroll (smoothTouch false).
 */
export function createLenis(): Lenis {
  const lenis = new Lenis({
    duration: 1.15,
    // natural eksponensial ≈ cubic-bezier(0.1, 0.2, 0.2, 1)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    syncTouch: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time: number) => {
    lenis.raf(time);
    rafMap.set(lenis, requestAnimationFrame(raf));
  };
  rafMap.set(lenis, requestAnimationFrame(raf));

  return lenis;
}

export function destroyLenis(lenis: Lenis | null) {
  if (!lenis) return;
  const rafId = rafMap.get(lenis);
  if (rafId !== undefined) cancelAnimationFrame(rafId);
  rafMap.delete(lenis);
  lenis.destroy();
}

export function stopLenis(lenis: Lenis | null) {
  lenis?.stop();
}

export function startLenis(lenis: Lenis | null) {
  lenis?.start();
}

export function scrollToLenis(lenis: Lenis | null, target: string | number) {
  lenis?.scrollTo(target, { offset: 0, duration: 1.2 });
}
