import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // порт задан явно: без этого Vite берёт 5173 по умолчанию, а если он
    // занят — молча уходит на следующий свободный, и адрес меняется
    port: 5193,
  },
});
