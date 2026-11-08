import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const CUTOUT_DIR = path.resolve(__dirname, 'public/assets/cards/cutouts')

// Exposes the PNG names in public/assets/cards/cutouts/ as `virtual:card-cutouts`, so the app knows
// which dishes have a cut-out card image. (import.meta.glob would bundle copies of public files.)
// In dev, adding or removing a file reloads the page.
function cardCutouts(): Plugin {
  const id = 'virtual:card-cutouts'
  const resolvedId = '\0' + id
  return {
    name: 'card-cutouts',
    resolveId: (source) => (source === id ? resolvedId : undefined),
    load(loadId) {
      if (loadId !== resolvedId) return
      const files = fs.existsSync(CUTOUT_DIR) ? fs.readdirSync(CUTOUT_DIR).filter((file) => file.endsWith('.png')) : []
      return `export default ${JSON.stringify(files)}`
    },
    configureServer(server) {
      const refresh = (file: string) => {
        if (path.dirname(file) !== CUTOUT_DIR) return
        const module = server.moduleGraph.getModuleById(resolvedId)
        if (module) server.moduleGraph.invalidateModule(module)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.add(CUTOUT_DIR)
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), cardCutouts()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
