"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { ToolIcon } from "./ToolIcon";
import type { Tool } from "@/content/profile";

interface MarqueeProps {
  items: Tool[];
  className?: string;
  /** Kecepatan px/detik. Default 60 */
  speed?: number;
  /** Hentikan saat hover */
  pauseOnHover?: boolean;
}

function MarqueeRow({ items }: { items: Tool[] }) {
  return (
    <div className="flex shrink-0 items-center" data-marquee-item>
      {items.map((tool) => (
        <span
          key={tool.name}
          className="flex items-center gap-2.5 px-6 font-mono text-sm uppercase tracking-[0.2em] text-text-secondary"
        >
          <ToolIcon tool={tool} className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">{tool.name}</span>
          <span aria-hidden="true" className="ml-8 text-accent">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Marquee autoplay infinite — SATU-SATUNYA di halaman ini (amendemen #2).
 * - konten diduplikasi untuk loop seamless; duplikat aria-hidden (amendemen #5)
 * - ukuran dihitung ulang setelah font custom load (document.fonts.ready) + resize
 * - animasi transform-only, will-change saat aktif
 */
export function Marquee({
  items,
  className,
  speed = 60,
  pauseOnHover = true,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = prefersReducedMotion();
    if (reduceMotion) return;

    let tween: gsap.core.Tween | null = null;

    const start = () => {
      const item = track.querySelector<HTMLElement>("[data-marquee-item]");
      if (!item) return;
      const itemWidth = item.offsetWidth;
      tween?.kill();
      tween = gsap.to(track, {
        x: -itemWidth,
        duration: itemWidth / speed,
        ease: "none",
        repeat: -1,
      });
    };

    // Tunggu custom font termuat supaya lebar akurat (anti-jitter)
    if (document.fonts?.ready) {
      document.fonts.ready.then(start).catch(() => start());
    } else {
      start();
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(start, 150);
    };
    window.addEventListener("resize", onResize);

    let handlers: [string, () => void][] = [];
    if (pauseOnHover) {
      let paused = false;
      const setPause = (p: boolean) => {
        if (p === paused) return;
        paused = p;
        if (paused) tween?.pause();
        else tween?.resume();
      };
      const enter = () => setPause(true);
      const leave = () => setPause(false);
      track.addEventListener("mouseenter", enter);
      track.addEventListener("mouseleave", leave);
      handlers = [
        ["mouseenter", enter],
        ["mouseleave", leave],
      ];
    }

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      handlers.forEach(([evt, fn]) => track.removeEventListener(evt, fn));
      tween?.kill();
      tween = null;
    };
  }, [speed, pauseOnHover]);

  return (
    <div className={cn("overflow-hidden", className)} aria-label="Tech stack">
      <div ref={trackRef} className="flex w-max will-change-transform">
        <MarqueeRow items={items} />
        <div aria-hidden="true" className="flex shrink-0">
          <MarqueeRow items={items} />
        </div>
      </div>
    </div>
  );
}
