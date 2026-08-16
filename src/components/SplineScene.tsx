"use client";

import { useState } from "react";
import Spline from "@splinetool/react-spline";
import { prefersReducedMotion } from "@/lib/reduced-motion";

interface SplineSceneProps {
  scene: string;
  className?: string;
  /** zoom Spline (default 1). Nilai < 1 = zoom out → lebih banyak terlihat (full body). */
  zoom?: number;
}

/** Private API runtime Spline — best-effort untuk menyembunyikan badge "Made with Spline". */
function hideSplineBadge(app: unknown) {
  try {
    const pipeline = (
      app as { _renderer?: { pipeline?: { setWatermark?: (texture: unknown) => void } } }
    )._renderer?.pipeline;
    pipeline?.setWatermark?.(null);
  } catch {
    /* gagal → fallback cover di Hero */
  }
}

/**
 * Spline scene (PERSONALIZE) — lazy-loaded via next/dynamic di caller.
 * - Scene background transparan (diatur di editor Spline) → canvas menyatu dengan section.
 * - onLoad: sembunyikan badge logo Spline, lalu jika reduced-motion → stop; selain itu setZoom
 * - onError: fallback kosong (tidak merusak layout)
 * - dekoratif → aria-hidden
 */
export function SplineScene({ scene, className, zoom = 0.85 }: SplineSceneProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div aria-hidden="true" className={className}>
      <Spline
        scene={scene}
        renderOnDemand
        onLoad={(app) => {
          hideSplineBadge(app);
          if (prefersReducedMotion()) {
            app.stop();
          } else {
            try {
              app.setZoom(zoom);
            } catch {
              /* zoom gagal → biarkan default */
            }
          }
        }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
