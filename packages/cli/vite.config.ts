/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [dts()],
  build: {
    target: "node16",
    rollupOptions: {
      external: function isExternal(id: string) {
        return !id.startsWith(".") && !path.isAbsolute(id);
      },
    },
    outDir: "dist",
    lib: {
      entry: "./src/index.ts",
      fileName: "index",
      formats: ["cjs", "es"],
    },
  },
});
