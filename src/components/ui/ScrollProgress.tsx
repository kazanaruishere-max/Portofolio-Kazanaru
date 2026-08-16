"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Scroll progress tipis (POLISH §3.1) — wayfinding global, transform-only.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[var(--z-menu)] h-px origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
