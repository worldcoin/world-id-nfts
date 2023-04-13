import { SceneProps, Steps } from 'types'
import { Form } from '../components/Form'
import { Modal } from '@/components/Modal'

export function Confirmation({ step, setStep, address, onConfirm }: SceneProps & { onConfirm: () => void }) {
	return (
		<Modal
			open={step === Steps.confirmation}
			onBack={() => {
				setStep(Steps.flow)
			}}
		>
			<Form variant={'confirmation'} address={address} onSubmit={onConfirm} />
		</Modal>
	)
}
