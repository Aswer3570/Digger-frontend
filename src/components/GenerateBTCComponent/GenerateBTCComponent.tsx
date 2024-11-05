import { useState, useEffect } from 'react'
import * as bitcoin from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1'
import ECPairFactory from 'ecpair'
import { Buffer } from 'buffer'
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app'
import { useTranslation } from 'react-i18next'

import './GenerateBTCComponent.scss'
import ArrowsIcon from '../../assets/arrows.svg'
import { BitcoinAddressData, IGenerateBTCComponent, ExtendedBitcoinAddressData } from '../../interfaces'
import { BITCOIN_ADDRESS } from '../../const'

window.Buffer = Buffer

bitcoin.initEccLib(ecc)
const ECPair = ECPairFactory(ecc)

const GenerateBTCComponent: React.FC<IGenerateBTCComponent> = ({ attempts, maximumAttempts, onAddressGenerated, lastAddress }) => {
	const { t } = useTranslation()
	const [impactOccurred, ,] = useHapticFeedback()

	const [addressData, setAddressData] = useState<BitcoinAddressData | null>(null)
	const [targetAddress, _] = useState<string>(BITCOIN_ADDRESS)
	const [matchAddress, setMatchAddress] = useState<boolean>(false)
	const [attemptsLeft, setAttemptsLeft] = useState<number>(attempts)
	const [widthPercentage, setWidthPercentage] = useState<number>(100)

	useEffect(() => {
		setAttemptsLeft(attempts)
	}, [attempts])

	function generateAddress(): void {
		const keyPair = ECPair.makeRandom()
		const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })

		setAttemptsLeft(prevAttempts => {
			const newAttemptsLeft = prevAttempts - 1

			const addressData: ExtendedBitcoinAddressData = {
				address: address!,
				compressedWif: keyPair.toWIF(),
				uncompressedWif: ECPair.fromPrivateKey(keyPair.privateKey!, { compressed: false }).toWIF(),
				privateKey: Buffer.from(keyPair.privateKey!).toString('hex'),
				attempts: newAttemptsLeft
			}

			setTimeout(() => {
				setAddressData(addressData)
				onAddressGenerated(addressData)

				if (addressData.address === targetAddress) {
					// Потом удалить
					console.log('Поздравляем! Вы нашли целевой адрес!')

					setMatchAddress(true)
				}

				impactOccurred('light')
			}, 0)

			return newAttemptsLeft
		})
	}

	useEffect(() => {
		setWidthPercentage((attemptsLeft / maximumAttempts) * 100)
	}, [attemptsLeft, maximumAttempts])

	return (
		<div className="generate">
			<div className="generate__wrapper">
				<div className="generate__target-wrapper">
					<p className="generate__target-title">
						{ t('Target Address') }
					</p>

					<div className="generate__target-address">
						{ BITCOIN_ADDRESS }
					</div>
				</div>

				<ArrowsIcon className="generate__arrows-icon" />

				<div className="generate__last-wrapper">
					<p className={`generate__last-address ${matchAddress ? 'generate__last-address--active' : ''}`}>
						{ addressData ? addressData.address : lastAddress }
					</p>

					<div className="generate__last-container">
						<div className="generate__last-block">
							{ t('Compressed Wif') }

							{
								!matchAddress ?
									<div className="generate__last-block-hidden"></div>
									:
									<p className="generate__last-block-address">
										{ addressData?.compressedWif }
									</p>
							}
						</div>

						<div className="generate__last-block">
							{ t('Uncompressed Wif') }

							{
								!matchAddress ?
									<div className="generate__last-block-hidden"></div>
									:
									<p className="generate__last-block-address">
										{ addressData?.compressedWif }
									</p>
							}
						</div>

						<div className="generate__last-block">
							{ t('Raw Private Key') }

							{
								!matchAddress ?
									<div className="generate__last-block-hidden"></div>
									:
									<p className="generate__last-block-address">
										{ addressData?.privateKey }
									</p>
							}
						</div>
					</div>
				</div>
			</div>

			<button
				className="generate__button"
				onClick={() => generateAddress()}
				disabled={attempts <= 0}
			>
				<p className="generate__button-title">
					{ t('Generate') }
				</p>

				<div
					className="generate__button-line"
					style={{ width: `${widthPercentage}%` }}
				></div>
			</button>
		</div>
	)
}

export default GenerateBTCComponent