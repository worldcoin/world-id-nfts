import { AbiCoder } from 'ethers'

const abi = new AbiCoder()

export const decode = <T>(type: string, encodedString: string): T => {
	return abi.decode([type], encodedString)[0]
}
