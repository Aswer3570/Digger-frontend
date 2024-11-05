import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import wasm from 'vite-plugin-wasm'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svgr({include: '**/*.svg'}),
		react(),
		wasm(),
		nodePolyfills({
			include: ['buffer', 'crypto']
		})
	],
})