import React, { createContext, useState, useContext, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import {
	IDataContextType,
	IPlayerData,
	IGetFriends,
	IGetTasks,
	IGetUpgrades
} from '../interfaces'

const DataContext = createContext<IDataContextType | undefined>(undefined)

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [playerData, setPlayerData] = useState<IPlayerData | null>(null)
	const [getFriends, setGetFriends] = useState<IGetFriends | null>(null)
	const [getTasks, setGetTasks] = useState<IGetTasks[] | null>(null)
	const [getCompletedTasks, setGetCompletedTasks] = useState<number[] | null>(null)
	const [getUpgrades, setGetUpgrades] = useState<IGetUpgrades[] | null>(null)

	return (
		<DataContext.Provider value={{
			playerData,
			setPlayerData,

			getFriends,
			setGetFriends,

			getTasks,
			setGetTasks,

			getCompletedTasks,
			setGetCompletedTasks,

			getUpgrades,
			setGetUpgrades
		}}>
			{ children }
		</DataContext.Provider>
	)
}

export function useData() {
	const { t } = useTranslation()

	const context = useContext(DataContext)
	if (context === undefined) throw new Error(t('useData must be used within a DataProvider'))

	return context
}