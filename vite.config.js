import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    allowedhosts: true, // Network access allow karega
    port: 5173, // Optional: Port fix karne ke liye
  },
});
