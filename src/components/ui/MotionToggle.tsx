"use client";

import { useSyncExternalStore } from "react";
import { readMotionPref, writeMotionPref, type MotionPref } from "@/lib/motion-pref";

const emptySubscribe = () => () => {};

/**
 * Toggle motion user (persisten localStorage). Menentukan animasi/3D nyala atau mati,
 * mengabaikan prefers-reduced-motion OS. Reload setelah toggle agar semua sistem
 * (Lenis, ScrollTrigger, scene frameloop, class motion-full) init ulang konsisten.
 * Hydration-safe via useSyncExternalStore.
 */
export function MotionToggle() {
  const pref = useSyncExternalStore<MotionPref>(
    emptySubscribe,
    () => readMotionPref(),
    () => null
  );

  const toggle = () => {
    const next: MotionPref = pref === "off" ? "on" : "off";
    writeMotionPref(next);
    window.location.reload();
  };

  // first visit (null) → default ON; hanya "off" yang menonaktifkan
  const on = pref !== "off";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Motion On · klik untuk mati" : "Motion Off · klik untuk nyala"}
      title={on ? "Animasi: ON · klik untuk mati" : "Animasi: OFF · klik untuk nyala"}
      className={
        "rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] transition-colors " +
        (on
          ? "border-accent bg-accent text-bg"
          : "border-line text-text-secondary hover:border-line-strong hover:text-text")
      }
    >
      Motion {on ? "On" : "Off"}
    </button>
  );
}
