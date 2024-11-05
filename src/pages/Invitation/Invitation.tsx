import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import { useNavigate } from 'react-router-dom'

import './Invitation.scss'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import ReferralBlockComponent from '../../components/ReferralBlockComponent/ReferralBlockComponent'
import FriendsBlockComponent from '../../components/FriendsBlockComponent/FriendsBlockComponent'
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import { useData } from '../../hooks/useData'
import socket from '../../socket/socketConnect'
import { useNotification } from '../../hooks/useNotification'
import NotificationComponent from '../../components/NotificationComponent/NotificationComponent'

function Invitation() {
	const webApp = useWebApp()
	const { t } = useTranslation()
	const { getFriends, setGetFriends } = useData()
	const { notification, showNotification } = useNotification()
	const navigate = useNavigate()

	const telegramId: number = import.meta.env.PROD ? webApp.initDataUnsafe.user?.id : import.meta.env.VITE_TEST_TELEGRAM_ID

	useEffect(() => {
		socket.emit('getFriends', { telegramId })

		socket.on('getFriends', (getFriends) => {
			setGetFriends(getFriends)

			if (getFriends.error) {
				showNotification(getFriends.error)

				navigate('/error')
			}
		})

		return () => {
			socket.off('getFriends')
		}
	}, [telegramId])

	return (
		<>
			<main className="invitation">
				<HeaderComponent
					title={t('Invitation')}
					description={t('By inviting friends, you increase the number of attempts by 100')}
				/>

				<ReferralBlockComponent
					referralCode={getFriends?.referralCode!}
				/>

				<FriendsBlockComponent
					friends={getFriends?.friends!}
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

export default Invitation