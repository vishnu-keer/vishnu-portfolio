import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base stays default '/' so it works on Vercel at the domain root.
// Files in public/ (including images/) are copied verbatim into dist/.
export default defineConfig({
  plugins: [react()],
});
