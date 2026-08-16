import { getMotionOn } from "@/lib/motion-pref";

/**
 * Deteksi prefers-reduced-motion, dengan prioritas:
 * 1. URL `?motion=full` → false (paksa animasi)
 * 2. localStorage toggle user (MotionToggle) → on/off persisten
 * 3. OS prefers-reduced-motion
 * (detail lihat getMotionOn di lib/motion-pref.ts)
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return !getMotionOn();
}
