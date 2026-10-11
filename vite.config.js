import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  base: "/FORGE-ATHLETIC-CLUB/",
  resolve: { preserveSymlinks: true },
  plugins: [react(), tailwindcss()],
});
