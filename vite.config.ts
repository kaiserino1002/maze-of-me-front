import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost', // 3000 → 80
        changeOrigin: true,
      },
      '/sanctum': {
        target: 'http://localhost',
        changeOrigin: true,
      },
      '/auth': {
        target: 'http://localhost',
        changeOrigin: true,
      },
    },
  }
})
