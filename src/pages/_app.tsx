import { ethereumClient, wagmiClient } from "@/lib/wallet-connect";
import "../styles/styles.css";
import { Fragment, useEffect } from "react";
import { WagmiConfig } from "wagmi";
import { Web3Modal, useWeb3ModalTheme } from "@web3modal/react";

const App = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>

      <Web3Modal
        projectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </Fragment>
  );
};

export default App;
