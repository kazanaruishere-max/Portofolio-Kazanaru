"use client";

import { useEffect } from "react";

/**
 * App Router error boundary (route segment) — mencegah root unmount
 * saat error render/mount di client. Fallback on-brand + tombol retry.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app-error]", error.message, error.digest);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Error</p>
      <h1 className="font-display text-3xl font-medium text-text">Terjadi kesalahan render</h1>
      <p className="max-w-md font-mono text-sm text-text-muted">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-line px-6 py-2 font-mono text-xs uppercase tracking-[0.2em] text-text transition-colors hover:border-text"
      >
        Coba lagi
      </button>
    </div>
  );
}
