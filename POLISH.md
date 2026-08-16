# POLISH — Reactive & Non-Generic Pass

**Dokumen**: POLISH.md v1.0  
**Status**: Draft untuk review  
**Tanggal**: 02 Agustus 2026  
**Basis**: PRD v3.0 + PRD-amendments.md + AGENTS.md  
**Dials (per design-taste-frontend)**: VARIANCE 8 · MOTION 8 · DENSITY 4

---

## 1. Visi

Semua "object" di halaman (kartu, logo, sertifikat, chips, CTA, visual proyek, heading) bereaksi **halus saat kursor mendekat** — tiap elemen respons *berbeda* (bukan seragam), sehingga tiap section terasa hidup dan tidak generik. Motion tetap terukur, mulus di mobile/tablet, dan hormat `prefers-reduced-motion`.

**Prinsip anti-generik (guardrail):**
- Tiap section memakai keluarga layout & respons proximity yang **berbeda** — tidak ada 2 section "kembar"
- Reveal beragam: word-pull / clip / line / blur — **tidak seragam** di semua section
- Hover physics beragam: magnet / tilt / shift / scale / decrypt — tiap tipe untuk konteks berbeda
- Tetap hormat semua guardrail PRD: transform+opacity, `aria-hidden` dekoratif, pure-monokrom (tanpa gradient/neon/glass), max 1 marquee

---

## 2. Arsitektur inti: `ReactivePointer` (sistem proximity global)

Ini yang membuat **semua object bergerak saat mouse mendekat**.

```
Satu mousemove (passive) → simpan {x,y} di singleton store (BUKAN React state)
Satu rAF loop → iterasi registry "reactive targets"
Per target: hitung jarak pointer → terapkan transform (GSAP quickTo / style langsung)
Elemen mendaftar via hook useProximity(ref, config) saat mount
```

### 2.1 Store & Loop
| Aspek | Desain |
|---|---|
| Store | module singleton + `MotionValue` (tanpa re-render React) |
| Loop | 1× rAF, throttle, **pause saat tab hidden** (visibilitychange) |
| Response | `transform` only (translate/scale/rotate) — 0 layout read |
| Rect cache | di-cache saat register + recompute saat resize (debounce) |
| Auto-cleanup | registry hapus target saat unmount (WeakRef / Map) |

### 2.2 Config per target
```
useProximity(ref, {
  type: 'magnetic' | 'tilt' | 'shift' | 'scale' | 'aura',
  strength: 0.4,      // kekuatan respons
  range: 120,         // jarak aktivasi (px)
  maxShift: 8,        // translate maks (px)
  maxTilt: 6,         // rotateX/Y maks (deg)
})
```

| type | Behavior | Untuk |
|---|---|---|
| `magnetic` | Tarik elemen ke kursor (elastic-out saat lepas) | Button CTA, email, GitHub |
| `tilt` | RotateX/Y mengikuti posisi kursor relatif | Sertifikat, visual proyek, kartu |
| `shift` | Translasi halus menjauh/menuju kursor | Chips, stack card, timeline item |
| `scale` | Skala halus (0.98→1.03) | Logo orbit item, badge |
| `aura` | Radial glow mengikuti mouse (border/ring) | Kartu stack, project visual |

### 2.3 Gate
- Aktif **hanya** `matchMedia('(pointer: fine)')`
- **Mati total** saat `prefers-reduced-motion`
- Registry dibatasi (±40 target) — hanya "object", bukan per-kata

---

## 3. Inventory komponen

### 3.1 Baru (NEW)
| Komponen | Fungsi | Section |
|---|---|---|
| `ui/ReactivePointer.tsx` | Provider + registry + rAF loop (sistem inti) | global |
| `ui/useProximity.ts` | Hook daftar elemen + config respons | global |
| `ui/ToolsOrbit.tsx` | 28 logo orbit melingkar berputar (CSS rotate, hover-pause, reduced-motion statis, sr-only list) | Craft |
| `ui/ScrollProgress.tsx` | Progress bar tipis (transform scaleX, scrub) | global |
| `ui/Monogram.tsx` | Avatar monogram "AZKA" editorial (inline, no asset) | Story |
| `ui/TextEffects.tsx` | `PullUp` · `RotatingText` · `DecryptedText` | Hero, Manifesto, Judul, CTA |

