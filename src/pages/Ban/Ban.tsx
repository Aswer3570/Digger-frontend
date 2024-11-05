import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './Ban.scss'
import angryEmojiImage from '../../assets/angry_emoji.webp'
import { FEEDBACK_BOT_LINK } from '../../const'

function Ban() {
	const { t } = useTranslation()

	return (
		<main className="ban">
			<div className="ban__wrapper">
				<img src={angryEmojiImage} className="ban__angry-emoji-image" alt="Angry Emoji" />

				<div className="ban__container">
					<h1 className="ban__title">
						{ t('You have been blocked') }
					</h1>

					<p className="ban__description">
						{ t('We have noticed some unfair play in your actions, so we have blocked you. If we made a mistake, please contact us, we will sort everything out in a short time') }
					</p>
				</div>
			</div>

			<Link to={`//t.me/${FEEDBACK_BOT_LINK}`} className="ban__feedback-link">
				{ t('Write to us') }
			</Link>
		</main>
	)
}

export default Ban