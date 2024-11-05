import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import dictionary from './dictionary.json'

const resources = {
	en: {
		translation: dictionary.en
	}
}

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: 'en',
		fallbackLng:'en'
	})

export default i18n