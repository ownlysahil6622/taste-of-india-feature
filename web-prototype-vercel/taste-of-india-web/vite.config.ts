import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// vercel.json caches everything under /assets/ for a year, because Vite names those files with a
// hash of their content. A public/assets/ folder would be served at the same path without hashes,
// so a replaced image could stay cached. Images belong in src/assets/ instead; this stops the build.
function noPublicAssets(): Plugin {
  return {
    name: 'no-public-assets',
    buildStart() {
      if (fs.existsSync(path.resolve(__dirname, 'public/assets'))) {
        this.error('public/assets/ would be cached for a year by vercel.json. Put images in src/assets/ instead.')
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), noPublicAssets()],
  build: {
    rolldownOptions: {
      output: {
        // The map SVG (~390 KB) gets its own file: it downloads in parallel with the app code and
        // stays cached when only the app code changes.
        codeSplitting: { groups: [{ name: 'india-map', test: /india-map\.svg/ }] },
      },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
