import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/WebDoc-HeartBleed/', // nom exact de ton dépôt
  plugins: [react()],
})