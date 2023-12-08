import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [preact()],
  server: {
    port: 8081,
    proxy: {
      '/kit': {
        target: 'http://127.0.0.1:8211',
        changeOrigin: true
      },
    }
  },
});
