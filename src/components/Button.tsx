import cn from 'classnames'
import { FC, memo, AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react'

type StyleProps = {
	variant?: 'default' | 'flat' | 'modal'
	size?: 'default' | 'small'
	animatedOutline?: boolean
}

type LinkProps = StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>
type ButtonProps = StyleProps & ButtonHTMLAttributes<HTMLButtonElement>

const getClassNames = (props: StyleProps & { className?: string }) => {
	const variant = props.variant || 'default'
	const size = props.size || 'default'

	return cn(
		'rounded-full',
		{
			'bg-orange text-white ': variant === 'default',
			'border border-sand-500 bg-sand text-black': variant === 'flat',
			'bg-grey-900 text-white disabled:bg-grey-100 disabled:text-grey-300 rounded-xl': variant === 'modal',
		},
		{
			'text-sm md:text-base px-8 py-4 md:px-10 md:py-6': size === 'default',
			'py-1.5 px-3 md:py-2 md:px-5 text-sm': size === 'small',
		},
		props.className
	)
}

export const Link = memo(({ className, variant, size, children, ...props }: LinkProps) => (
	<a {...props} className={getClassNames({ className, variant, size })}>
		{children}
	</a>
))
Link.displayName = 'Link'

export const Button: FC<ButtonProps> = ({ className, variant, size, children, ...props }) => (
	<button {...props} className={getClassNames({ className, variant, size })}>
		{children}
	</button>
)
