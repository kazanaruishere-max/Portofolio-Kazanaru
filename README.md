# Portofolio-Kazanaru

Portofolio pribadi **Azka Syahirull** — AI Developer · Quant Engineer · Fullstack Builder (SMK Cybermedia).

Dark editorial monochrome, bilingual (ID/EN), dibangun dengan Next.js App Router. Bukan template — dikerjakan dengan prinsip yang sama seperti proyek-proyek di dalamnya: PRD dulu, security by design, dan verifikasi tiap langkah.

## Konten

- **Hero** — robot Spline 3D transparan + meta rail editorial
- **Story / Impakt** — bio, stats, quote, monogram
- **Manifesto** — cara bekerja
- **Work** — 4 case study dengan arsitektur pin-scroll: SafeWallet, Xondra, SEITH, Coralism
- **Craft** — stack, sertifikat + verifier self-built, orbit tools
- **Contact** — CTA raksasa, email/GitHub/LinkedIn

## Tech Stack

- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- **Motion:** GSAP (ScrollTrigger) · Motion (framer) · Lenis (smooth scroll)
- **3D:** Spline (`@splinetool/react-spline`, lazy + tablet/desktop only)
- **Font:** Clash Display · Satoshi · JetBrains Mono (self-hosted via `next/font`)
- **Lainnya:** lucide-react · simple-icons · count-up · custom cursor & grain

## Menjalankan Lokal

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run test       # vitest
npm run build      # production build
```

## Deploy

Deploy via Vercel (otomatis terhubung ke branch `main` repo ini).

## Catatan

- Media/screenshot proyek ada di `public/projects/`. File sumber PNG di root tidak di-commit (lihat `.gitignore`).
- 9router & dev server: jangan matikan proses core lingkungan kerja.

© 2026 Azka Syahirull · Dibangun dengan disiplin engineering di Indonesia.