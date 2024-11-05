import { Link } from 'react-router-dom'
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app'

import './FooterComponent.scss'
import HomeIcon from '../../assets/home.svg'
import FamilyStarIcon from '../../assets/family_star.svg'
import TakeoutDiningIcon from '../../assets/takeout_dining.svg'

function FooterComponent() {
	const [impactOccurred, ,] = useHapticFeedback()

	function locationReturn(pathname: string): string {
		return location.pathname === pathname ? 'footer__link--active' : ''
	}

	function vibration(): void {
		impactOccurred('light')
	}

	return (
		<div className="footer">
			<Link
				to="/tasks"
				className={`footer__link ${locationReturn('/tasks')}`}
				onClick={() => vibration()}
			>
				<TakeoutDiningIcon className="footer__takeout-dining-icon" />
			</Link>

			<Link
				to="/"
				className={`footer__link ${locationReturn('/')}`}
				onClick={() => vibration()}
			>
				<HomeIcon className="footer__home-icon" />
			</Link>

			<Link
				to="/invitation"
				className={`footer__link ${locationReturn('/invitation')}`}
				onClick={() => vibration()}
			>
				<FamilyStarIcon className="footer__family-star-icon" />
			</Link>
		</div>
	)
}

export default FooterComponent