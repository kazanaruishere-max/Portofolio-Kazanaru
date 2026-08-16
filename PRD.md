# PRD — Portofolio "Azka Syahirull"

**Dokumen**: PRD v3.0 (Final)  
**Status**: Diterima untuk implementasi  
**Tanggal**: 02 Agustus 2026  
**Produk**: Website portofolio personal, standar Awwwards  
**Role**: Azka Syahirull — AI Developer  
**Repo Konten**: github.com/kazanaruishere-max  
**Amendemen**: Lihat `PRD-amendments.md` (13 koreksi review subagent + depth-layer + guardrail) — wajib dibaca bersama dokumen ini.  
**SOP Kerja**: Lihat `AGENTS.md` (workflow skills & agents, fase, gate — terpisah dari dokumen ini)

---

## 1. Ringkasan Eksekutif

Website portofolio bergaya **Awwwards-grade**: typography-led, animasi interaktif bermakna, 3D Three.js yang berperan dalam storytelling, dual mode (dark/light), dan dual bahasa (ID/EN). Menampilkan Azka Syahirull sebagai **AI Developer yang membangun solusi AI berdampak nyata** — dari literasi finansial (SafeWallet) hingga quantitative trading (Xondra & SEITH) — dengan bukti engineering yang rigour.

**Positioning statement:**

> AI Developer asal Indonesia yang membangun AI untuk dampak nyata — keamanan finansial, anti-fraud, dan quantitative trading — dengan kualitas production-grade.

---

## 2. Goals & Success Metrics

### Goals
| # | Goal | Ukuran Sukses |
|---|---|---|
| G1 | Kesan "Awwwards-level" (bukan AI slop) | Reviewer teknis mengidentifikasi motion & design yang purposeful |
| G2 | Menampilkan 3 proyek dengan cerita & bukti kredibel | Case study informatif + link GitHub + disclaimer metrik |
| G3 | Recruiter/klien bisa kontak dalam <5 detik | Email & GitHub prominent di Contact |
| G4 | Performa cepat meski WebGL | LCP < 2.5s, Lighthouse Performance ≥ 90 |

### Verification Gate
- `npm run build` sukses
- `npm run lint` & `npm run typecheck` bersih
- Lighthouse: Performance ≥ 90 (floor 80), Accessibility ≥ 95, Best Practices 100, SEO ≥ 90
- LCP < 2.5s · FPS WebGL rata-rata ≥ 55 saat scroll

---

## 3. Definisi "Anti-AI-Slop" (Guardrails Wajib)

| ✅ WAJIB | ❌ DILARANG |
|---|---|
| Motion punya makna & menjawab "mengapa" | Fade-in serentak semua elemen |
| Typography-led: display type raksasa, hierarki editorial | Card-grid generik + rounded-card glassmorphism |
| Custom cursor, preloader counter, magnetic button, page transition | Spinner default, scroll polos |
| Grain/noise texture halus | Gradient default / stock photo hero |
| Satu bahasa motion (easing konsisten, durasi 0.6–1.2s) | 5 easing berbeda dalam 1 halaman |
| 3D "tenang" & menyatu dengan narasi | 3D hiasan tanpa fungsi |
| Konten asli + disclaimer metrik | Klaim tidak kredibel |
| Semua elemen dekoratif `aria-hidden` (3D, grain, cursor) | Elemen dekoratif accessible (WCAG violation) |
| Animasi hanya `transform` + `opacity`; `will-change` saat aktif | Animasi `width/height/top/left` (layout thrashing) |
| Pointer physics pakai `useRef` + GSAP `quickTo` | `useState` untuk mouse/parallax/magnetic (jank) |

---

## 4. Tech Stack (Locked)

