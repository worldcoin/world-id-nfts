import { Modal } from "@/components/Modal";
import { Flows, SceneProps, Steps } from "types";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

function WCModal({ onClose }: { onClose: () => void }) {
  const [beenOpen, setBeenOpen] = useState(false);
  const { isOpen, open, close } = useWeb3Modal();

  useEffect(() => {
    open().then(() => setBeenOpen(true));

    return () => {
      if (beenOpen) {
        close();
      }
    };
  }, [beenOpen, close, open]);

  useEffect(() => {
    if (beenOpen && !isOpen) {
      onClose();
    }
  }, [beenOpen, isOpen, onClose]);

  return <div className="fixed inset-0 bg-grey-900/60 backdrop-blur-xl" />;
}

export function WalletConnect({
  step,
  setStep,
  flow,
  setFlow,
  setAddress,
}: SceneProps) {
  const { isConnected, isConnecting, address } = useAccount();

  useEffect(() => {
    if (isConnected) {
      setStep(Steps.confirmation);
      setAddress(address);
    }
  }, [address, isConnected, setAddress, setStep]);

  if (step !== Steps.flow || flow !== Flows.walletConnect) {
    return null;
  }

  if (!isConnected) {
    return (
      <WCModal
        onClose={() => {
          setStep(Steps.selectClaimMethod);
          setFlow(null);
        }}
      />
    );
  }

  if (isConnecting) {
    return (
      <Modal open={true} onClose={() => {}} hideImage>
        Loading...
      </Modal>
    );
  }
}