### 3.2 Dimodifikasi (MOD)
| File | Perubahan |
|---|---|
| `ui/SectionHeading.tsx` | Judul → **Word PullUp** reveal |
| `sections/Hero.tsx` | RotatingText roles + scrub parallax nama/sphere + proximity CTA |
| `sections/Story.tsx` | Monogram + fakta personal + morph proximity (scale/tilt) |
| `sections/Manifesto.tsx` | Word PullUp + hover-highlight kata + proximity baris |
| `sections/WorkSection.tsx` | Terminal **typing effect** + chips stagger + proof slide + visual 3D-tilt proximity |
| `sections/TimelineSection.tsx` | Item fade/slide + hover border + proximity micro-shift |
| `sections/CraftSection.tsx` | Grid 28-logo → **ToolsOrbit** + kategori 2-kolom ringkas + stack hover + cert tilt |
| `sections/ContactSection.tsx` | CTA press (scale 0.98) + Type3D rotate ke mouse + proximity button |
| `sections/Footer.tsx` | "Dibangun dengan disiplin engineering di Indonesia" |
| `app/page.tsx` | Tambah `ReactivePointer` + `ScrollProgress` |
| `content/profile.ts` | Bio, Currently, 3 fakta personal, rotating roles |
| `app/globals.css` | Keyframes orbit + micro helpers |

---

## 4. Peta anti-generik per section

| Section | Polish | Proximity |
|---|---|---|
| **Hero** | RotatingText roles · scrub parallax | Sphere + CTA magnetic + nama micro-shift |
| **Marquee** | tetap (satu-satunya) | pause hover (sudah) |
| **Story** | Monogram + fakta personal + quote | Morph scale/tilt ikut mouse + kartu stat shift |
| **Manifesto** | Word PullUp + kata aktif highlight | baris shift saat pointer lewat |
| **Work ×3** | 3 layout unik + typing terminal + stagger | Visual 3D-tilt + chips shift |
| **Timeline** | item fade/slide horizontal | item micro-shift |
| **Craft** | Orbit + kategori ringkas + cert | Orbit lambat/dekat kursor + stack shift + cert tilt |
| **Contact** | CTA raksasa + Type3D | Type3D rotate ke mouse + button magnetic + press |
| **Footer** | line lokal | back-to-top micro |

---

## 5. Motion tambahan (terkunci)

Word PullUp (judul + manifesto) · RotatingText (hero roles) · DecryptedText (CTA/nav) · Orbit tools · Scroll progress · chips stagger · timeline slide · CTA press · cert parallax.

---

## 6. Guardrail & budget performa

| Item | Keputusan |
|---|---|
| ReactivePointer | 1 mousemove passive + 1 rAF + registry; transform-only; rect cache; pause tab hidden |
| Orbit | CSS transform 1 layer (bukan per-logo JS) |
| PullUp / Rotating / Decrypt | GSAP yang sudah ter-load (0 bundle baru) |
| Registry target | ≤ ~40 object |
| Mobile/tablet (`pointer:coarse`) | Proximity & hover **OFF**; motion scroll-driven (scrub/pin/orbit-rotation/marquee) **tetap jalan** |
| Reduced-motion | Orbit statis · proximity off · semua teks statis (fade) |
| Bundle | tidak ada dependency baru (semua dari stack existing) |

---

## 7. Files yang akan dibuat/diubah (ringkas)

```
NEW  src/components/ui/ReactivePointer.tsx
NEW  src/components/ui/useProximity.ts
NEW  src/components/ui/ToolsOrbit.tsx
NEW  src/components/ui/ScrollProgress.tsx
NEW  src/components/ui/Monogram.tsx
NEW  src/components/ui/TextEffects.tsx
MOD  src/components/ui/SectionHeading.tsx
MOD  src/components/sections/{Hero,Story,Manifesto,WorkSection,TimelineSection,CraftSection,ContactSection,Footer}.tsx
MOD  src/app/page.tsx
MOD  src/content/profile.ts
MOD  src/app/globals.css
```

---

## 8. Verification

1. `npm run build` · `npm run lint` · `npm run typecheck` · `npm test` (14+)
2. a11y scan + contrast (AA) — ReactivePointer & dekoratif `aria-hidden`
3. SSR check (semua section + komponen baru render)
4. **Visual browser**: orbit berputar, rotating roles, decrypt hover, pull-up words, proximity semua object, cert tilt, Type3D rotate
5. **Mobile/tablet**: pointer:coarse → proximity off, orbit tetap, tidak ada jank
6. **Reduced-motion**: semua statis, orbit statis
7. code-reviewer gate