### 4.1 Dependencies
| Layer | Stack | Catatan |
|---|---|---|
| Framework | Next.js 15 (App Router) + React + TypeScript | SSR/SEO + routing case study |
| Styling | Tailwind CSS v4 + CSS Variables | Design tokens untuk dual mode |
| Motion — Narasi | GSAP (core + ScrollTrigger + ScrollTo) + Lenis | Scroll-driven story, scrub, reveal section |
| Motion — Mikro | `motion` (motion.dev, penerus Framer Motion) | Page transition `AnimatePresence` + spring micro-interaction. **Bukan** untuk scroll-story |
| 3D | Three.js + React Three Fiber v9 + drei + `maath` | 3 scene procedural, zero asset eksternal. `maath` = helper math kecil (damp/easing/random) untuk gerakan 3D mulus |
| GSAP React | `@gsap/react` (`useGSAP`) | Hook resmi GSAP untuk React — cleanup otomatis `.gsap.context()` di StrictMode/React 19 |
| SplitText | GSAP `SplitText` (gratis, dalam package `gsap`) | Pecah teks per-kata/baris untuk reveal typography editorial (nama raksasa di hero). Bukan dependency terpisah |
| Ikon | lucide-react | Tree-shakable, ringan |
| Logo brand | `react-simple-icons` + self-host SVG (hybrid) | 28 logo tools di section Craft; brand niche (Groq, Gemini CLI, MQL5) via SVG manual |
| Util | clsx + tailwind-merge | Util `cn()` |
| Theming | next-themes | Dual mode dark/light (localStorage + prefers-color-scheme) |
| Deploy | Vercel (opsional) | |

### 4.2 Font (custom, self-host)
| Role | Font | Sumber | Kesan |
|---|---|---|---|
| Display | **Clash Display** | Fontshare, self-host via `next/font/local` (woff2) | Geometric grotesque premium khas Awwwards; untuk nama raksasa + judul |
| Body | **Satoshi** | Fontshare, self-host | Satu foundry dengan Clash Display → sistem tipografi kohesif, bukan "AI generik". Fallback: Geist → Outfit |
| Mono | **JetBrains Mono** | Google Fonts | Label, tag, angka statistik — vibes "code/AI" |

- Ukuran: display 8–12vw (hero) · body 16–18px · mono 12–14px uppercase tracking-wide
- Alternatif display: Syne (lebih artistik) / Unbounded (lebih techy) — gampang diganti di Phase 0

### 4.3 Evaluasi & Cut List (keputusan tertutup)
| Library | Keputusan | Alasan |
|---|---|---|
| anime.js | ❌ Skip | Redundan dengan GSAP; paradigma ke-3 melanggar guardrail "satu bahasa motion" |
| CanvasUI | ❌ Skip | Text di Canvas = tidak accessible (screen reader buta, A11y & SEO anjlok) |
| Spline | ❌ Skip | Redundan dengan R3F (2 runtime WebGL = beban bundle + Lighthouse) |
| @react-three/postprocessing | ❌ Skip | Glow dibuat **via shader** di material (visual mirip, tanpa GPU pass tambahan) |
| Framer Motion | ⚠️ Redundan | = `motion` (motion.dev). Pakai satu: `motion` |
| Draco/.glb | ⚠️ N/A | Semua 3D procedural (tidak ada file .glb). Prinsip tercatat untuk aset masa depan |
| GSAP SplitText | ✅ Gratis sejak 2024 | Termasuk dalam package `gsap` npm (bukan plugin premium). Dipakai untuk reveal typography |

---

## 5. Information Architecture

```
/                     → Home (single-page scroll)
/work/[slug]          → Case study: safewallet, xondra, seith
/404                  → Custom 404 (on-brand)
```

**Home flow (narrative journey):**

```
Preloader → Hero → Marquee → Story (+badge Top 100)
→ Manifesto "How I Work" → Work (3 proyek) → Timeline
→ Craft → Contact → Footer
```

### 5.1 Scroll Map (pacing: megah → cepat → dalam → tajam → berat → wisata → landing → tenang)

