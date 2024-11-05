import { useTranslation } from 'react-i18next'

import './Error.scss'

function Error() {
	const { t } = useTranslation()

	function reloadApp(): void {
		window.location.href = '/'
	}

	return (
		<main className="error">
			<h1 className="error__title">
				{ t('An unknown error occurred') }
			</h1>

			<p className="error__description">
				{ t('It seems that the app has failed to load. Please check your connection just in case.') }
			</p>

			<button
				className="error__button"
				onClick={() => reloadApp()}
			>
				{ t('Reload App') }
			</button>
		</main>
	)
}

export default Error