export function getFormattedDate(): string {
	const date = new Date()

	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')

	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')
	const milliseconds = String(date.getMilliseconds()).padStart(3, '0') + '000'

	const timezoneOffset = -date.getTimezoneOffset()
	const sign = timezoneOffset >= 0 ? '+' : '-'
	const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0')
	const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0')

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}:${offsetMinutes}`
}

export function formatDate(dateString: string): string {
	const date: Date = new Date(dateString)

	const day: string = String(date.getDate()).padStart(2, '0')
	const month: string = String(date.getMonth() + 1).padStart(2, '0')
	const year: number = date.getFullYear()

	return `${day}.${month}.${year}`
}