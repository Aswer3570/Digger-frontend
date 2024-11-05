import { useTranslation } from 'react-i18next'

import './NoSupport.scss'
import QrCodeIcon from '../../assets/qr-code.svg'

function NoSupport() {
	const { t } = useTranslation()

	return (
		<main className="no-support">
			<h1 className="no-support__title">
				{ t('Desktop not supported') }
			</h1>

			<p className="no-support__description">
				{ t('Use a mobile device') }
			</p>

			<div className="no-support__qr-wrapper">
				<QrCodeIcon className="no-support__qr-code-icon" />
			</div>
		</main>
	)
}

export default NoSupport