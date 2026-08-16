const KEY = "azka-motion";

export type MotionPref = "on" | "off" | null;

export function readMotionPref(): MotionPref {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(KEY);
  return v === "on" || v === "off" ? v : null;
}

export function writeMotionPref(pref: MotionPref) {
  if (typeof window === "undefined") return;
  if (pref) localStorage.setItem(KEY, pref);
  else localStorage.removeItem(KEY);
}

/**
 * Prioritas motion ON:
 * 1. URL `?motion=full` → ON (force preview)
 * 2. URL `?motion=reduce` → OFF (force)
 * 3. localStorage `azka-motion` = "off" → OFF (toggle user, persisten)
 * 4. selain itu (termasuk first visit / null) → ON (DEFAULT — portofolio
 *    harus mengesankan sejak kunjungan pertama; visitor bisa toggle OFF)
 */
export function getMotionOn(): boolean {
  if (typeof window === "undefined") return true;
  const q = new URLSearchParams(window.location.search).get("motion");
  if (q === "full") return true;
  if (q === "reduce") return false;
  const pref = readMotionPref();
  if (pref === "on") return true;
  if (pref === "off") return false;
  return true;
}

/** Tambah class `motion-full` di <html> → bypass CSS reduced-motion (orbit, pulse, dll). */
export function applyMotionClass() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("motion-full", getMotionOn());
}
