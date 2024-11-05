import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app'

import './index.scss'
import App from './App.tsx'
import InitializationProvider from './InitializationProvider'
import { DataProvider } from './hooks/useData'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<DataProvider>
			<WebAppProvider options={{ smoothButtonsTransition: true	}}>
				<BrowserRouter>
					<InitializationProvider>
						<App />
					</InitializationProvider>
				</BrowserRouter>
			</WebAppProvider>
		</DataProvider>
	</StrictMode>
)