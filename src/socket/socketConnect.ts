import { io } from 'socket.io-client'

const URL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL_ADDRESS : import.meta.env.VITE_BACKEND_LOCAL_ADDRESS
// const PATH = import.meta.env.PROD ? '/api/socket.io' : ''
const PATH = import.meta.env.PROD ? '' : ''
// const PATH = import.meta.env.PROD ? 'https://1b7a-46-49-42-76.ngrok-free.app' : 'https://1b7a-46-49-42-76.ngrok-free.app'

const socket = io(URL, {
	path: PATH,
	reconnection: true,
	extraHeaders: {
		'ngrok-skip-browser-warning': 'true'
	}
})

export default socket