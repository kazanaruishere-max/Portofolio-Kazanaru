export type DeviceTier = "high" | "medium" | "low";

import { prefersReducedMotion } from "@/lib/reduced-motion";

export interface DeviceProfile {
  tier: DeviceTier;
  /** DPR clamp untuk WebGL renderer */
  dprClamp: number;
  /** Skala jumlah partikel / detail 3D (1 = penuh) */
  particleScale: number;
  reducedMotion: boolean;
  webglAvailable: boolean;
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Deteksi device bertingkat (PRD §9b) — praktik nyata, bukan teori:
 * 1. pointer coarse (touch/mobile)  → medium/low, partikel dikurangi
 * 2. hardwareConcurrency <= 4       → turunkan resolusi
 * 3. deviceMemory <= 4              → mode low
 * 4. prefers-reduced-motion         → reducedMotion (3D tetap tampil, tanpa animasi)
 * 5. WebGL tidak tersedia           → webglAvailable false (scene → fallback statis)
 *
 * `?motion=full` override reduced-motion (lihat lib/reduced-motion.ts).
 * Aman dipanggil di server (window undefined) → default high (tidak crash).
 */
export function getDeviceTier(): DeviceProfile {
  if (typeof window === "undefined") {
    return {
      tier: "high",
      dprClamp: 1,
      particleScale: 1,
      reducedMotion: true,
      webglAvailable: true,
    };
  }

  const reducedMotion = prefersReducedMotion();
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const nav = navigator as Navigator & { hardwareConcurrency?: number; deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const webglAvailable = detectWebGL();

  let score = 0;
  if (coarsePointer) score += 1;
  if (cores <= 4) score += 1;
  if (memory <= 4) score += 1;

  let tier: DeviceTier = "high";
  if (score >= 3 || memory <= 2) tier = "low";
  else if (score >= 1) tier = "medium";

  const dprClamp = coarsePointer ? 1.5 : tier === "low" ? 1 : 2;
  const particleScale = tier === "low" ? 0.3 : tier === "medium" ? 0.5 : 1;

  return { tier, dprClamp, particleScale, reducedMotion, webglAvailable };
}
