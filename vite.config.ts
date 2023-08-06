import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return devConfig();
  } else if (command === 'build') {
    return prodConfig();
  }
})

function devConfig() {
  return {
    plugins: [react()]
  }
}

function prodConfig() {
  return {
    plugins: [react()],
    base: '/hollywood-networks/'
  }
}
