import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') //searches for variables in .env file, cwd - current working directory
  const apiUrl = env.VITE_API_URL 

  return {
    plugins: [react()],
    server: {
      open: true,
      port: 7000,
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
