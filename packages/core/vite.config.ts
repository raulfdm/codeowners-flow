/// <reference types="vitest" />
import path from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  test: {
    globals: true,
    clearMocks: true,
  },
  plugins: [
    dts({
      outDir: 'dist',
      exclude: ['src/**/*.test.*', 'vite.config.ts'],
    }),
  ],
  build: {
    target: 'node16',
    rollupOptions: {
      external: function isExternal(id: string) {
        return !id.startsWith('.') && !path.isAbsolute(id);
      },
    },
    outDir: 'dist',
    lib: {
      entry: {
        index: './src/index.ts',
        config: './src/config/index.ts',
      },
      formats: ['cjs', 'es'],
    },
  },
});