```
┌────────────────────────────────────────────────────────────────────┐
│ 00 PRELOADER    ~2s fixed      counter + curtain                   │
│ 01 HERO         140vh · SLOW    nama raksasa + particle sphere     │
│ 02 MARQUEE      60vh  · CEPAT   skill strip infinite (nafas)       │
│ 03 STORY        160vh · DALAM   editorial + morph wireframe scrub  │
│ 04 MANIFESTO    100vh · TAJAM   3 baris reveal, spacing besar      │
│ 05 WORK         ~450vh · PIN    per proyek (150vh x3)              │
│ 06 TIMELINE     ~300vh · WISATA  horizontal pin scroll (kejutan)   │
│ 07 CRAFT        120vh · LANDING  stack grid + sertifikat + verifier│
│ 08 CONTACT      120vh · TENANG   CTA raksasa + 3D type "AZKA"      │
│ 09 FOOTER       40vh  · KOMPAK  copyright + back-to-top            │
└────────────────────────────────────────────────────────────────────┘
```

**Prinsip pacing anti-bosan:**
- Variasi tempo per section (lambat → cepat → dalam → tajam → berat → wisata → landing → tenang)
- Setiap chapter punya anchor heading besar (angka `01`–`09`) yang melewati layar
- Pinned section (Work, Timeline) selalu diberi margin setelah pin selesai (tidak "menempel")
- Reduced-motion: semua jadi fade ringan + scroll native

---

## 6. Spesifikasi Per Section

### 6.1 Preloader
- Counter 0–100% (mono, besar) + reveal nama "AZKA SYAHIRULL"
- Bukan spinner; durasi ±2s
- Skip jika repeat visitor (sessionStorage)
- Curtain transition → Hero

