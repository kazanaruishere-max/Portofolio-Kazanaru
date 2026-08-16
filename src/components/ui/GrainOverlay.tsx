/**
 * Film grain overlay (amendemen #8).
 * - fixed, pointer-events none, mix-blend overlay, opacity 0.03–0.06
 * - aria-hidden (amendemen #5) — dekoratif murni
 */
export function GrainOverlay() {
  return <div aria-hidden="true" className="grain-overlay" />;
}
