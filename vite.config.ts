import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    https:{
      key:'./.cert/privkey3.pem',
      cert: './.cert/cert3.pem'
    }
  },
  plugins: [react()],
})
