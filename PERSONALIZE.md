# PERSONALIZE — Deep Personalization + Visual Depth

**Dokumen**: PERSONALIZE.md v1.0  
**Status**: Draft untuk review  
**Tanggal**: 09 Agustus 2026  
**Basis**: PRD v3.0 · POLISH.md · CV `Azka Syahirull (CV).docx` · keputusan user

---

## 1. Tujuan

Menghilangkan kesan "flat & generik" dengan dua cara:
1. **Konten autentik dari CV** — positioning, bio, fakta, cert, proyek, skill, kontak yang benar-benar milik Azka (bukan draf generic).
2. **Visual depth** — Spline 3D di hero, screenshot proyek nyata di Work, 4 proyek, 3 sertifikat.

**Keputusan terkunci**: tetap pure monokrom · 4 proyek (+ Coralism) · positioning Student + AI Developer · AI Fluency = 1 credential grup 6 modul · phone tidak ditampilkan.

---

## 2. Positioning & Konten (draft copy untuk review)

### 2.1 Role / Availability
| Field | ID | EN |
|---|---|---|
| `role` | AI Developer · SMK Student | AI Developer · SMK Student |
| `available` | Open to internship (PKL) | Open to internship (PKL) |

### 2.2 Bio
- **ID**: "Saya Azka — siswa Software Engineering di SMK Cybermedia yang membangun AI untuk melindungi orang dari kerugian finansial, dan sistem kuantitatif yang mengeksekusi strategi dengan disiplin. Sedang mencari internship (PKL) untuk tumbuh di tim engineering profesional."
- **EN**: "I'm Azka — a Software Engineering student at SMK Cybermedia building AI that protects people from financial harm, and quantitative systems that execute strategies with discipline. Currently seeking an internship (PKL) to grow within a professional engineering team."

### 2.3 Story
- **ID**: "Dari kelas 11, saya membangun sistem yang biasanya dibuat tim engineering: platform deteksi penipuan finansial berbasis LLM, sistem trading kuantitatif multi-agent dengan Rust, hingga game di hackathon nasional — semuanya self-directed."
- **EN**: "From grade 11, I build systems usually made by engineering teams: an LLM-based financial fraud detection platform, a multi-agent quant trading system in Rust, to a national hackathon game — all self-directed."

### 2.4 Fakta personal (3)
1. **ID**: "Termotivasi keadilan finansial — AI yang melindungi, bukan mengeksploitasi" / **EN**: "Motivated by financial justice — AI that protects, not exploits"
2. **ID**: "Belajar mandiri & mendokumentasikan tiap langkah (PRD → audit → journal)" / **EN**: "Self-taught, documenting every step (PRD → audit → journal)"
3. **ID**: "Dari SMK ke sistem production — kode adalah bukti, bukan ijazah" / **EN**: "From SMK to production systems — code is the proof, not the diploma"

### 2.5 NowStrip (Currently)
- **ID**: "Currently: mencari internship PKL (Jan–Mar 2027) · membangun SEITH · 34 repo · 560+ commit"
- **EN**: "Currently: seeking internship (PKL, Jan–Mar 2027) · building SEITH · 34 repos · 560+ commits"

### 2.6 Timeline (diperbarui)
1. `2026 · Top 100 #JuaraVibeCoding — GDG Indonesia`
2. `2026 · AI Fluency Track — Anthropic (6 modul)`
3. `2026 · Xondra v1.0 — Rust 11-30x · SEITH autonomous`
4. `2026 · Coralism — GGJ Next 2026 (game)`
5. `2026 · SafeWallet live di Cloud Run + bot Telegram`
6. `2026 · 34 repo · 560+ commits · 31 stars`

---

## 3. Empat Proyek

| Proyek | Layout | Visual (screenshot) | Catatan |
|---|---|---|---|
| SafeWallet | tilt | `safewallet.png` | badge live demo |
| Xondra | data | `xondra-backtest.png` | metrics count-up + disclaimer |
| SEITH | terminal | *(terminal typing visual)* | CLI-only, tanpa screenshot |
| Coralism (baru) | tilt/image | `coralism-menu.png` | GGJ Next 2026 · Lead Backend & PM · Godot/GDScript |

### Coralism — data proyek
```
slug: "coralism" · number: "04"
tagline: 2D Eco-System Game — GGJ Next 2026
story: Hackathon Agate Academy (Bandung), tim 3 orang, Lead Backend & Project Manager.
       Gameplay logic di Godot/GDScript. Bukti breadth: game dev + leadership + kolaborasi.
tech: Godot · GDScript · 2D · Hackathon
links:
  - GitHub: https://github.com/kazanaruishere-max/Coralism ✅ (terverifikasi)
badges: [hackathon]
proof: "Lead backend & PM tim 3 orang" · "Gameplay di Godot/GDScript" · "GGJ Next 2026 · Agate Academy"
```

