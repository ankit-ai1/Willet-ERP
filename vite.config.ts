import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  server: { port: 5175, host: true },
  preview: { port: 4173 },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;
          if (/[\\/](motion|framer-motion|motion-dom|motion-utils|lenis)[\\/]/.test(id)) return 'motion';
          return 'vendor';
        },
      },
    },
  },
});
