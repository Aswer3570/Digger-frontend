import { useWebApp, useHapticFeedback } from '@vkruglikov/react-telegram-web-app'
import { useTranslation } from 'react-i18next'

import './HeaderComponent.scss'
import { IHeaderComponent } from '../../interfaces'
import BoltIcon from '../../assets/bolt.svg'
import PremiumStarIcon from '../../assets/premium_star.svg'
import { PREMIUM_BOT_LINK } from '../../const'

const HeaderComponent: React.FC<IHeaderComponent> = ({ title, description, attempts, maximumAttempts }) => {
	const { t } = useTranslation()
	const webApp = useWebApp()
	const [impactOccurred, ,] = useHapticFeedback()

	const isPremium: boolean = import.meta.env.PROD ? webApp.initDataUnsafe.user.is_premium ? true : false : true

	function openPremiumBot(): void {
		if (!isPremium) {
			window.open(PREMIUM_BOT_LINK)

			impactOccurred('light')
		}
	}

	return (
		<header className="header">
			{
				!title && !description ?
					<div className="header__meter-wrapper">
						<BoltIcon className="header__bolt-icon" /> { attempts } <span className="header__meter-max">/{ maximumAttempts }</span>
					</div>
					:
					<div className="header__tab-wrapper" onClick={() => openPremiumBot()}>
						<div className="header__tab-container">
							<h1 className="header__tab-title">
								{ title }
							</h1>

							<div className="header__tab-premium-wrapper">
								<p className="header__tab-premium-title">
									{
										isPremium ? 
											t('Premium')
											:
											t('Get Premium')
									}
								</p>

								<div className={`header__tab-premium-star-block ${!isPremium ? 'header__tab-premium-star-block--premium' : ''}`}>
									<PremiumStarIcon className="header__tab-premium-star-icon" />
								</div>
							</div>
						</div>

						<p className="header__tab-description">
							{ description }
						</p>
					</div>
			}
		</header>
	)
}

export default HeaderComponent