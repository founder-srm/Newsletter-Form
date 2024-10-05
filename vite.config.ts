import MillionLint from '@million/lint';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [MillionLint.vite(), react()],
})
