import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        target: 'es2020',
        cssMinify: 'esbuild',
        rollupOptions: {
            output: {
                // Split the animation library out of the main bundle so first paint stays lean.
                manualChunks: {
                    motion: ['framer-motion'],
                },
            },
        },
    },
});
