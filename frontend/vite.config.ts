import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Main-Webpage/',
  plugins: [react()],
  
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
