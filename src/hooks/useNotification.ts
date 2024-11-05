import { useState, useCallback } from 'react'

import { NOTIFICATIOM_DURATION } from '../const'
import { UseNotificationType } from '../interfaces'

export function useNotification(duration = NOTIFICATIOM_DURATION): UseNotificationType {
	const [notification, setNotification] = useState<{description: string} | null>(null)

	const showNotification = useCallback((description: string) => {
		setNotification({ description })

		setTimeout(() => setNotification(null), duration)
	}, [duration])

	return {
		notification,
		showNotification
	}
}