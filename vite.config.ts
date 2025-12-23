import { defineConfig } from 'vite';
import { builtinModules } from 'module';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkgPath = join(__dirname, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, { encoding: 'utf-8' }));

export default defineConfig({
  build: {
    // SSR build for a Node server entry
    ssr: 'main.ts',
    outDir: 'dist',
    target: 'node18',
    rollupOptions: {
      // keep only Node builtins external; bundle project dependencies
      external: [...builtinModules],
      output: {
        // Emit ESM so `node` can run it when package.json has `type: "module"`
        format: 'esm',
        entryFileNames: '[name].js',
      },
    },
  },
  // For SSR builds, ensure deps from package.json are NOT externalized
  ssr: {
    noExternal: Object.keys(pkg.dependencies || {}),
  },
});
