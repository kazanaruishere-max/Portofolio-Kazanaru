# PRD Amendments

**Dokumen**: PRD-amendments.md v1.0  
**Status**: Diterima untuk implementasi  
**Tanggal**: 02 Agustus 2026  
**Basis**: PRD v2.3 → menjadi PRD v3.0  
**Asal**: Review dua subagent (lensa Design + lensa Epic/Engineering)

---

## 1. Ringkasan

Amendemen ini berisi **13 koreksi** hasil review dua subagent terhadap PRD v2.3, ditambah **depth-layer system map** dan **a11y/perf guardrail**. Semua koreksi WAJIB diterapkan pada implementasi, dan PRD utama disinkronkan menjadi v3.0.

---

## 2. Daftar 13 Koreksi

### A. Design Language

#### #1 — Body font: Inter → **Satoshi**
- **Keputusan**: Satoshi (Fontshare) — satu foundry dengan Clash Display.
- **Alasan**: Inter adalah sinyal "ekosistem AI generik", kontradiksi dengan Goal G1 (Awwwards-grade, bukan AI slop). Satu foundry = sistem tipografi kohesif.
- **Fallback**: `Geist`, lalu `Outfit`.
- **Lokasi**: PRD §4.2.

#### #2 — Max 1 autoplay marquee per page
- **Keputusan**: Skill strip (6.3) tetap marquee autoplay — **satu-satunya**. Tools logo (6.8.1) berubah dari marquee → **static grid** (hover invert tetap berjalan).
- **Alasan**: Dua marquee autoplay dalam satu halaman melanggar aturan desain "max 1 per page" — bikin layout berisik dan kehilangan fokus.

#### #3 — Hero maksimal 4 elemen teks
- **Keputusan**: Hero = 4 elemen teks maksimal:
  1. Nama raksasa `AZKA SYAHIRULL`
  2. Sub-label mono `AI Developer · Indonesia · Open to work` (badge `Open to work` di-merge ke sini)
  3. CTA `View Work ↓`
  4. CTA `Contact`
- **Alasan**: >4 elemen teks di hero = overload; merger badge menghapus elemen ke-5.

#### #4 — Pangkas eyebrow / label mono berlebih
- **Keputusan**: Pertahankan hanya sistem angka `01–09` sebagai eyebrow konsisten di tiap chapter. Label mono dekoratif dipangkas.
- **Detail**:
  - Verifier code `JVC2605-JSVX-JYGR` → **tooltip** (bukan label permanen)
  - Label duplikat / dekoratif (mis. tanggal berulang, tag berlebihan) dihapus
  - Sistem angka `01–09` menjadi satu-satunya mekanisme penanda posisi

#### #10 — Logo tools: kontradiksi "hover warna" vs pure monokrom
- **Keputusan**: Logo tools di Craft → monokrom abu-abu, **hover = invert monokrom** (isi balik), bukan warna brand.
- **Alasan**: Konsisten dengan guardrail pure-monokrom (§7). Warna brand per-logo = keluar dari bahasa visual.
- **Catatan**: Untuk accessibility, kontras saat hover harus tetap ≥ 4.5:1.

#### #13 — Dedupe klaim berulang
- **"Top 100"** (muncul 3×) → **2×**: Story badge (6.4) + Craft sertifikat (6.8).
  - Timeline (6.7): item "Top 100 #JuaraVibeCoding" **dihapus** (sudah 2× di tempat lain).
- **"$0/mo"** (muncul 2×) → **1×**: hanya di chapter Xondra (6.6.02) sebagai metrik.
  - Story stats (6.4): ganti `$0 biaya operasi proyek (Xondra)` → `lintas domain: fintech + quantitative trading`.

---

### B. A11y & Performance Guardrail (WAJIB)

#### #5 — `aria-hidden` untuk semua elemen dekoratif
- Semua elemen dekoratif wajib `aria-hidden="true"` (+ `role="presentation"` jika diperlukan):
  - Canvas 3D (semua scene)
  - Grain/noise overlay
  - Custom cursor
  - Duplikat marquee (untuk loop seamless)
