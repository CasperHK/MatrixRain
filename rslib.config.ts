import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2022',
      dts: true,
      bundle: true,
    },
    {
      format: 'cjs',
      syntax: 'es2022',
      dts: false,
      bundle: true,
    },
  ],
  source: {
    entry: {
      index: './src/index.ts',
    },
  },
});
