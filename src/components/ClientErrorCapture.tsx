"use client";

import { useEffect, useState } from "react";

/**
 * Capture error global (window error + unhandledrejection) → surface ke console.
 * Dengan `?diagnose=1` → overlay on-screen menampilkan error asli (dev aid),
 * sehingga kita tidak perlu menebak penyebab "semua animasi mati".
 */
export function ClientErrorCapture() {
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    const diagnose = new URLSearchParams(window.location.search).get("diagnose") === "1";

    const onError = (e: ErrorEvent) => {
      console.error("[window-error]", e.message, e.filename, e.lineno);
      if (diagnose && e.message) setLastError(e.message);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const msg = e.reason instanceof Error ? e.reason.message : String(e.reason);
      console.error("[unhandledrejection]", msg);
      if (diagnose) setLastError(msg);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  if (!lastError) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-4 left-4 z-[9999] max-w-sm border border-red-600 bg-bg p-4 font-mono text-xs text-text"
    >
      <p className="mb-1 uppercase tracking-[0.2em] text-red-600">Runtime Error</p>
      <p className="break-words text-text-secondary">{lastError}</p>
      <button
        type="button"
        onClick={() => setLastError(null)}
        className="mt-2 underline"
      >
        Tutup
      </button>
    </div>
  );
}
