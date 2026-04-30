import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  base: "/capitalone-opmodel/",
  plugins: [react(), viteSingleFile()],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    // Inline every asset (fonts, images) into the single HTML output.
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
