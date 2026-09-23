import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    // The admin session cookie is SameSite=Lax, so the browser only sends
    // it to the site's own origin. Proxying /api makes the Rust server look
    // same-origin in development (see API.md, "Connecting").
    server: env.VITE_API_PROXY
      ? { proxy: { "/api": { target: env.VITE_API_PROXY, changeOrigin: true } } }
      : undefined,
  };
});
