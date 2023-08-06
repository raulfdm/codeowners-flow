import { defineConfig } from "vite";
import path from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
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
      entry: {
        ci: "src/cli.ts",
        config: "src/config.ts",
      },
      formats: ["cjs", "es"],
    },
  },
});
