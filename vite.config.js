import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import * as path from "path"
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "InteractiveRegionsMap",
      fileName: "interactive-regions-map"
    },
    rollupOptions: {
      external: ["vue", "d3"],
      output: {
        globals: {
          vue: "Vue",
          d3: "d3"
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src")
    }
  }
})
