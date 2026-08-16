export interface BrandIcon {
  title: string;
  path: string;
  fillRule?: "evenodd";
}

/**
 * Logo custom mono (24×24, fill-current) untuk brand yang tidak tersedia
 * di simple-icons. Mark sederhana berbasis bentuk/wordmark brand,
 * konsisten dengan tema monokrom.
 */
export const BRAND_ICONS: Record<string, BrandIcon> = {
  groq: {
    title: "Groq",
    path: "M13.5 2 6 14h4.5L9 22l7.5-12h-4.5L13.5 2z",
  },
  chromadb: {
    title: "ChromaDB",
    path: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18M15.5 8.2a4.6 4.6 0 0 0 0 7.6 4.6 4.6 0 0 0 0-7.6z",
    fillRule: "evenodd",
  },
  mql5: {
    title: "MQL5",
    path: "M6 14h2v6H6zm4.8-2h2v8h-2zm4.8-3h2v11h-2zM4 20h16v1.6H4z",
  },
  gdscript: {
    title: "GDScript",
    path: "M5 5h8a4 4 0 0 1 4 4v3h-5v2h6v3a4 4 0 0 1-3.5 2H5z",
  },
  gsap: {
    title: "GSAP",
    path: "M7 5l12 7-12 7z",
  },
  spline: {
    title: "Spline",
    path: "M12 2c2.9 0 5 2 5 4.6 0 2.3-1.5 3.6-3.8 4.4 2.3.8 4 2.1 4 4.4 0 2.5-2.1 4.6-5.2 4.6s-5.2-2.1-5.2-4.6h2.2c0 1.5 1.2 2.7 3 2.7s3-1.2 3-2.7c0-1.5-1.3-2.2-3.6-3-2.6-.9-3.6-1.6-3.6-3.4 0-2.6 1.8-4.6 5.2-4.6z",
  },
};