import cn from "classnames";
import {
  FC,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Icon from "../components/Icon";
import { Button, Link } from "../components/Button";
import { IDKitWidget } from "@worldcoin/idkit";
import Image from "next/image";
import mascot from "/public/images/mascot.png";
import { Flows, Steps } from "types";
import { useBackgroundPattern } from "@/lib/generate-pattern";
import { ClaimMethod } from "@/scenes/ClaimMethod";
import { Confirmation } from "@/scenes/Confirmation";
import { AnimatedOutline } from "@/components/AnimatedOutline";
import { Direct } from "@/scenes/Direct";
import { WalletConnect } from "@/scenes/WalletConnect";
import { QrScanner } from "@/scenes/QrScanner";

export type ScreenType = "intro" | "name";

export const App: FC = () => {
  const [step, setStep] = useState<Steps>(Steps.intro);
  const [flow, setFlow] = useState<Flows | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [claimedCount, setClaimedCount] = useState(95);

  const mainRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useBackgroundPattern(mainRef);

  const handleIdkitVerify = useCallback(() => {
    setStep(Steps.verified);
  }, []);

  const handleClaimConfirm = useCallback(() => {
    setFlow(null);
    setStep(Steps.claimed);
    setClaimedCount((p) => p + Number(p < 100));
  }, []);

  return (
    <Fragment>
      <main
        className={cn(
          "bg-repeat-x min-h-screen bg-sand bg-[length:400px]",
          "grid grid-rows-[auto_1fr_auto] gap-8"
        )}
        ref={mainRef}
      >
        <div className="flex items-center justify-between px-6 py-5 lg:px-28 lg:py-7 font-rubik">
          <Icon name="worldcoin" className="w-[164px] h-6" />

          <div className="hidden md:block">
            <Link
              href="https://thirdweb.studio/"
              className="flex items-center gap-3 text-grey-900 font-rubik"
              variant="flat"
              size="small"
            >
              <span>NFT art crafted by</span>

              <span className="flex items-center gap-1">
                <Icon name="3rd-web" className="w-5 h-5" />
                Thirdweb Studio
              </span>

              <Icon name="external" className="w-6 h-6" />
            </Link>
          </div>
        </div>

        <div
          className={cn(
            "px-6 lg:px-28 xl:pl-40 2xl:pl-60 max-w-screen",
            "grid items-center place-self-center gap-6 lg:gap-x-24 lg:gap-y-24 2xl:gap-x-48",
            "lg:grid-cols-[4fr_6fr] lg:grid-rows-2 lg:grid-flow-row lg:auto-rows-min"
          )}
        >
          <div className="flex flex-col items-center lg:items-start lg:self-end gap-6 justify-center lg:col-span-1">
            <div className="bg-sand-300 text-grey-900 border border-sand-700 rounded-full px-4 py-2 font-rubik text-sm md:text-lg">
              ETH Tokyo 2023
            </div>

            <div className="grid gap-2 lg:block font-semibold text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl lg:inline">
                Worldie meets Worldcoin
              </h1>

              <span className="inline-block lg:text-xl text-grey-700 [vertical-align:top]">
                in Tokyo 🇯🇵
              </span>
            </div>

            {step === Steps.intro && (
              <IDKitWidget
                // FIXME: add proper props
                app_id={"tokyo"}
                action="tokyo-nft"
                signal="tokyo"
                handleVerify={handleIdkitVerify}
                autoClose
              >
                {({ open }) => (
                  <Button
                    className="flex gap-3 items-center w-full lg:w-auto justify-center"
                    onClick={open}
                  >
                    <Icon name="wid-human" className="w-5 h-5" />
                    Collect NFT with World ID
                  </Button>
                )}
              </IDKitWidget>
            )}

            {step >= Steps.verified && step < Steps.claimed && (
              <AnimatedOutline className="w-full lg:w-auto from-grey-300 to-blue">
                <Button
                  className="w-full lg:w-auto"
                  onClick={() => setStep(Steps.selectClaimMethod)}
                >
                  Claim your NFT
                </Button>
              </AnimatedOutline>
            )}

            {step === Steps.claimed && (
              <Button className="flex items-center gap-3 bg-success w-full justify-center lg:min-w-80">
                <span className="grid place-items-center w-5 h-5 bg-white rounded-full">
                  <Icon name="check" className="w-2 h-2 text-success" />
                </span>
                Successfully Claimed
              </Button>
            )}
          </div>

          <div className="lg:place-self-start xl:place-self-center lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <Image
              src={mascot}
              className="w-full lg:max-w-[80vh] lg:h-full aspect-square"
              alt=""
            />
          </div>

          <div className="justify-self-center lg:justify-self-start lg:self-start lg:col-start-1 lg:row-start-2">
            <div className="flex flex-col items-center p-4 bg-sand border border-sand-700 rounded-lg text-grey-900">
              <span className="lg:text-xl font-rubik">Claimed</span>

              <div className="flex items-stretch font-semibold text-xl lg:text-3xl">
                <div
                  key={claimedCount}
                  className={cn("relative overflow-hidden")}
                  style={{
                    width: `${claimedCount.toString().length}ch`,
                  }}
                  ref={counterRef}
                >
                  <span className="absolute top-0 bottom-0 right-0 animate-counter-prev">
                    {claimedCount - 1}
                  </span>

                  <span className="absolute top-0 bottom-0 right-0 translate-y-full animate-counter-current">
                    {claimedCount}
                  </span>
                </div>
                /<span>100</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 lg:px-28 lg:py-7 font-rubik text-xs text-center lg:text-left lg:text-sm text-grey-900">
          All rights reserved by Worldcoin and Thirdweb Studio ©
          {new Date().getFullYear()}
        </div>
      </main>

      <ClaimMethod
        address={address}
        flow={flow}
        setAddress={setAddress}
        setFlow={setFlow}
        setStep={setStep}
        step={step}
      />

      <Direct
        address={address}
        flow={flow}
        setAddress={setAddress}
        setFlow={setFlow}
        setStep={setStep}
        step={step}
      />

      <WalletConnect
        address={address}
        flow={flow}
        setAddress={setAddress}
        setFlow={setFlow}
        setStep={setStep}
        step={step}
      />

      <Confirmation
        address={address}
        flow={flow}
        setAddress={setAddress}
        setFlow={setFlow}
        setStep={setStep}
        step={step}
        onConfirm={handleClaimConfirm}
      />

      <QrScanner
        address={address}
        flow={flow}
        setAddress={setAddress}
        setFlow={setFlow}
        setStep={setStep}
        step={step}
      />
    </Fragment>
  );
};

export default memo(App);