### 6.2 Hero
- Display type raksasa `AZKA SYAHIRULL` (clamp 8–12vw), line-by-line reveal
- **Maksimal 4 elemen teks** (amendemen #3):
  1. Nama raksasa `AZKA SYAHIRULL`
  2. Sub-label mono `AI Developer · Indonesia · Open to work` (badge `Open to work` di-merge ke sini)
  3. CTA magnetic: `View Work ↓`
  4. CTA: `Contact`
- **3D Scene 1: Neural Particle Sphere** — parallax mengikuti mouse + skala/rotasi mengikuti scroll; partikel "menyala" mendekati kursor (pakai `useRef` + `quickTo`, bukan state)

### 6.3 Marquee
- Strip berulang skill stack: Groq · RAG · Next.js · Rust · Python · Supabase · MQL5 · Docker · ...
- **Catatan**: Satu-satunya marquee autoplay di halaman ini (amendemen #2).

### 6.4 Story (About)
- Layout editorial 2 kolom asimetris, tipografi besar
- Badge (A): `Top 100 — #JuaraVibeCoding 2026 · Google Developer Groups`
- Copy draft (ID): *"AI yang punya dampak nyata — dari melindungi keluarga dari pinjol hingga membangun sistem trading kuantitatif."*
- Poin kunci: AI untuk keadilan finansial · Zero-trust mindset · Builder end-to-end (PRD → deploy)
- Quote: *"Code is a shield. Technology is a tool for justice."*
- **3D Scene 2: Morphing Wireframe** — backdrop, morph antar bentuk saat scroll (scroll-scrubbed)
- Stats: 3 proyek production · 2 bahasa · lintas domain: fintech + quantitative trading

### 6.5 Manifesto "How I Work" (B)
- Editorial singkat 3 baris:
  - *"PRD dulu, code belakangan."*
  - *"Security by design, bukan tambahan."*
  - *"Verifikasi tiap langkah — jangan klaim, buktikan."*
- Posisi: sebelum Work (cara membangun → apa yang dibangun)

### 6.6 Work — 3 Case Study (layout UNIK per proyek)

**Pola: Pin per proyek (150vh × 3).** Scroll masuk proyek → kartu besar "menetap" di layar (pin) → info/stats berganti saat scroll berlanjut → pin lepas → curtain transisi ke proyek berikutnya. Setiap chapter: badge `01/02/03` + judul raksasa + tech chips + stat count-up + link.

**01 · SafeWallet** — *AI Financial Wellness Platform, Indonesia*
- Konsep kartu: 3D tilt + mask hover, badge `live demo`
- Story: melawan investasi bodong & pinjol
- Tech chips: Next.js 15 · Supabase/pgvector · Groq · OCR · Redis · Cloud Run · Docker
- Bukti: OCR+LLM, RAG OJK, DTI lock, zero-retention, PII stripping, AES-256-GCM
- Link: GitHub + live demo + Telegram bot

**02 · Xondra** — *Quant AI Trading System (Production v1.0)*
- Konsep kartu: data/viz motion, angka besar count-up
- Story: multi-agent AI + AMD framework + Rust optimization
- Metrik (count-up): **30,332+ pips\*** · **11–30x** · **$0/mo**
- `*Disclaimer: Hasil backtest/hypothetical — bukan jaminan kinerja masa depan.`
- Tech chips: Python · Rust · MQL5 · ChromaDB · SQLite · MT5

**03 · SEITH** — *Autonomous Trading Intelligence (Rust core)*
- Konsep kartu: minimal, terminal aesthetic
- Story: 4-layer filter (Bayesian, CVaR, Market Compass, Orderflow) · CLI-only discipline
- Tech chips: Rust · Python · Jupyter · XAUUSD

**Transisi:** 3D Typography "AZKA" berputar pelan masuk ke section Craft

### 6.7 Timeline (D) — Horizontal Pin Scroll
- Section ter-pin saat scroll vertikal (~300vh) → konten bergerak horizontal (kejutan arah di tengah site)
- Isi: `2026 · 3 proyek production-grade` · `Xondra Production v1.0 — Rust 11–30x` · `SafeWallet live di Cloud Run + bot Telegram`
- Selesai pin → lanjut vertikal ke Craft
- **Catatan**: klaim "Top 100" dan "$0/mo" tidak diulang di sini (amendemen #13 — sudah ada di tempat lain)

### 6.8 Craft (Skills + Sertifikat)
- Grid stack: AI/LLM · Web · Backend/Infra · Quant/Data
- Sertifikat: **Certificate of Achievement — TOP 100 #JuaraVibeCoding** (Google Developer Groups, 2026)
  - Verifier code: `JVC2605-JSVX-JYGR`
  - Link verifier (F): `https://certificate-verifier-1023611269119.asia-southeast1.run.app/`
  - Catatan (F): verifier dibangun & di-deploy sendiri di Google Cloud Run

#### 6.8.1 Stack / Tools (static grid logo)
- **Posisi**: di bawah grid stack, sebagai penutup section Craft
- **Gaya**: **static grid** (bukan marquee — hanya 6.3 yang autoplay, amendemen #2). Logo monokrom abu-abu → **invert monokrom** saat hover (bukan warna brand, konsisten pure-mono). Nama tool via `aria-label`
- **Sumber**: hybrid — `react-simple-icons` untuk brand umum, self-host SVG manual untuk brand niche (Groq, Gemini CLI, MQL5, dll.)
- **Daftar 28 tools**:
  - Web stack (4): Next.js · React · TypeScript · Tailwind CSS
  - AI/LLM (3): Groq · Gemini · 
  - AI Coding (3): Opencode · Kiro · Antigravity · Oh My Pi(omp.sh) · Hermes Agent
  - Backend/Infra (8): Supabase · PostgreSQL · Docker · Google Cloud Run · Redis · Vercel · GitHub Actions · Sentry
  - Data/Vector (3): ChromaDB · SQLite · Jupyter
  - Bahasa (4): Python · Rust · JavaScript · MQL5
  - 3D/Anim (3): Three.js · React Three Fiber · GSAP
- **Mengapa**: bukti visual "kerja di ekosistem AI modern" (Groq, Cursor, Claude Code, Gemini CLI adalah pembeda AI Developer)

### 6.9 Contact
- Giant CTA: `Let's build something` / `Mari bangun sesuatu`
- Email: `azkasyahirull10@gmail.com` (magnetic, copy-to-clipboard)
- GitHub: `kazanaruishere-max`
- **3D Scene 3**: 3D typography nama (opsional jika dibutuhkan)

### 6.10 Footer
- Copyright, nav, back-to-top, socials

---

## 7. Dual Mode (Dark/Light)

- Mekanisme: **next-themes** + CSS Variables + `class="dark"` di `<html>`
- Default: **dark** (kesan AI), persist di localStorage, respect `prefers-color-scheme`
- Aksen: **pure monokrom** (tanpa warna) — skala abu di kedua mode; 3D mengikuti token warna
- Zero flash: inline script saat first paint (`next-themes` attribute)

---

## 8. Motion Language (Dua Sistem, Batas Jelas)

| Sistem | Domain | Library |
|---|---|---|
| **NARASI** | Scroll story, scrub, reveal section, marquee, count-up, timeline, pin | GSAP + ScrollTrigger + Lenis |
| **MIKRO** | Page transition, spring hover, magnetic micro-feedback | `motion` (AnimatePresence + springs) |

**Token konsisten di kedua sistem:**
| Token | Nilai |
|---|---|
| Easing utama | `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) |
| Durasi | reveal 0.8–1.2s · hover 0.3s · preloader 2s |
| Reveal pattern | clip-path / translateY + opacity, staggered |
| ScrollTrigger | scrub untuk 3D, play untuk teks |
| Cursor | dot 8px + ring 32px, magnetic pada interactive |

### 8.1 Feel Scroll (Lenis config — "enteng, nggak pegel, nggak lambat")
| Parameter | Nilai | Efek |
|---|---|---|
| `duration` | **1.15** | Enteng — responsif, bukan mengambang |
| `easing` | `cubic-bezier(0.1, 0.2, 0.2, 1)` | Percepatan alami, tidak "kenyal" berlebihan |
| `wheelMultiplier` | 1.0 (default) | Jangan perlambat input user |
| `smoothWheel` | true (desktop) | Smooth scroll aktif |
| `touchSmooth` | **false** | Mobile native scroll (hemat baterai, tanpa delay) |
| GSAP ↔ Lenis | sync `ScrollTrigger.update()` di raf | Scrub sinkron tanpa jank |
| Pin spacing | `pinSpacing: true` | Section pinned tidak "ngganjel" |

### 8.2 Fallback `prefers-reduced-motion` per scene 3D
| Scene | Fallback |
|---|---|
| Neural Particle Sphere | Gradien statis (CSS) |
| Morphing Wireframe | Wireframe statis (tanpa morph) |
| 3D Typography | Teks biasa (tanpa 3D) |

Semua motion lain → fade sederhana + scroll native (8.1).

---

## 9. Performance & Responsive Budget

### 9a. Lazy-loading 3D (wajib)
- **Semua scene R3F** di-load via `next/dynamic(..., { ssr: false, loading: <placeholder> })`
- **Three.js tidak ada di initial bundle halaman utama** — hanya masuk via dynamic chunk saat section masuk viewport
- `SceneWrapper` pattern:
  ```
  IntersectionObserver → mount scene → frameloop "demand" saat off-screen
  ```
- R3F di-`dynamic` per-scene → code splitting alami

### 9b. Deteksi device low-end / mobile (praktik nyata, bukan teori)
Layered detection — dari murah ke mahal:
| Prioritas | Deteksi | Aksi |
|---|---|---|
| 1 | `matchMedia('(pointer: coarse)')` (touch/mobile) | Partikel dikurangi 50–70%, DPR clamp `min(dpr, 1.5)` |
| 2 | `navigator.hardwareConcurrency <= 4` | Turunkan resolusi + partikel |
| 3 | `navigator.deviceMemory <= 4` | Mode "low" |
| 4 | `prefers-reduced-motion` | **Ganti 3D → static fallback** |
| 5 | WebGL tidak tersedia / GPU crash | **Fallback statis**: gambar/video loop on-brand |

Implementasi: util `getDeviceTier()` (cached) → `tier: 'high' | 'medium' | 'low'` → scene memilih config. Pattern yang dipakai site Awwwards sungguhan.

### 9c. Kompresi aset
- **3D**: procedural → tidak ada `.glb`. *(Jika nanti model eksternal: wajib `DRACOLoader` + gltf-pipeline)*
- **Gambar**: semua lewat `next/image` (WebP/AVIF otomatis, width/height eksplisit → zero CLS). Sertifikat & placeholder memakainya
- **Font**: `next/font` → subset otomatis + `display: swap` → zero CLS

### 9d. Budget akhir
```
LCP < 2.5s (teks hero sebagai LCP element, bukan canvas)
Performance ≥ 90 (floor 80) · Accessibility ≥ 95 · Best Practices 100 · SEO ≥ 90
FPS WebGL rata-rata ≥ 55 saat scroll
Three.js 0 byte di initial bundle → hanya via dynamic chunk saat dibutuhkan
```

### 9e. Responsive
- Mobile-first: breakpoint Tailwind (`md`, `lg`, `xl`)
- Custom cursor & magnetic otomatis nonaktif di touch (`matchMedia('(pointer: fine)')`)
- Lenis: smooth scroll hanya wheel/desktop; mobile native scroll (hemat baterai)
- Menu mobile: hamburger full-screen overlay on-brand
- Tablet: breakpoint menengah dijaga, 3D tetap jalan dengan partikel sedang
- `prefers-reduced-motion`: semua motion → fade sederhana

---

## 10. Struktur Folder (target)

```
src/
├─ app/                # layout, page, work/[slug], globals
├─ components/
│  ├─ ui/              # cursor, magnetic, marquee, tools-marquee, preloader, reveal, section-heading, PinSection
│  ├─ sections/        # hero, story, manifesto, work, timeline, craft, contact, footer
│  └─ three/           # ParticleSphere, MorphWireframe, Type3D, SceneWrapper
├─ lib/                # gsap utils, scroll (lenis), device-tier, content data
├─ content/            # projects.ts, profile.ts (ID/EN)
└─ styles/             # tokens.css, fonts
```

---

## 11. Implementation Phases

1. **P0** — Scaffold Next.js 15 + deps + download font Clash Display (woff2) + setup `cn()` util + design tokens (dual mode via next-themes, font, spacing)
2. **P1** — Primitif UI: cursor, magnetic, marquee, tools-marquee, reveal, preloader, PinSection, section-heading
3. **P2** — 3 scene R3F (particle, morph, type3d) + `SceneWrapper` lazy + `getDeviceTier()` util
4. **P3** — Sections Home (hero → footer, incl. Work pin ×3 + Timeline horizontal pin)
5. **P4** — Halaman case study ×3 (layout unik) + page transition (`motion`)
6. **P5** — i18n ID/EN, polish motion, responsive, reduced-motion
7. **P6** — Verification: build, lint, typecheck, Lighthouse, FPS

---

## 12. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| WebGL berat di device rendah | `getDeviceTier()` + DPR clamp + fallback statis (9b) |
| Three.js memperlambat load | `next/dynamic ssr:false` — 0 byte di initial bundle (9a) |
| Font besar memperlambat LCP | `next/font` + font-display swap |
| Dual bahasa konten 2x lipat | Dictionary terpusat di `content/` |
| Page transition complex | `motion` AnimatePresence, kurangi saat reduced-motion |

---

## 13. SEO Deliverables (wajib, target ≥ 90)

- `metadata` lengkap di `layout.tsx` (title, description, canonical, keywords)
- OpenGraph: `og:title`, `og:description`, `og:image`, `og:type=website`
- Twitter Card
- JSON-LD **`Person`**: name, email, url, sameAs (GitHub), jobTitle "AI Developer"
- `app/sitemap.ts` (`/` + `/work/[slug]`)
- `app/robots.ts`
- OG image statis on-brand (`opengraph-image.tsx`)
- Semantic HTML: `header`, `main`, `section`, `footer`, hierarki `h1`–`h3` benar

---

## 14. Depth-Layer System Map

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

## 15. Konten Sumber

| Item | Sumber |
|---|---|
| Proyek 1 | https://github.com/kazanaruishere-max/SafeWallet |
| Proyek 2 | https://github.com/kazanaruishere-max/Xondra-Bot-Trading |
| Proyek 3 | https://github.com/kazanaruishere-max/SEITH |
| Sertifikat | `Certificate-Google.png` (Top 100 #JuaraVibeCoding 2026) |
| Verifier | `certificate-verifier-1023611269119.asia-southeast1.run.app` |
| Email | azkasyahirull10@gmail.com |