- **Kritikal**: WCAG — tanpa ini, target Accessibility ≥ 95 mustahil dicapai.

#### #6 — Fallback `prefers-reduced-motion` per scene 3D
Fallback spesifik per scene:
| Scene | Fallback reduced-motion |
|---|---|
| Neural Particle Sphere | Gradien statis (CSS) |
| Morphing Wireframe | Wireframe statis (tanpa morph) |
| 3D Typography | Teks biasa (tanpa 3D) |

#### #7 — Larangan animasi layout properties + strategi `will-change`
- **Dilarang** meng-animasi: `width`, `height`, `top`, `left`, `margin`, `padding`.
- **Wajib** hanya `transform` + `opacity` untuk animasi.
- `will-change` hanya di-set **saat animasi aktif**, dihapus saat selesai (GSAP menangani otomatis via `force3D`).
- Tujuan: mencegah layout thrashing → perf ≥ 90.

#### #8 — Teknik grain/noise (definisi final)
```
Elemen: <div class="grain"> 
Teknik: CSS ::after + SVG feTurbulence (data-URI)
Blend:  mix-blend-mode: overlay
Pointer: pointer-events: none
Opacity: 0.03 – 0.06
Posisi: fixed, z-index layer 1 (lihat depth-layer map)
A11y:   aria-hidden="true"
```

#### #9 — Pointer physics wajib ref + GSAP `quickTo`
- Mouse/parallax/magnetic **dilarang** pakai `useState` (re-render = jank).
- Wajib: `useRef` + GSAP `quickTo` (lerp tanpa re-render React).
- Berlaku untuk: custom cursor, parallax mouse, magnetic button, partikel "ikut mouse".

#### #11 — Depth-layer system map
```
Layer 0 · Background base          — bg, grid halus
Layer 1 · Grain + 3D backdrop     — morph wireframe (decorative, aria-hidden)
Layer 2 · 3D foreground           — particle sphere, Type3D (decorative, aria-hidden)
Layer 3 · Konten tipografi        — headline, body, cards
Layer 4 · UI overlay              — navbar, scroll progress, badges
Layer 5 · Cursor custom           — top-most (aria-hidden)
```
- **Dalam (3–4 layer)**: Hero, Work, Craft
- **Tipis (0–1 layer)**: Marquee, Manifesto, Timeline — sengaja tipis, intentional

---

### C. SEO (WAJIB, target ≥ 90)

#### #12 — Deliverables SEO spesifik
- `metadata` lengkap di `layout.tsx` (title, description, canonical, keywords)
- OpenGraph (og:title, og:description, og:image, og:type=website)
- Twitter Card
- JSON-LD **`Person`** (name, email, url, sameAs github, jobTitle "AI Developer")
- `app/sitemap.ts` (halaman / + /work/[slug])
- `app/robots.ts`
- OG image statis (`opengraph-image.tsx` atau gambar statis on-brand)
- Semantic HTML: `header`, `main`, `section`, `footer`, `h1`–`h3` hierarki benar

---

## 3. Risiko Teknis (dari review, disetujui)

| Risiko | Keputusan |
|---|---|
| Timeline horizontal pin (~300vh) — pattern paling berisiko | **Prototype di Phase 3**; fallback siap: vertical card-stack |
| LCP < 2.5s | Hero text-first, **preload Clash Display woff2**, 3D hanya enhancement via dynamic chunk |
| Custom cursor = "AI-tell" | Dibenarkan konteks Awwwards; eksekusi **minimal**: dot 8px + ring 32px, **tanpa trail** |

---

## 4. Sinkronisasi PRD → v3.0 (checklist)

- [x] §4.2 font: Inter → Satoshi
- [x] §6.2 hero: 4 elemen, merge `Open to work`
- [x] §6.3 catatan satu-satunya marquee autoplay
- [x] §6.4 story: klaim dedupe, stats baru
- [x] §6.7 timeline: hapus item Top-100
- [x] §6.8.1 tools: static grid + hover invert
- [x] §3 guardrail: tambah #5/#7/#9
- [x] §8 reduced-motion per scene
- [x] §13 SEO deliverables
- [x] §14 (baru) depth-layer system
