import Icon from './Icon'
import cn from 'classnames'
import { Button } from './Button'
import { validateAddress } from '@/lib/validate-address'
import { ChangeEvent, SyntheticEvent, useCallback, useRef, useState } from 'react'

export function Form({
	address,
	variant,
	onSubmit,
}: {
	variant: 'input' | 'confirmation'
	onSubmit?: (address: string) => void
	address: string|null
}) {
	const [valid, setValid] = useState(false)
	const formRef = useRef<HTMLFormElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleSubmit = useCallback(
		(e: SyntheticEvent<HTMLElement>) => {
			e?.preventDefault?.()

			if (variant === 'confirmation') return onSubmit?.(address!)

			const form = formRef.current
			const input = inputRef.current

			if (!form || !input || !form.checkValidity()) return

			onSubmit?.(input.value)
		},
		[onSubmit, address, variant]
	)

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValid(validateAddress(e.target.value))
	}, [])

	return (
		<form className="space-y-6 md:space-y-8" ref={formRef} onSubmit={handleSubmit}>
			<div className="relative">
				<input
					className={cn(
						'w-full border-2 border-grey-200 rounded-xl px-3 py-4 pr-11',
						'placeholder:text-grey-400',
						'shadow-xl shadow-transparent',
						'focus:shadow-grey-900/10',
						'read-only:!shadow-none read-only:bg-grey-100 read-only:border-transparent',
						'transition-shadow'
					)}
					placeholder={
						variant === 'input'
							? 'Provide ENS or wallet address'
							: `${address?.slice(0, 6)}...${address?.slice(-5)}`
					}
					readOnly={variant !== 'input'}
					ref={inputRef}
					onChange={handleChange}
					defaultValue={variant === 'input' ? address! : undefined}
				/>

				{valid && (
					<Icon name="check" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
				)}
			</div>

			<div className="flex items-start gap-4">
				<span className="w-10 h-10 grid place-items-center rounded-full bg-purple-secondary">
					<span className="w-5 h-5  grid place-items-center rounded-full bg-purple/40">
						<Icon name="info" className="w-2.5 h-2.5 text-purple" />
					</span>
				</span>

				<div className="font-rubik space-2">
					<h4 className="font-regular">Worldie NFT will live on Polygon chain</h4>

					<p className="text-sm text-grey-500">Polygon wallet address starts with 0x</p>
				</div>
			</div>

			<Button variant="modal" onClick={handleSubmit} className="w-full" disabled={variant === 'input' && !valid}>
				Submit
			</Button>
		</form>
	)
}
