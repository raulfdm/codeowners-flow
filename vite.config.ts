import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: {
        index: "src/index.ts",
        config: "src/config.ts",
      },
      formats: ["cjs"],
    },
    outDir: "dist",
  },
});