> **Screenshot source** (di root, akan di-copy ke `public/projects/`):
> - `SafeWallet.png` → `public/projects/safewallet.png`
> - `Backtest XONDRA XAUUSD.png` → `public/projects/xondra-backtest.png`
> - `Main Menu Coralism.png` → `public/projects/coralism-menu.png`
> - `Gameplay Coralism.png` → `public/projects/coralism-gameplay.png` (opsional)

### SEITH — framing jujur (anti-slop, kredibel)
Karena **belum ada backtest berhasil** (baru 2 signal), SEITH:
- **TANPA klaim performa/metrik** (tidak ada pips/win rate)
- Fokus arsitektur: 4-layer filter (Bayesian, CVaR, Market Compass, Orderflow) · CLI-only · self-learning
- Status honest: `in development — signal generation live, backtesting in progress`
- Visual terminal (identitas CLI-only) · tanpa screenshot
- Xondra tetap tampil dengan backtest screenshot + disclaimer (Xondra memang punya hasil)

---

## 4. Sertifikat (Craft) — 3 credentials

| Credential | Detail |
|---|---|
| **TOP 100 #JuaraVibeCoding** | Google Developer Groups Indonesia · 2026 · verifier live (sudah ada) |
| **Gemini Certified Educator** | Google for Education · 2025 · AI, prompt engineering, edtech |
| **AI Fluency Certification Track** | **Anthropic · 2026 · 6 modul** (AI literacy, prompt engineering, responsible AI) — tampil sebagai 1 credential dengan badge "6 modul" |

> 6 PDF `certificate-*.pdf` (AI Fluency) → **di-satukan sebagai 1 credential grup "6 modul"** (keputusan user). PDF disimpan sebagai `public/certs/ai-fluency-*.pdf` (link verifikasi/download opsional).

---

## 5. Skill & Tools (diperbarui)

- **Bahasa**: Python · TypeScript · JavaScript · Rust · **Go** · **PHP**
- **Frameworks**: Next.js · React · Node.js · Express · Docker · Git · ChromaDB · **Godot Engine** · Google Cloud · VS Code · **OpenCode** · **Hermes Agent**
- **AI/LLM**: Gemini API · Groq API · Claude · prompt engineering · LLM orchestration
- Tools orbit menambahkan: Go, PHP, Godot, Express, Hermes Agent, OpenCode (jika logo tersedia → simple-icons, else monogram)

---

## 6. Kontak (Contact + Footer)

- Email: `azkasyahirull10@gmail.com` (copy)
- GitHub: `kazanaruishere-max`
- **LinkedIn**: `https://www.linkedin.com/in/azka-syahirull-a647993b6/` (baru)
- Phone: **TIDAK ditampilkan** (privasi)

---

## 7. Spline di Hero

- **Dep**: `@splinetool/react-spline`
- **Scene**: `https://prod.spline.design/sCEp8BHPfcSOCgmm/scene.splinecode`
- **Komponen** `SplineScene` (lazy `next/dynamic` ssr:false):
  - fallback loading = outlined "AZKA"
  - `onLoad(app)` → jika Motion OFF / reduced-motion → `app.pause()`
  - device-tier low → skip (fallback statis)
  - `aria-hidden` · container `pointer-events-none` di belakang teks hero
  - error handling → fallback statis
- Hero: Spline sebagai visual utama backdrop; nama + sub-label + CTA di atas (z-index content)

---

## 8. File berubah

```
NEW  components/SplineScene.tsx · public/projects/* (copy+rename) · public/certs/ (opsional)
DEP  @splinetool/react-spline
MOD  content/profile.ts (role, bio, story, facts, now, timeline, certs, contact, skills)
MOD  content/projects.ts (+ Coralism, + screenshot fields, safeimage layout)
MOD  sections/Hero.tsx (Spline) · WorkSection.tsx (screenshot per proyek)
MOD  sections/CraftSection.tsx (3 certs, AI Fluency grup) · ContactSection.tsx (+LinkedIn)
MOD  sections/NowStrip.tsx (pesan PKL) · ui/ (kalau perlu komponen cert baru)
```

---

## 9. Verification

1. `npm i @splinetool/react-spline`
2. `npm run build` · `npm run lint` · `npm run typecheck` · `npm test` (15)
3. Copy + rename screenshot ke `public/projects/` (name bersih)
4. Browser: Spline di hero, 4 proyek bergambar, 3 cert, LinkedIn, pesan PKL
5. a11y: Spline aria-hidden · Motion OFF → pause · no-WebGL/low-tier → fallback
6. code-reviewer gate

---

## 10. Catatan / TBD

- **SEITH**: dipertahankan (terminal visual, framing jujur tanpa backtest). Bisa di-drop (1 baris) jika user mau.
- **Coralism GitHub**: ✅ sudah terisi (`https://github.com/kazanaruishere-max/Coralism`).
- **AI Fluency (6 PDF)**: ✅ diputuskan jadi 1 credential grup "6 modul".
- **SEITH GitHub**: tetap `https://github.com/kazanaruishere-max/SEITH` (repo ada, walau backtest belum berhasil).
