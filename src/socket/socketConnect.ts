import { io } from 'socket.io-client'

const URL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL_ADDRESS : import.meta.env.VITE_BACKEND_LOCAL_ADDRESS
const PATH = import.meta.env.PROD ? '/api/socket.io' : ''

const socket = io(URL, {
	path: PATH,
	reconnection: true
})

export default socket