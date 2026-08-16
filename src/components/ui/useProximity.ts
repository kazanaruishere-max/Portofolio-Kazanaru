"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/reduced-motion";

export type ProximityType = "magnetic" | "tilt" | "shift" | "scale" | "aura";

export interface ProximityConfig {
  type?: ProximityType;
  /** kekuatan respons 0..1 */
  strength?: number;
  /** jarak aktivasi (px) */
  range?: number;
  /** translate maks (px) */
  maxShift?: number;
  /** rotateX/Y maks (deg) */
  maxTilt?: number;
}

interface Target {
  el: HTMLElement;
  config: ProximityConfig;
  setX: (v: number) => void;
  setY: (v: number) => void;
  setScaleX: (v: number) => void;
  setScaleY: (v: number) => void;
  setRotX: (v: number) => void;
  setRotY: (v: number) => void;
  active: boolean;
}

const DEFAULTS: Required<Omit<ProximityConfig, "type">> = {
  strength: 0.4,
  range: 140,
  maxShift: 8,
  maxTilt: 6,
};

const targets = new Map<HTMLElement, Target>();
const pointer = { x: -9999, y: -9999 };
let rafId = 0;
let running = false;
let inited = false;

let lastMove = 0;

function onMove(e: MouseEvent) {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  lastMove = Date.now();
  if (!running && targets.size > 0) {
    running = true;
    rafId = requestAnimationFrame(loop);
  }
}

function onLeave() {
  pointer.x = -9999;
  pointer.y = -9999;
}

function onVisibility() {
  if (document.hidden) {
    running = false;
    cancelAnimationFrame(rafId);
  } else if (targets.size > 0 && !running) {
    running = true;
    rafId = requestAnimationFrame(loop);
  }
}

function resetTarget(t: Target) {
  const el = t.el;
  if (t.config.type === "aura") {
    el.style.setProperty("--aura-opacity", "0");
    return;
  }
  gsap.to(el, {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotationX: 0,
    rotationY: 0,
    duration: 0.6,
    ease: "power3.out",
  });
}

function applyTarget(t: Target, rect: DOMRect, dx: number, dy: number, f: number) {
  const { type = "magnetic", strength = DEFAULTS.strength, maxShift = DEFAULTS.maxShift, maxTilt = DEFAULTS.maxTilt } = t.config;
  const s = strength * f;

  switch (type) {
    case "magnetic":
      t.setX(dx * s * 0.5);
      t.setY(dy * s * 0.5);
      break;
    case "tilt":
      t.setRotY(dx * maxTilt * s * 0.02);
      t.setRotX(-dy * maxTilt * s * 0.02);
      break;
    case "shift":
      t.setX(-dx * maxShift * s * 0.03);
      t.setY(-dy * maxShift * s * 0.03);
      break;
    case "scale":
      t.setScaleX(1 + 0.04 * s);
      t.setScaleY(1 + 0.04 * s);
      break;
    case "aura":
      t.el.style.setProperty("--aura-x", `${pointer.x - rect.left}px`);
      t.el.style.setProperty("--aura-y", `${pointer.y - rect.top}px`);
      t.el.style.setProperty("--aura-opacity", String(f));
      break;
  }
}

function loop() {
  if (targets.size === 0) {
    running = false;
    return;
  }

  // idle pause: stop jika pointer lama tak bergerak & semua target netral
  const idle = Date.now() - lastMove > 3000;
  if (idle && !Array.from(targets.values()).some((t) => t.active)) {
    running = false;
    return;
  }

  // FASE 1 — baca semua rect (batch, hindari layout thrash)
  const rects = new Map<HTMLElement, DOMRect>();
  targets.forEach((t) => {
    const rect = t.el.getBoundingClientRect();
    if (rect.width > 0 || rect.height > 0) rects.set(t.el, rect);
  });

  // FASE 2 — tulis semua transform (setelah semua baca selesai)
  targets.forEach((t) => {
    const rect = rects.get(t.el);
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = pointer.x - cx;
    const dy = pointer.y - cy;
    const dist = Math.hypot(dx, dy);
    const range = t.config.range ?? DEFAULTS.range;

    if (dist > range) {
      if (t.active) {
        t.active = false;
        resetTarget(t);
      }
      return;
    }
    if (!t.active) t.active = true;
    applyTarget(t, rect, dx, dy, 1 - dist / range);
  });

  rafId = requestAnimationFrame(loop);
}

function ensureGlobal() {
  if (inited) return;
  inited = true;
  window.addEventListener("mousemove", onMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);
  document.addEventListener("visibilitychange", onVisibility);
}

function register(el: HTMLElement, config: ProximityConfig) {
  ensureGlobal();
  const setter = (prop: string) =>
    gsap.quickSetter(el, prop) as (v: number) => void;
  const target: Target = {
    el,
    config,
    setX: setter("x"),
    setY: setter("y"),
    setScaleX: setter("scaleX"),
    setScaleY: setter("scaleY"),
    setRotX: setter("rotationX"),
    setRotY: setter("rotationY"),
    active: false,
  };
  targets.set(el, target);
  if (!running) {
    running = true;
    rafId = requestAnimationFrame(loop);
  }
}

function unregister(el: HTMLElement) {
  targets.delete(el);
  if (targets.size === 0 && running) {
    running = false;
    cancelAnimationFrame(rafId);
  }
}

/**
 * Sistem proximity global (POLISH §2) — semua object bereaksi saat mouse mendekat.
 * - 1 mousemove passive + 1 rAF + registry
 * - transform-only via gsap.quickSetter (0 re-render React)
 * - hanya pointer:fine · mati saat prefers-reduced-motion
 */
export function useProximity<T extends HTMLElement>(config: ProximityConfig = {}) {
  const ref = useRef<T | null>(null);
  const configRef = useRef(config);

  const { type, strength, range, maxShift, maxTilt } = config;
  useEffect(() => {
    configRef.current = { type, strength, range, maxShift, maxTilt };
    const el = ref.current;
    if (el && targets.has(el)) {
      targets.get(el)!.config = configRef.current;
    }
  }, [type, strength, range, maxShift, maxTilt]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = prefersReducedMotion();
    if (!fine || reduce) return;
    register(el, configRef.current);
    return () => unregister(el);
  }, []);

  return ref;
}
