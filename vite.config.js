import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { nitro } from "nitro/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// ...keep your NOT_PREBUNDLED / PREBUNDLE code as is...

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  optimizeDeps: { include: PREBUNDLE },
  plugins: [
    tanstackStart({ srcDirectory: "src" }),
    nitro(),
    react(),
  ],
});