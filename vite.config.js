import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base: "./"` keeps asset paths relative, so the build works on any host
// (Netlify, Vercel, or a GitHub Pages sub-path) without extra config.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
