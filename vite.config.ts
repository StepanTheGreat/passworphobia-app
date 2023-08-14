import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import wasm from "vite-plugin-wasm";

export default defineConfig(async () => ({
  plugins: [
    svelte(),
    wasm()
  ],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/node_modules/**", "**/src-tauri/target/**"],
    },
  },
  envPrefix: ["VITE_", "TAURI_"],

  
}));
