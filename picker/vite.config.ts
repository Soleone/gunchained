import path from "node:path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Plugin } from "vite"
import { themeHead } from "./src/theme"

// head.js runs blocking in <head>: it adds every theme's palette and restores the visitor's theme
// before first paint, as the root layout of a server-rendered app would inline them.
const themeHeadScript = (): Plugin => ({
  name: "theme-head",
  generateBundle() {
    const css = JSON.stringify(themeHead.themeStyles)
    this.emitFile({
      type: "asset",
      fileName: "head.js",
      source: `(function(){var s=document.createElement("style");s.textContent=${css};document.head.appendChild(s)})();\n${themeHead.themeScript}\n`,
    })
  },
})

// Builds into the Vue app's public folder, served from /theme/.
export default defineConfig({
  plugins: [react(), tailwindcss(), themeHeadScript()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
  base: "/theme/",
  build: {
    outDir: "../public/theme",
    emptyOutDir: true,
    rollupOptions: {
      input: "src/main.tsx",
      output: { entryFileNames: "picker.js", assetFileNames: "picker[extname]" },
    },
  },
})
