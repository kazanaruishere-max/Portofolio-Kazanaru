/**
 * Monogram personal "AZKA" (POLISH §3.1) — avatar editorial tanpa aset.
 * Dekoratif → aria-hidden; nama lengkap tetap di konten nyata.
 */
export function Monogram() {
  return (
    <div
      aria-hidden="true"
      className="relative grid aspect-square w-40 place-items-center border border-line bg-surface md:w-48"
    >
      <span className="font-display text-6xl font-medium tracking-tight text-text md:text-7xl">
        AZ
      </span>
      <span className="absolute bottom-2.5 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
        KA
      </span>
      <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
        ©26
      </span>
    </div>
  );
}
