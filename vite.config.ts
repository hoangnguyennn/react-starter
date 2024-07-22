import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@hn/test': path.resolve(__dirname, './test'),
      '@hn': path.resolve(__dirname, './src')
    }
  },
  // https://vitest.dev/config/
  test: {
    environment: 'jsdom'
  }
})
