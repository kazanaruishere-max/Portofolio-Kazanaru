<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Layanan yang Wajib Dijaga (Do Not Kill)

- **JANGAN matikan/hentikan proses 9router** yang berjalan di `http://localhost:20128`.
  Proses ini harus tetap hidup selama sesi pengembangan. Jangan jalankan perintah
  yang bisa menghentikannya (kill/pkill/taskkill/restart service/cleanup port).

## Protokol Manajemen Dev Server (WAJIB)

Hanya dev server Next.js milik project ini yang boleh dihentikan — **hanya via PID port 3000**, tidak pernah blanket kill.

| Operasi | Cara yang Diizinkan |
|---|---|
| Mulai dev server | `Start-Process cmd -ArgumentList "/c npm run dev > dev.log 2>&1" -WindowStyle Hidden` lalu tunggu `Ready` |
| Hentikan dev server | `$pid = (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess; Stop-Process -Id $pid` — hanya PID milik port 3000 |
| Cek status | `Invoke-WebRequest http://localhost:3000` (200 = hidup) |

**DILARANG (dapat membunuh 9router):**
- `Stop-Process -Name node` / `Get-Process node | Stop-Process`
- `taskkill /im node.exe`, `pkill node`, `killall node`
- Cleanup port, restart service, atau perintah apa pun yang menyentuh proses selain PID dev server port 3000
