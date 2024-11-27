import { useTranslation } from 'react-i18next'

import './Upgrades.scss'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import PayTaskCardComponent from '../../components/PayTaskCardComponent/PayTaskCardComponent'
import { useData } from '../../hooks/useData'

function Upgrades() {
	const { t } = useTranslation()
	const { getUpgrades } = useData()

	// Тут получаем данные с бека и выводим их

	console.log(getUpgrades)

	return (
		<>
			<main className="upgrades">
				<HeaderComponent
					title={t('Upgrades')}
					description={t('Purchase upgrades to boost your mining speed or skip tasks and friend invitations altogether')}
				/>

				{
					!getUpgrades ?
						<div className="upgrades__empty-wrapper">
							<p className="upgrades__empty-title">
								{ t("It's empty here for now") }
							</p>
						</div>
					:
					<div className="upgrades__cards-wrapper">
						{
							getUpgrades.map((upgrade, index) => {
								return (
									<PayTaskCardComponent
										key={index}
										title={upgrade.title}
										description={upgrade.description}
										price={upgrade.cost}
									/>
								)
							})
						}
					</div>
				}
			</main>

			<FooterComponent />
		</>
	)
}

export default Upgrades