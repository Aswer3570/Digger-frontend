declare module '*.svg' {
	import * as React from 'react'

	const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>

	export default ReactComponent
}

declare module "*.png"

/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BACKEND_URL_ADDRESS: string
	readonly VITE_BACKEND_LOCAL_ADDRESS: string
	readonly VITE_TEST_TELEGRAM_ID: number
	readonly VITE_TEST_INVITE_CODE: string
	readonly PROD: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}