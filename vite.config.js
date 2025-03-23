import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // <— allows access via local IP (e.g. 192.168.x.x)
    port: 5173, // optional: default is 5173, you can change it
  },
});
