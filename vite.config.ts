import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8000,
    proxy: {
      '/api': 'http://localhost:3000',
      '/sanctum': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
    }
  }
})
