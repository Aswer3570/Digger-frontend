import { Dispatch, SetStateAction } from 'react'

export interface INotificationComponent {
	description: string
}

export interface IHeaderComponent {
	title?: string
	description?: string
	attempts?: number
	maximumAttempts?: number
}

export interface BitcoinAddressData {
	address: string
	compressedWif: string
	uncompressedWif: string
	privateKey: string
}

export type ExtendedBitcoinAddressData = BitcoinAddressData & {
	attempts: number
}

export interface IPlayerData {
	attempts: number
	maximumAttempts: number
	lastAddress: string
	compressedWif: string
	uncompressedWif: string
	rawPrivateKey: string
	ban: boolean
	lastGameDate: Date
	gameOver: boolean
	referralCode: string
}

export interface IGetTasks {
	id: number
	title: string
	icon: string
	price: number
	premium: boolean
	url: string
	numberExecutions: number
	show?: boolean
	type: 'link' | 'games_streak'
	parameters?: number | null
	taskStatus?: 'completed' | 'uncompleted'
}

export interface IDataContextType {
	playerData: IPlayerData | null
	setPlayerData: Dispatch<SetStateAction<IPlayerData | null>>

	getFriends: IGetFriends | null
	setGetFriends: Dispatch<SetStateAction<IGetFriends | null>>

	getTasks: IGetTasks[] | null
	setGetTasks: Dispatch<SetStateAction<IGetTasks[] | null>>

	getCompletedTasks: number[] | null
	setGetCompletedTasks: Dispatch<SetStateAction<number[] | null>>
}

export interface IGenerateBTCComponent {
	attempts: number
	maximumAttempts: number
	onAddressGenerated: (data: ExtendedBitcoinAddressData) => void
	lastAddress: string
}

export interface IGetFriends {
	referralCode: string,
	friends: { name: string, invitationDate: string, reward: number }[]
}

export interface IReferralBlockComponent {
	referralCode: string
}

export interface IFriendsBlockComponent {
	friends: { name: string, invitationDate: string, reward: number }[]
}

export interface ITaskCardComponent {
	title: string
	price: number
	premium: boolean
	icon: string
	taskStatus: 'completed' | 'uncompleted'
	taskId: number
	url: string
	onIdCompletionTask: (id: number) => void
}

export interface ITaskInitialStatus {
	state: 'start' | 'wait' | 'claim' | 'fail' | 'completed'
	taskId: number
}

export type UseNotificationType = {
	notification: { description: string } | null;
	showNotification: (description: string) => void;
}