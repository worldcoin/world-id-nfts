import { RefObject, useEffect } from 'react'

export function useBackgroundPattern(ref: RefObject<HTMLDivElement>) {
	useEffect(() => {
		if (ref.current) {
			const img = '/images/bg.svg'
			const size = 400
			const yMultiplier = 3.5
			const count = Math.round((window.innerHeight / size) * yMultiplier) + 2

			const images = new Array(count)
				.fill(0)
				.map((_, i) => `url("${img}")`)
				.join(',')

			const positions = new Array(count)
				.fill(0)
				.map((_, i) => `${((i - 1) * size) / 2}px ${((count - i - 2) * size) / yMultiplier}px`)
				.join(',')

			ref.current.style.cssText = `
        background-image: ${images};
        background-position: ${positions};
        background-repeat: x;
        background-size: ${size}px;
        background-attachment: fixed;
      `
		}
	}, [ref])
}
