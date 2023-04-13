import cn from 'classnames'
import { PropsWithChildren } from 'react'

export function AnimatedOutline({ children, className }: PropsWithChildren<{ className?: string }>) {
	return (
		<div className={cn('relative p-0.5 rounded-full overflow-clip', className)}>
			<span className="absolute inset-0  bg-[var(--tw-gradient-from)]" />
			<span className="absolute inset-0  bg-[var(--tw-gradient-to)] animate-outline" />

			<div className="relative p-0.5 bg-sand-300 rounded-[inherit]">{children}</div>
		</div>
	)
}
