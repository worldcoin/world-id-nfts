import {
  w3mProvider,
  w3mConnectors,
  EthereumClient,
} from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import { polygon } from "wagmi/chains";

const chains = [polygon];
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);
