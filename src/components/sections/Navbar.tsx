"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { LangToggle, MotionToggle } from "@/components/ui";
import { pauseSmoothScroll, resumeSmoothScroll } from "@/components/ui/SmoothScroll";
import { profile } from "@/content/profile";

const NAV = [
  { label: "Work", href: "#work", index: "01" },
  { label: "Craft", href: "#craft", index: "02" },
  { label: "Contact", href: "#contact", index: "03" },
];

/**
 * Navbar fixed (PRD §4.4 UI overlay). Smooth scroll via Lenis.
 * Scroll state via motion useScroll. Active section via IntersectionObserver.
 * Mobile: overlay menu (hamburger) + Lang/Motion toggle.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    const secs = NAV.map((n) => document.getElementById(n.href.slice(1))).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    secs.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      pauseSmoothScroll();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        resumeSmoothScroll();
        window.removeEventListener("keydown", onKey);
      };
    }
    resumeSmoothScroll();
  }, [menuOpen]);

  const goTo = (href: string) => {
    setMenuOpen(false);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(href, { offset: 0 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[var(--z-ui)] flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-10",
        scrolled ? "border-b border-line bg-bg/80" : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-mono text-xs uppercase tracking-[0.3em] text-text"
      >
        {profile.name}
      </button>

      <nav aria-label="Utama" className="hidden items-center gap-8 md:flex">
        {NAV.map((item) => (
          <button
            key={item.href}
            type="button"
            onClick={() => goTo(item.href)}
            aria-current={active === item.href ? "location" : undefined}
            className={[
              "group inline-flex items-baseline gap-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors",
              active === item.href ? "text-text" : "text-text-secondary hover:text-text",
            ].join(" ")}
          >
            <span className="text-[10px] text-text-muted transition-colors group-hover:text-text">
              {item.index}
            </span>
            {item.label}
          </button>
        ))}
        <LangToggle />
        <MotionToggle />
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[var(--z-menu)] flex flex-col items-center justify-center gap-10 bg-bg md:hidden">
          <nav aria-label="Menu utama" className="flex flex-col items-center gap-6">
            {NAV.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => goTo(item.href)}
                className="group inline-flex items-baseline gap-3 font-display text-4xl font-medium tracking-tight text-text"
              >
                <span className="font-mono text-sm text-text-muted">{item.index}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="relative z-[calc(var(--z-menu)+1)] flex items-center gap-3 md:hidden">
        <LangToggle />
        <MotionToggle />
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-line"
        >
          <span
            className={`h-px w-4 bg-text transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-4 bg-text transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
    </header>
  );
}