import { useEffect, useState, useRef } from 'react'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import { useNavigate } from 'react-router-dom'

import './Home.scss'
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import GenerateBTCComponent from '../../components/GenerateBTCComponent/GenerateBTCComponent'
import { useData } from '../../hooks/useData'
import { ExtendedBitcoinAddressData } from '../../interfaces'
import socket from '../../socket/socketConnect'
import { getFormattedDate } from '../../functions/functions'
import { useNotification } from '../../hooks/useNotification'
import NotificationComponent from '../../components/NotificationComponent/NotificationComponent'

function Home() {
	const webApp = useWebApp()
	const { setPlayerData, playerData } = useData()
	const timerRef = useRef<NodeJS.Timeout | null>(null)
	const { notification, showNotification } = useNotification()
	const navigate = useNavigate()
	
	const telegramId: number = import.meta.env.PROD 
		? webApp.initDataUnsafe.user?.id 
		: import.meta.env.VITE_TEST_TELEGRAM_ID
		
	const isPremium: boolean = import.meta.env.PROD 
		? webApp.initDataUnsafe.user.is_premium 
		: true
		
	const [attemptsLeft, setAttemptsLeft] = useState<number>(0)

	useEffect(() => {
		if (playerData?.attempts !== undefined) {
			setAttemptsLeft(playerData.attempts)
		}
	}, [playerData?.attempts])

	function handleAddressData(data: ExtendedBitcoinAddressData): void {
		setAttemptsLeft(data.attempts)

		if (timerRef.current) {
			clearTimeout(timerRef.current)
		}
		
		timerRef.current = setTimeout(() => {
			const lastClickResult = {
				telegramId: telegramId,
				attempts: data.attempts,
				lastAddress: data.address,
				compressedWif: data.compressedWif,
				uncompressedWif: data.uncompressedWif,
				rawPrivateKey: data.privateKey,
				lastGameDate: getFormattedDate()
			}

			socket.emit('playerClicked', lastClickResult)
		}, 600)
	}

	useEffect(() => {
		const fetchPlayerData = () => {
			socket.emit('getPlayerData', { telegramId, isPremium })
		}

		fetchPlayerData()
		
		socket.on('getPlayerData', (playerData) => {
			setPlayerData(playerData)

			if (playerData.error) {
				showNotification(playerData.error)
				navigate('/error')
			}

			if (playerData.ban) {
				navigate('/ban')
			}

			if (playerData.gameOver) {
				navigate('/game-over')
			}
		})

		return () => {
			socket.off('getPlayerData')
		}
	}, [telegramId, isPremium])

	useEffect(() => {
		if (!playerData?.maximumAttempts) return

		const intervalId = setInterval(() => {
			if (attemptsLeft < playerData.maximumAttempts) {
				setAttemptsLeft(prevAttempts => Math.min(prevAttempts + 1, playerData.maximumAttempts))
			}
		}, 1000)

		return () => clearInterval(intervalId)
	}, [attemptsLeft, playerData?.maximumAttempts])

	return (
		<>
			<main className="home">
				<HeaderComponent
					attempts={attemptsLeft}
					maximumAttempts={playerData?.maximumAttempts}
				/>

				<GenerateBTCComponent
					attempts={attemptsLeft}
					maximumAttempts={playerData?.maximumAttempts!}
					onAddressGenerated={handleAddressData}
					lastAddress={playerData?.lastAddress!}
				/>
			</main>

			<FooterComponent />

			{
				notification && (
					<NotificationComponent
						description={notification.description}
					/>
				)
			}
		</>
	)
}

export default Home