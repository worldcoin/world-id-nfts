import { FC } from 'react'
import '../styles/styles.css'
import { WagmiConfig } from 'wagmi'
import { AppProps } from 'next/app'
import { createClient } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const client = createClient(
	getDefaultClient({
		chains: [polygon],
		appName: 'Worldie NFTs',
		infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
	})
)

const App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider>
				<Component {...pageProps} />
			</ConnectKitProvider>
		</WagmiConfig>
	)
}

export default App
