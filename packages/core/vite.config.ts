/// <reference types="vitest" />
import path from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  test: {
    globals: true,
    clearMocks: true,
  },
  plugins: [dts()],
  build: {
    target: 'node16',
    rollupOptions: {
      external: function isExternal(id: string) {
        return !id.startsWith('.') && !path.isAbsolute(id);
      },
    },
    outDir: 'dist',
    lib: {
      entry: './src/index.ts',
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
  },
});
