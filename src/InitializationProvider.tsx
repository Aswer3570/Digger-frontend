import { useEffect, ReactNode } from 'react'
import { useWebApp, useExpand } from '@vkruglikov/react-telegram-web-app'

import Error from './pages/Error/Error'
import NoSupport from './pages/NoSupport/NoSupport'

const InitializationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const webApp = useWebApp()
	const [isExpanded, expand] = useExpand()

	useEffect(() => {
		webApp.setHeaderColor('#1c272a')
	}, [])

	if (!webApp || (import.meta.env.PROD && !webApp?.initDataUnsafe?.user?.id)) {
		return <Error />
	}

	webApp.ready()

	if (!isExpanded) {
		expand()
	}

	if (webApp?.platform !== 'ios' && webApp.platform !== 'android' && (import.meta.env.PROD || webApp.platform !== 'unknown')) {
		return <NoSupport />
	}

	return (
		<>
			{ children }
		</>
	)
}

export default InitializationProvider