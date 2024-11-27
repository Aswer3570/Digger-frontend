import { useEffect } from 'react'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './Loading.scss'
import LoadingLogoIcon from '../../assets/loading_logo.svg'
import socket from '../../socket/socketConnect'
import { useNotification } from '../../hooks/useNotification'
import NotificationComponent from '../../components/NotificationComponent/NotificationComponent'
import { useData } from '../../hooks/useData'

function Loading() {
	const { t } = useTranslation()
	const webApp = useWebApp()
	const { setPlayerData, setGetFriends, setGetTasks, setGetCompletedTasks, setGetUpgrades } = useData()
	const { notification, showNotification } = useNotification()
	const navigate = useNavigate()

	const telegramId: number = import.meta.env.PROD ? webApp.initDataUnsafe.user?.id : import.meta.env.VITE_TEST_TELEGRAM_ID
	const inviteCode: string | null = import.meta.env.PROD ? webApp.initDataUnsafe.start_param || null : import.meta.env.VITE_TEST_INVITE_CODE
	const premium: boolean = import.meta.env.PROD ? webApp.initDataUnsafe.user.is_premium ? true : false : true

	useEffect(() => {
		socket.emit('getPlayerData', { telegramId, inviteCode, premium })
		socket.emit('getFriends', { telegramId })
		socket.emit('getTasks')
		socket.emit('getCompletedTasks', { telegramId })
		socket.emit('getUpgrades')

		socket.on('getPlayerData', (playerData) => {
			setPlayerData(playerData)

			// Потом удалить
			console.log(playerData)

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

		socket.on('getFriends', (getFriends) => {
			setGetFriends(getFriends)

			// Потом удалить
			console.log(getFriends)

			if (getFriends.error) {
				showNotification(getFriends.error)

				navigate('/error')
			}
		})

		socket.on('getTasks', (getTasks) => {
			setGetTasks(getTasks)

			// Потом удалить
			console.log(getTasks)

			if (getTasks.error) {
				showNotification(getTasks.error)

				navigate('/error')
			}
		})

		socket.on('getCompletedTasks', (getCompletedTasks) => {
			setGetCompletedTasks(getCompletedTasks)

			// Потом удалить
			console.log(getCompletedTasks)

			if (getCompletedTasks.error) {
				showNotification(getCompletedTasks.error)

				navigate('/error')
			}
		})

		socket.on('getUpgrades', (getUpgrades) => {
			setGetUpgrades(getUpgrades)

			// Потом удалить
			console.log(getUpgrades)

			if (getUpgrades.error) {
				showNotification(getUpgrades.error)

				navigate('/error')
			}
		})

		socket.on('connect_error', () => {
			showNotification(t('Error connecting to server'))

			navigate('/error')
		})

		socket.on('disconnect', () => {
			showNotification(t('Connection to the server was lost'))

			navigate('/error')
		})

		return () => {
			socket.off('getPlayerData')
			socket.off('getFriends')
			socket.off('getTasks')
			socket.off('getCompletedTasks')
			socket.off('getUpgrades')
			socket.off('connect_error')
			socket.off('disconnect')
		}
	}, [telegramId])

	return (
		<main className="loading">
			<LoadingLogoIcon className="loading__loading-logo-icon" />

			{
				notification && (
					<NotificationComponent
						description={notification.description}
					/>
				)
			}
		</main>
	)
}

export default Loading