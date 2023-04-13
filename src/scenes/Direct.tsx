import { useCallback } from 'react'
import { Form } from '@/components/Form'
import { Modal } from '@/components/Modal'
import { Flows, SceneProps, Steps } from 'types'

export function Direct({ step, setStep, flow, setFlow, address, setAddress }: SceneProps) {
	const handleBack = useCallback(() => {
		setFlow(null)
		setStep(Steps.selectClaimMethod)
	}, [setFlow, setStep])

	const handleSubmit = useCallback(
		(address: string) => {
			setAddress(address)
			setStep(Steps.worldId)
		},
		[setAddress, setStep]
	)

	return (
		<Modal open={step === Steps.flow && flow === Flows.direct} onBack={handleBack} title="Claim your Worldie">
			<Form onSubmit={handleSubmit} variant="input" address={address} />
		</Modal>
	)
}
