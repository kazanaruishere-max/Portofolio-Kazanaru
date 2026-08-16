"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { pauseSmoothScroll, resumeSmoothScroll } from "@/components/ui/SmoothScroll";

const SKIP_KEY = "azka-preloader-seen";

function shouldSkip() {
  if (typeof window === "undefined") return true;
  if (prefersReducedMotion()) return true;
  return Boolean(sessionStorage.getItem(SKIP_KEY));
}

/**
 * Preloader (PRD §6.1): counter 0–100% mono + reveal nama + curtain lift.
 * - RENDER DI SSR → tidak ada FOUC (tanpa mounted-gate; markup identik server/client)
 * - skip repeat visitor & reduced-motion → curtain langsung terangkat (gsap.set, tanpa state)
 * - scroll dikunci selama preloader aktif (Lenis stop + overflow hidden)
 * - a11y: role="status" (bukan aria-hidden — preloader punya konten nyata)
 */
export function Preloader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const name = nameRef.current;
    if (!root || !name) return;

    // Kunci scroll selama preloader aktif
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    pauseSmoothScroll();

    const skip = shouldSkip();
    if (skip) {
      // tanpa animasi → langsung angkat curtain
      gsap.set(root, { yPercent: -100, visibility: "hidden" });
      document.body.style.overflow = prevOverflow;
      resumeSmoothScroll();
      onDone?.();
      return;
    }

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SKIP_KEY, "1");
        document.body.style.overflow = prevOverflow;
        resumeSmoothScroll();
        onDone?.();
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.value)),
    })
      .fromTo(
        name,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.8, ease: "expo.out" },
        "-=0.6"
      )
      .to(root, {
        yPercent: -100,
        duration: 0.9,
        ease: "expo.inOut",
        delay: 0.2,
      });

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
      resumeSmoothScroll();
    };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      role="status"
      className="fixed inset-0 z-[var(--z-preloader)] flex flex-col items-center justify-center bg-bg"
    >
      <span className="font-mono text-sm uppercase tracking-[0.3em] text-text-muted">
        {count}%
      </span>
      <div className="mt-6 overflow-hidden">
        <div ref={nameRef} className="translate-y-[110%]">
          <span className="font-display text-2xl font-medium tracking-tight text-text md:text-4xl">
            AZKA SYAHIRULL
          </span>
        </div>
      </div>
    </div>
  );
}
