import { useTranslation } from 'react-i18next'

import './GameOver.scss'
import happyEmojiImage from '../../assets/happy_emoji.webp'

function GameOver() {
	const { t } = useTranslation()

	return (
		<main className="game-over">
			<div className="game-over__wrapper">
				<img src={happyEmojiImage} className="game-over__happy-emoji-image" alt="Happy Emoji" />

				<div className="game-over__container">
					<h1 className="game-over__title">
						{ t('Game over!') }
					</h1>

					<p className="game-over__description">
						{ t('Someone was able to find a winning combination and take their Bitcoins') }
					</p>
				</div>
			</div>

			<p className="game-over__ps">
				{ t('Until next time, friends!') }
			</p>
		</main>
	)
}

export default GameOver