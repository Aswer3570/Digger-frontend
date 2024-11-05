import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app'
import { useTranslation } from 'react-i18next'

import './ReferralBlockComponent.scss'
import CopyIcon from '../../assets/copy.svg'
import { BOT_LINK, INVITE_LINK_TEXT } from '../../const'
import { IReferralBlockComponent } from '../../interfaces'
import { useNotification } from '../../hooks/useNotification'
import NotificationComponent from '../../components/NotificationComponent/NotificationComponent'

const ReferralBlockComponent: React.FC<IReferralBlockComponent> = ({ referralCode }) => {
	const { t } = useTranslation()
	const { notification, showNotification } = useNotification()
	const [impactOccurred, ,] = useHapticFeedback()

	function copyInviteLink(): void {
		navigator.clipboard.writeText(`https://t.me/${BOT_LINK}/app?startapp=${referralCode}`).then(() => {
			impactOccurred('light')

			showNotification(t('Link copied to clipboard'))
		}).catch(error => {
			console.error(`${t('Error when trying to copy text:')} ${error}`)
		})
	}

	function openPopupInviteLink(): void {
		impactOccurred('light')

		window.open(`https://t.me/share/url?text=${INVITE_LINK_TEXT}&url=https://t.me/${BOT_LINK}?start=${referralCode}`)
	}

	return (
		<div className="referral-block">
			<p className="referral-block__title">
				{ t('Your Referral Link') }
			</p>

			<div className="referral-block__wrapper">
				<p className="referral-block__link">
					t.me/{ BOT_LINK }?start={ referralCode }
				</p>

				<button
					className="referral-block__copy-button"
					onClick={() => copyInviteLink()}
				>
					<CopyIcon className="referral-block__copy-icon" />
				</button>
			</div>

			<button
				className="referral-block__invite-button"
				onClick={() => openPopupInviteLink()}
			>
				{ t('Invite Friends') }
			</button>

			{
				notification && (
					<NotificationComponent
						description={notification.description}
					/>
				)
			}
		</div>
	)
}

export default ReferralBlockComponent