import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // For relative paths (GitHub Pages compatible)
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
})
