import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // Der Gemini-Schlüssel wird absichtlich NICHT mehr in den Browser-Code eingebaut.
      // Er steht nur noch serverseitig in public/zasebno/config.php.
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
