import React, { useState, useEffect } from 'react'
import { useWebApp, useHapticFeedback } from '@vkruglikov/react-telegram-web-app'
import { useTranslation } from 'react-i18next'

import './TaskCardComponent.scss'
import PremiumStarIcon from '../../assets/premium_star.svg'
import { ITaskCardComponent, ITaskInitialStatus } from '../../interfaces'
import { useNotification } from '../../hooks/useNotification'
import NotificationComponent from '../NotificationComponent/NotificationComponent'
import socket from '../../socket/socketConnect'
import { useData } from '../../hooks/useData'

const TaskCardComponent: React.FC<ITaskCardComponent> = ({ title, price, premium, icon, taskStatus, taskId, url, onIdCompletionTask }) => {
	const { t } = useTranslation()
	const webApp = useWebApp()
	const { notification, showNotification } = useNotification()
	const [impactOccurred, ,] = useHapticFeedback()
	const { playerData, setPlayerData } = useData()

	const telegramId: number = import.meta.env.PROD ? webApp.initDataUnsafe.user?.id : import.meta.env.VITE_TEST_TELEGRAM_ID
	const isPremium: boolean = import.meta.env.PROD ? !!webApp.initDataUnsafe.user.is_premium : true

	const initialStatus: ITaskInitialStatus = {
		state: taskStatus === 'completed' ? 'completed' : 'start',
		taskId
	}

	const [statusButton, setStatusButton] = useState<{ [key: number]: ITaskInitialStatus }>({
		[taskId]: initialStatus
	})

	useEffect(() => {
		if (!statusButton[taskId]) {
			setStatusButton((prevStatus) => ({
				...prevStatus,
				[taskId]: initialStatus,
			}))
		}
	}, [taskId, statusButton, initialStatus])

	useEffect(() => {
		socket.on('checkTask', (checkTask: { completed: boolean, taskId: number, description: string }) => {
			if (checkTask.completed) {
				onIdCompletionTask(checkTask.taskId)
				setStatusButton((prevStatus) => ({
					...prevStatus,
					[checkTask.taskId]: { state: 'completed', taskId: checkTask.taskId }
				}))

				socket.emit('getPlayerData', { telegramId, premium })
			} else {
				setStatusButton((prevStatus) => ({
					...prevStatus,
					[checkTask.taskId]: { state: 'fail', taskId: checkTask.taskId }
				}))

				setTimeout(() => {
					setStatusButton((prevStatus) => ({
						...prevStatus,
						[checkTask.taskId]: initialStatus
					}))
				}, 5000)

				showNotification(checkTask.description)
			}
		})

		socket.on('errorMessage', (errorMessage: { completed: boolean, taskId: number, description: string }) => {
			if (!errorMessage.completed) {
				setStatusButton((prevStatus) => ({
					...prevStatus,
					[errorMessage.taskId]: { state: 'fail', taskId: errorMessage.taskId }
				}))

				setTimeout(() => {
					setStatusButton((prevStatus) => ({
						...prevStatus,
						[errorMessage.taskId]: initialStatus
					}))
				}, 5000)
			}
		})

		socket.on('getPlayerData', (playerData) => {
			setPlayerData(playerData)
		})

		return () => {
			socket.off('checkTask')
			socket.off('getPlayerData')
		}
	}, [url, onIdCompletionTask])

	function openLink(telegramUrl: string): void {
		if (webApp.isAvailable) {
			webApp.openTelegramLink(telegramUrl)
		} else {
			window.open(telegramUrl, '_blank', 'noopener,noreferrer')
		}
	}

	function taskCompletion(): void {
		impactOccurred('light')

		if ((premium && isPremium) || (!premium && isPremium) || (!premium && !isPremium)) {
			const currentStatus = statusButton[taskId].state
			if (currentStatus === 'start') {
				setStatusButton((prevStatus) => ({
					...prevStatus,
					[taskId]: { state: 'wait', taskId }
				}))

				setTimeout(() => setStatusButton((prevStatus) => ({
					...prevStatus,
					[taskId]: { state: 'claim', taskId }
				})), 5000)

				openLink(url)
			}

			if (currentStatus === 'claim') {
				setStatusButton((prevStatus) => ({
					...prevStatus,
					[taskId]: { state: 'wait', taskId }
				}))

				socket.emit('checkTask', { telegramId: telegramId, taskId: taskId, premium: isPremium, actualAttempts: playerData ? playerData.attempts + price : null })
			}
		} else {
			showNotification(t("You don't have a Telegram Premium"))
		}
	}

	function getButtonTitle(): string {
		switch (statusButton[taskId]?.state) {
			case 'wait':
				return t('Wait')
			case 'claim':
				return t('Claim')
			case 'fail':
				return t('Fail')
			case 'completed':
				return t('Done')
			default:
				return t('Start')
		}
	}

	return (
		<React.Fragment>
			<button
				className={`task-card ${premium ? 'task-card--premium' : ''} ${taskStatus === 'completed' ? 'task-card--completed' : ''}`}
				onClick={() => taskCompletion()}
			>
				<img src={icon} className="task-card__avatar" alt="avatar" />

				<div className="task-card__block">
					<p className="task-card__title">
						{ title }
					</p> 

					<p className="task-card__reward">
						+{ price } extra attempts
					</p>
				</div>

				<div className={`task-card__button ${taskStatus === 'completed' ? 'task-card__button--completed' : ''} ${statusButton[taskId]?.state === 'claim' ? 'task-card__button--claim' : ''} ${statusButton[taskId]?.state === 'fail' ? 'task-card__button--fail' : ''}`}>
					{ getButtonTitle() }
				</div>

				{
					premium &&
						<div className={`task-card__premium-wrapper ${taskStatus === 'completed' ? 'task-card__premium-wrapper--completed' : ''}`}>
							<PremiumStarIcon className="task-card__premium-star-icon" />
						</div>
				}
			</button>

			{
				notification && (
					<NotificationComponent
						description={notification.description}
					/>
				)
			}
		</React.Fragment>
	)
}

export default TaskCardComponent