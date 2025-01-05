import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const loadedEnv = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    define: {
      STRIPE_PK: JSON.stringify(loadedEnv.VITE_STRIPE_API_PK),
      STRIPE_SK: JSON.stringify(loadedEnv.VITE_STRIPE_API_SK),
    },
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
