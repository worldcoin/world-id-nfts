export function validateAddress(address: string): boolean {
	return /^(0x)?[0-9a-f]{40}$/i.test(address)
}
