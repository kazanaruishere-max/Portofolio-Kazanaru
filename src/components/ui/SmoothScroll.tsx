"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type Lenis from "lenis";
import { createLenis, destroyLenis, stopLenis, startLenis } from "@/lib/scroll";
import { getDeviceTier } from "@/lib/device-tier";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { applyMotionClass } from "@/lib/motion-pref";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Global smooth scroll (Lenis) + sinkronisasi GSAP ScrollTrigger.
 * - skip saat prefers-reduced-motion (scroll native)
 * - ekspose lenis ke window untuk komponen lain (nav, cursor, section link)
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // class motion-full di <html> (bypass CSS reduced-motion) mengikuti preferensi
    applyMotionClass();

    const reduceMotion = prefersReducedMotion();
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    // cegah bentrok scroll restoration browser dengan Lenis (PRD §8.1)
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // health log (diagnostik dev)
    const profile = getDeviceTier();
    const health = {
      reducedMotion: profile.reducedMotion,
      motionOverride: new URLSearchParams(window.location.search).get("motion") === "full",
      webgl: profile.webglAvailable,
      tier: profile.tier,
      lenis: !reduceMotion && !coarsePointer,
      scrollTrigger: !reduceMotion,
    };
    (window as unknown as { __siteHealth?: unknown }).__siteHealth = health;
    if (process.env.NODE_ENV === "development") {
      console.log("[site-health]", health);
    }

    if (reduceMotion || coarsePointer) return;

    try {
      const lenis = createLenis();
      lenisRef.current = lenis;
      (window as unknown as { __lenis?: Lenis | null }).__lenis = lenis;
    } catch (err) {
      // Lenis gagal init → degradasi graceful ke native scroll (jangan matikan site)
      console.error("[lenis-init-error]", err);
      return;
    }

    return () => {
      (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
      destroyLenis(lenisRef.current);
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { __lenis?: Lenis | null }).__lenis ?? null;
}

export function pauseSmoothScroll() {
  stopLenis(getLenis());
}

export function resumeSmoothScroll() {
  startLenis(getLenis());
}
