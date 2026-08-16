"use client";

/**
 * Global error boundary (root layout) — menangkap error di level paling atas
 * sekalipun (layout/providers). WAJIB menyertakan <html> & <body>.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0, background: "#0a0a0a", color: "#ededed", fontFamily: "monospace" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: 24,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#858585" }}>
            Fatal Error
          </p>
          <h1 style={{ fontSize: 28, margin: 0 }}>Website gagal dimuat</h1>
          <p style={{ maxWidth: 420, color: "#a3a3a3", fontSize: 13 }}>{error.message}</p>
          <button
            type="button"
            onClick={reset}
            style={{
              border: "1px solid #858585",
              background: "transparent",
              color: "#ededed",
              padding: "10px 24px",
              borderRadius: 999,
              cursor: "pointer",
            }}
          >
            Muat ulang
          </button>
        </div>
      </body>
    </html>
  );
}
