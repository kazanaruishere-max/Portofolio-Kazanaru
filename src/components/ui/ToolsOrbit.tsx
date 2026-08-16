"use client";

import type { CSSProperties } from "react";
import { ToolIcon } from "./ToolIcon";
import { tools } from "@/content/profile";

/**
 * Tools orbit melingkar (POLISH §3.1) — 28 logo berputar mengelilingi center.
 * - CSS transform per-item (GPU) dengan negative delay → ring koheren
 * - hover → pause · reduced-motion → ring statis
 * - a11y: visual aria-hidden + sr-only list nama tools
 */
export function ToolsOrbit() {
  const n = tools.length;

  return (
    <>
      <span className="sr-only">Tools: {tools.map((t) => t.name).join(", ")}</span>
      <div
        className="orbit-wrap relative mx-auto aspect-square w-full max-w-[min(82vw,26rem)]"
        aria-hidden="true"
      >
        {tools.map((tool, i) => (
          <div
            key={tool.name}
            title={tool.name}
            className="orbit-item"
            style={{ "--i": i, "--n": n } as CSSProperties}
          >
            <ToolIcon tool={tool} className="h-6 w-6" />
          </div>
        ))}

        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <p className="font-display text-2xl font-medium tracking-tight text-text">STACK</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
              {String(n).padStart(2, "0")} tools
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
