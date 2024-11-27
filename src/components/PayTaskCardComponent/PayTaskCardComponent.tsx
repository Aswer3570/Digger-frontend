import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useWebApp, useHapticFeedback } from '@vkruglikov/react-telegram-web-app'

import './PayTaskCardComponent.scss'
import { IPayTaskCardComponent } from '../../interfaces'
import StarIcon from '../../assets/star.svg'
import { useNotification } from '../../hooks/useNotification'
import NotificationComponent from '../NotificationComponent/NotificationComponent'
import socket from '../../socket/socketConnect'

const TaskCardComponent: React.FC<IPayTaskCardComponent> = ({ title, description, price }) => {
	const { t } = useTranslation()
	const { notification, showNotification } = useNotification()
	const webApp = useWebApp()
	const [impactOccurred, ,] = useHapticFeedback()

	const telegramId: number = import.meta.env.PROD ? webApp.initDataUnsafe.user?.id : import.meta.env.VITE_TEST_TELEGRAM_ID
	const isPremium: boolean = import.meta.env.PROD ? !!webApp.initDataUnsafe.user.is_premium : true

	useEffect(() => {
		socket.on('createInvoiceUpgrade', (createInvoiceUpgrade) => {

			webApp.openInvoice(createInvoiceUpgrade.invoiceLink, (status: string) => {
				if (status === "paid") {
					console.log('Платёж сработал')
				}
				else {
					console.log('Произошла ошибка')
				}
			})

			console.log(createInvoiceUpgrade)
		})

		socket.on('errorMessage', (errorMessage: { completed: boolean, taskId: number, description: string }) => {
			if (!errorMessage.completed) {
				showNotification(description)
			}
		})

		return () => {
			socket.off('createInvoiceUpgrade')
		}
	}, [])

	// Тут производим оплату
	function payTask() {
		impactOccurred('light')

		socket.emit('createInvoiceUpgrade', {
			telegramId: telegramId,
			title: title,
			description: description,
			cost: price,
			premium: isPremium
		})
	}

	return (
		<React.Fragment>
			<button
				className="pay-task-card"
				onClick={() => payTask()}
			>
				<StarIcon className="star__icon" />

				<div className="pay-task-card__wrapper">
					<div className="pay-task-card__block">
						<p className="pay-task-card__title">
							{ title }
						</p>

						<div className="pay-task-card__button">
							{ t('GET') }

							{/* { t('Purchased') } */}
						</div>
					</div>

					<p className="pay-task-card__description">
						{ description }
					</p>
				</div>
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