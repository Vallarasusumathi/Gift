// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.mov']
// })


// vite.config.js
// ╔══════════════════════════════════════════════════════════════╗
// ║  Replace YOUR-REPO-NAME below with your GitHub repo name     ║
// ║  Example: if your repo is  github.com/john/logi-bday        ║
// ║  then set:  base: "/logi-bday/"                             ║
// ╚══════════════════════════════════════════════════════════════╝

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // ✅ CRITICAL for GitHub Pages — set this to your repo name
  base: "/YOUR-REPO-NAME/",

  // ✅ Tells Vite to treat these files as assets (not just JS/CSS)
  assetsInclude: [
    '**/*.mp4',
    '**/*.webm',
    '**/*.mov',
    '**/*.jpeg',
    '**/*.jpg',
    '**/*.png',
    '**/*.gif',
    '**/*.webp',
  ],
})
