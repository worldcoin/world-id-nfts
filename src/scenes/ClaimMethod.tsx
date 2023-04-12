import Icon, { IconType } from "@/components/Icon";
import { Modal } from "@/components/Modal";
import { PropsWithChildren, useCallback } from "react";
import { Flows, SceneProps, Steps } from "types";

const Button = ({
  icon,
  children,
  onClick,
}: PropsWithChildren<{ icon: IconType; onClick: () => void }>) => {
  return (
    <button
      className="flex items-center gap-3 w-full border border-grey-300 rounded-2xl p-6 text-sm text-left font-medium"
      onClick={onClick}
    >
      <span className="grid place-content-center rounded-full bg-white shadow w-10 h-10">
        <Icon name={icon} className="w-6 h-6 text-info" />
      </span>
      <span className="flex-1">{children}</span>
      <Icon name="chevron" className="w-6 h-6" />
    </button>
  );
};

export function ClaimMethod({ step, setStep, setFlow }: SceneProps) {
  const onSelectFlow = useCallback(
    (flow: Flows) => {
      setFlow(flow);
      setStep(Steps.flow);
    },
    [setStep, setFlow]
  );

  return (
    <Modal
      open={step === Steps.selectClaimMethod}
      onClose={() => setStep(Steps.verified)}
      title="Select claim method"
      description="How would you like to claim your NFT?"
    >
      <div className="mt-8 space-y-3 w-full">
        <Button icon="document" onClick={() => onSelectFlow(Flows.direct)}>
          Provide ENS or wallet address
        </Button>

        <Button icon="wallet" onClick={() => onSelectFlow(Flows.walletConnect)}>
          Connect your wallet
        </Button>

        <Button icon="camera" onClick={() => onSelectFlow(Flows.scan)}>
          Scan your wallet’s QR code
        </Button>
      </div>
    </Modal>
  );
}
