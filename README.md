# SIM Learning Lab

Prototype web pembelajaran Sistem Informasi Manajemen dengan lima area:
- Dashboard
- Explore Company
- Business Case
- AI Investigation
- Learning Result

## Menjalankan secara lokal
1. Install Node.js versi LTS.
2. Jalankan `npm install`.
3. Jalankan `npm run dev`.
4. Buka URL lokal yang ditampilkan Vite.

## Build
`npm run build`

## Deploy publik ke Vercel
1. Upload project ini ke repository GitHub.
2. Import repository di Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.

## Catatan integrasi
Tombol AR dan VR saat ini berupa placeholder UI. Hubungkan dengan URL pengalaman Assemblr/model-viewer dan scene A-Frame setelah aset 3D tersedia.
Chat AI saat ini menggunakan respons demonstrasi lokal. Untuk AI sungguhan, buat backend/API route dan simpan Gemini API key di environment variable server-side. Jangan meletakkan API key di frontend.
