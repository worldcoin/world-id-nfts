import { decode } from '@/lib/wld'
import { Contract, providers } from 'ethers'
import WorldieNFT from '@/abi/WorldieNFT.abi'
import { Relayer } from 'defender-relay-client'
import { ISuccessResult } from '@worldcoin/idkit'
import { NextApiRequest, NextApiResponse } from 'next'

type Request = {
	address: string
	proof: ISuccessResult
}

const relayer = new Relayer({
	apiKey: process.env.OZ_KEY!,
	apiSecret: process.env.OZ_SECRET!,
})

const rpc = new providers.InfuraProvider(137, process.env.NEXT_PUBLIC_INFURA_ID)

const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDR!, WorldieNFT, rpc)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') return res.status(405).end()

	const { address, proof }: Request = req.body
	if (!address || !proof) return res.status(400).end()

	const call = await contract.populateTransaction.mint(
		address,
		decode<BigInt>('uint256', proof.merkle_root),
		decode<BigInt>('uint256', proof.nullifier_hash),
		decode<BigInt[]>('uint256[8]', proof.proof)
	)

	const tx = await relayer.sendTransaction({
		data: call.data,
		gasLimit: 500_000,
		to: process.env.NEXT_PUBLIC_CONTRACT_ADDR,
	})

	return res.status(200).send(tx.hash)
}

export default handler
