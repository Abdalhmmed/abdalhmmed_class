import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

// Custom plugin to ensure static folders (assets/ and courses/) are copied into dist/ on build
function copyStaticDirsPlugin() {
  return {
    name: 'copy-static-dirs',
    closeBundle() {
      const rootDir = fileURLToPath(new URL('.', import.meta.url))
      const distDir = path.resolve(rootDir, 'dist')
      for (const dir of ['assets', 'courses']) {
        const src = path.resolve(rootDir, dir)
        const dest = path.resolve(distDir, dir)
        if (fs.existsSync(src)) {
          fs.cpSync(src, dest, { recursive: true })
        }
      }
    }
  }
}

export default defineConfig({
  base: './',
  plugins: [vue(), copyStaticDirsPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
