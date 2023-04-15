import cn from 'classnames'
import { PropsWithChildren } from 'react'

export function AnimatedOutline({ children, className }: PropsWithChildren<{ className?: string }>) {
	return (
		<div className={cn('relative p-0.5 rounded-full animate-outline', className)}>
			<div className="relative p-0.5 bg-sand-300 rounded-[inherit] opacity-100">{children}</div>
		</div>
	)
}
