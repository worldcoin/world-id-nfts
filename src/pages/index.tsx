import cn from 'classnames'
import Image from 'next/image'
import { useEffect } from 'react'
import { Flows, Steps } from 'types'
import Icon from '../components/Icon'
import { Direct } from '@/scenes/Direct'
import WorldieNFT from '@/abi/WorldieNFT.abi'
import { QrScanner } from '@/scenes/QrScanner'
import mascot from '/public/images/mascot.png'
import { ClaimMethod } from '@/scenes/ClaimMethod'
import { Button, Link } from '../components/Button'
import { Confirmation } from '@/scenes/Confirmation'
import { useBackgroundPattern } from '@/lib/generate-pattern'
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import { AnimatedOutline } from '@/components/AnimatedOutline'
import { useAccount, useContractRead, useDisconnect } from 'wagmi'
import { FC, Fragment, memo, useCallback, useMemo, useRef, useState } from 'react'

export type ScreenType = 'intro' | 'name'

export const Main: FC = () => {
	const mainRef = useRef<HTMLDivElement>(null)
	const counterRef = useRef<HTMLDivElement>(null)

	const [step, setStep] = useState<Steps>(Steps.intro)
	const [flow, setFlow] = useState<Flows | null>(null)
	const [address, setAddress] = useState<string | null>(null)
	const [proof, setProof] = useState<ISuccessResult | null>(null)

	const { address: wagmiAddr } = useAccount()
	const { disconnect } = useDisconnect()

	useEffect(() => {
		if (!wagmiAddr) return

		setAddress(wagmiAddr)
		setStep(Steps.worldId)
		disconnect()
	}, [wagmiAddr, disconnect])

	const { data: nextTokenId, refetch: refreshNextTokenId } = useContractRead({
		address: process.env.NEXT_PUBLIC_CONTRACT_ADDR as `0x${string}`,
		functionName: 'nextTokenID',
		abi: WorldieNFT,
	})

	const claimedCount = useMemo(() => {
		if (!nextTokenId) return '??'

		return nextTokenId.sub(1).toString()
	}, [nextTokenId])

	useBackgroundPattern(mainRef)

	const handleIdkitVerify = useCallback((proof: ISuccessResult) => {
		setProof(proof)
		setStep(Steps.confirmation)
	}, [])

	const handleClaimConfirm = useCallback(() => {
		fetch('/api/mint', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ address, proof }),
		})

		setFlow(null)
		setStep(Steps.claimed)
		refreshNextTokenId()
	}, [address, proof, refreshNextTokenId])

	return (
		<Fragment>
			<main
				className={cn(
					'bg-repeat-x min-h-screen bg-sand bg-[length:400px]',
					'grid grid-rows-[auto_1fr_auto] gap-8'
				)}
				ref={mainRef}
			>
				<div className="flex items-center justify-between px-6 py-5 lg:px-28 lg:py-7 font-rubik">
					<Icon name="worldcoin" className="w-[164px] h-6" />

					<div className="hidden md:block">
						<Link
							href="https://worldies.fun/"
							className="flex items-center gap-3 text-grey-900 font-rubik"
							variant="flat"
							size="small"
						>
							<span>NFT art crafted by</span>

							<span className="flex items-center gap-1">
								<Icon name="3rd-web" className="w-5 h-5" />
								Art by Worldies NFT
							</span>

							<Icon name="external" className="w-6 h-6" />
						</Link>
					</div>
				</div>

				<div
					className={cn(
						'px-6 lg:px-28 xl:pl-40 2xl:pl-60 max-w-screen',
						'grid items-center place-self-center gap-6 lg:gap-x-24 lg:gap-y-24 2xl:gap-x-48',
						'lg:grid-cols-[4fr_6fr] lg:grid-rows-2 lg:grid-flow-row lg:auto-rows-min'
					)}
				>
					<div className="flex flex-col items-center lg:items-start lg:self-end gap-6 justify-center lg:col-span-1">
						<div className="bg-sand-300 text-grey-900 border border-sand-700 rounded-full px-4 py-2 font-rubik text-sm md:text-lg">
							ETH Tokyo 2023
						</div>

						<div className="grid gap-2 lg:block font-semibold text-center lg:text-left">
							<h1 className="text-4xl lg:text-6xl lg:inline">Worldie meets Worldcoin</h1>

							<span className="inline-block lg:text-xl text-grey-700 [vertical-align:top]">
								in Tokyo <Icon name="japan" className="w-6 h-6" noMask />
							</span>
						</div>

						{step === Steps.intro && (
							<Button
								className="flex gap-3 items-center w-full lg:w-auto justify-center"
								onClick={() => setStep(Steps.selectClaimMethod)}
							>
								<Icon name="wid-human" className="w-5 h-5" />
								Collect NFT with World ID
							</Button>
						)}

						{step == Steps.worldId && (
							<IDKitWidget
								app_id={process.env.NEXT_PUBLIC_WLD_APP_ID!}
								action="worldie-tokyo-23"
								signal={address!}
								onSuccess={handleIdkitVerify}
								autoClose
							>
								{({ open }) => (
									<AnimatedOutline className="w-full lg:w-auto from-grey-300 to-blue">
										<Button className="w-full lg:w-auto" onClick={open}>
											Claim your NFT
										</Button>
									</AnimatedOutline>
								)}
							</IDKitWidget>
						)}

						{step === Steps.claimed && (
							<Button className="flex items-center gap-3 bg-success w-full justify-center lg:min-w-80">
								<span className="grid place-items-center w-5 h-5 bg-white rounded-full">
									<Icon name="check" className="w-2 h-2 text-success" />
								</span>
								Successfully Claimed
							</Button>
						)}
					</div>

					<div className="lg:place-self-start xl:place-self-center lg:col-start-2 lg:row-start-1 lg:row-span-2">
						<Image src={mascot} className="w-full lg:max-w-[80vh] lg:h-full aspect-square" alt="" />
					</div>

					<div className="justify-self-center lg:justify-self-start lg:self-start lg:col-start-1 lg:row-start-2">
						<div className="flex flex-col items-center p-4 bg-sand border border-sand-700 rounded-lg text-grey-900">
							<span className="lg:text-xl font-rubik">Claimed</span>

							<div className="flex items-stretch font-semibold text-xl lg:text-3xl">
								<div
									key={claimedCount}
									className={cn('relative overflow-hidden')}
									style={{
										width: `${claimedCount.toString().length}ch`,
									}}
									ref={counterRef}
								>
									<span className="absolute top-0 bottom-0 right-0 animate-counter-prev">
										{claimedCount}
									</span>

									<span className="absolute top-0 bottom-0 right-0 translate-y-full animate-counter-current">
										{claimedCount}
									</span>
								</div>
								/<span>100</span>
							</div>
						</div>
					</div>
				</div>

				<div className="px-6 py-5 lg:px-28 lg:py-7 font-rubik text-xs text-center lg:text-left lg:text-sm text-grey-900">
					All rights reserved by Worldcoin and Thirdweb Studio ©{new Date().getFullYear()}
				</div>
			</main>

			<ClaimMethod
				address={address}
				flow={flow}
				setAddress={setAddress}
				setFlow={setFlow}
				setStep={setStep}
				step={step}
			/>

			<Direct
				address={address}
				flow={flow}
				setAddress={setAddress}
				setFlow={setFlow}
				setStep={setStep}
				step={step}
			/>

			<Confirmation
				address={address}
				flow={flow}
				setAddress={setAddress}
				setFlow={setFlow}
				setStep={setStep}
				step={step}
				onConfirm={handleClaimConfirm}
			/>

			<QrScanner
				address={address}
				flow={flow}
				setAddress={setAddress}
				setFlow={setFlow}
				setStep={setStep}
				step={step}
			/>
		</Fragment>
	)
}

export default memo(Main)
