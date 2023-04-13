import Icon from './Icon'
import cn from 'classnames'
import Image from 'next/image'
import mascot from 'public/images/mascot.png'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, PropsWithChildren, ReactNode } from 'react'

export function Modal({
	open,
	onClose,
	children,
	onBack,
	hideImage,
	title,
	description,
	classNameContainer,
	classNameToolbar,
	classNameBack,
	classNameClose,
	className,
	classNameTitle,
	classNameDescription,
}: PropsWithChildren<{
	open: boolean
	onClose?: () => void
	onBack?: () => void
	hideImage?: boolean
	title?: ReactNode
	description?: ReactNode
	classNameContainer?: string
	classNameToolbar?: string
	classNameBack?: string
	classNameClose?: string
	className?: string
	classNameTitle?: string
	classNameDescription?: string
}>) {
	return (
		<Transition show={open} as={Fragment}>
			<Dialog onClose={onBack ?? onClose ?? (() => {})}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div onClick={onBack ?? onClose} className="fixed inset-0 bg-grey-800/80 backdrop-blur-xl" />
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Dialog.Panel
						className={cn(
							'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl',
							'p-6 min-w-[min(400px,100vw-32px)] max-h-[calc(100vh-32px)]',
							'grid grid-rows-[1fr_auto]',
							classNameContainer
						)}
					>
						<div className={cn(classNameToolbar)}>
							{onBack && (
								<button
									className={cn(
										'grid place-content-center justify-self-start bg-grey-200 rounded-full p-1.5',
										classNameBack
									)}
									onClick={onBack}
								>
									<Icon name="arrow-left" className="w-6 h-6" />
								</button>
							)}

							{onClose && (
								<button
									className={cn(
										'grid place-content-center justify-self-end bg-grey-200 rounded-full p-1.5',
										classNameClose
									)}
									onClick={onClose}
								>
									<Icon name="close" className="w-6 h-6" />
								</button>
							)}
						</div>

						{!hideImage && <Image src={mascot} alt="" width={50} height={50} objectFit="contain" />}

						{(title || description) && (
							<div className="mt-4 text-center">
								{title && <h3 className={cn('text-xl', classNameTitle)}>{title}</h3>}

								{description && (
									<p className={cn('font-rubik text-gray-500', classNameDescription)}>
										{description}
									</p>
								)}
							</div>
						)}
						<div className={cn('mt-8', className)}>{children}</div>
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition>
	)
}
