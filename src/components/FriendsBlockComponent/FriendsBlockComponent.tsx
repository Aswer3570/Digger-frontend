import { useTranslation } from 'react-i18next'

import './FriendsBlockComponent.scss'
import CheckIcon from '../../assets/check.svg'
import BoltIcon from '../../assets/bolt.svg'
import { IFriendsBlockComponent } from '../../interfaces'
import { formatDate } from '../../functions/functions'

const FriendsBlockComponent: React.FC<IFriendsBlockComponent> = ({ friends }) => {
	const { t } = useTranslation()

	return (
		<div className="friends-block">
			<h2 className="friends-block__title">
				{ friends.length } { t('Friends Invited') }
			</h2>

			<div className="friends-block__wrapper">
				{
					friends.length > 0 ? (
						friends.map((friend, index) => (
							<div className="friends-block__invited" key={index}>
								<CheckIcon className="friends-block__invited-check-icon" />

								<div className="friends-block__invited-wrapper">
									<p className="friends-block__invited-name">
										{ friend.name }
									</p>

									<p className="friends-block__invited-date">
										{ formatDate(friend.invitationDate) }
									</p>
								</div>

								<div className="friends-block__invited-reward">
									<BoltIcon className="friends-block__invited-bolt-icon" />

									<p className="friends-block__invited-reward-number">
										{ friend.reward }
									</p>
								</div>
							</div>
						))
					) : (
						<div className="friends-block__empty-wrapper">
							<p className="friends-block__empty">
								{ t("It's empty here for now") }
							</p>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default FriendsBlockComponent