import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Invitation from './pages/Invitation/Invitation'
import Tasks from './pages/Tasks/Tasks'
import Upgrades from './pages/Upgrades/Upgrades'
import Loading from './pages/Loading/Loading'
import Error from './pages/Error/Error'
import GameOver from './pages/GameOver/GameOver'
import Ban from './pages/Ban/Ban'

function App() {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const initializeApp = async () => {
			await new Promise(resolve => setTimeout(resolve, 4000))

			setIsLoading(false)
		}

		initializeApp()
	}, [])

	if (isLoading) {
		return <Loading />
	}

	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>

			<Route
				path="/invitation"
				element={<Invitation />}
			/>

			<Route
				path="/upgrades"
				element={<Upgrades />}
			/>

			<Route
				path="/tasks"
				element={<Tasks />}
			/>

			<Route
				path="/error"
				element={<Error />}
			/>

			<Route
				path="/game-over"
				element={<GameOver />}
			/>

			<Route
				path="/ban"
				element={<Ban />}
			/>
		</Routes>
	)
}

export default App