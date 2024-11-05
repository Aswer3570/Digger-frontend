import './NotificationComponent.scss'
import { INotificationComponent } from '../../interfaces'
import InfoIcon from '../../assets/info.svg'

const NotificationComponent: React.FC<INotificationComponent> = ({ description }) => {
	return (
		<div className="tooltip">
			<div className="tooltip__content">
				<InfoIcon className="tooltip__info-icon" />

				<p className="tooltip__content-description">
					{ description }
				</p>
			</div>
		</div>
	)
}

export default NotificationComponent