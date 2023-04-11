import cn from "classnames";
import { FC, memo, useCallback, useEffect, useRef } from "react";
import Icon from "./components/Icon";
import Button, { Link } from "./components/Button";
import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";

export type ScreenType = "intro" | "name";

const generatePattern = (): string => {
  if (typeof window === "undefined") {
    return;
  }

  const img = "/images/bg.svg";
  const size = 200;
  const yMultiplier = 3.5;
  const count = Math.round((window.innerHeight / size) * yMultiplier) + 2;

  const images = new Array(count)
    .fill(0)
    .map((_, i) => `url("${img}")`)
    .join(",");

  const positions = new Array(count)
    .fill(0)
    .map(
      (_, i) =>
        `${((i - 1) * size) / 2}px ${((count - i - 2) * size) / yMultiplier}px`
    )
    .join(",");

  return `
      background-image: ${images};
      background-position: ${positions};
      background-repeat: x;
      background-size: ${size}px;
    `;
};

export const App: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.clear();
  }, []);

  // NOTE: generate background pattern
  useEffect(() => {
    if (ref.current) {
      ref.current.style.cssText = generatePattern();
    }
  }, []);

  const handleVerify = useCallback((res: ISuccessResult) => {
    console.log(res);
  }, []);

  return (
    <main
      className={cn(
        "bg-repeat-x min-h-screen bg-sand bg-[length:400px]",
        "grid grid-rows-[auto_1fr_auto] gap-8"
      )}
      ref={ref}
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-28 md:py-7 font-rubik">
        <Icon name="worldcoin" className="w-[164px] h-6" />

        <div className="hidden md:block">
          <Link
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
          "px-6 md:pl-40 md:pr-32 2xl:pl-60 2xl:pr-52",
          "grid gap-6 md:gap-x-48 md:gap-y-24 md:grid-cols-[4fr_6fr] max-h-[calc(100vh-60px)] max-w-screen"
        )}
      >
        <div className="flex flex-col items-center md:items-start gap-6 justify-center md:col-span-1">
          <div className="bg-sand-300 text-grey-900 border border-sand-700 rounded-full px-4 py-2 font-rubik text-sm md:text-lg">
            ETH Tokyo 2023
          </div>

          <div className="grid gap-2 md:block font-semibold text-center md:text-left">
            <h1 className="text-4xl md:text-6xl md:inline">
              Worldie meets Worldcoin
            </h1>
            <span className="md:text-xl text-grey-700 [vertical-align:top]">
              in Tokyo 🇯🇵
            </span>
          </div>

          <IDKitWidget
            // FIXME: add proper props
            app_id={"tokyo"}
            action="tokyo-nft"
            signal="tokyo"
            handleVerify={handleVerify}
          >
            {({ open }) => (
              <Button className="flex gap-3 items-center" onClick={open}>
                <Icon name="wid-human" className="w-5 h-5" />
                Collect NFT with World ID
              </Button>
            )}
          </IDKitWidget>
        </div>

        <div className="md:col-span-1 md:col-start-2 md:row-span-2">
          <Icon
            name="mascot"
            className="w-full md:max-h-[80vh] md:h-full aspect-square"
            noMask
          />
        </div>

        <div className="flex items-center justify-center md:col-span-1 md:col-start-1 md:row-start-2">
          <div className="flex flex-col items-center p-4 bg-sand border border-sand-700 rounded-lg text-grey-900">
            <span className="md:text-xl font-rubik">Claimed</span>

            <div className="flex items-center font-semibold text-xl md:text-3xl">
              <span>33</span>/<span>100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-5 md:px-28 md:py-7 font-rubik text-xs text-center md:text-left md:text-sm text-grey-900">
        All rights reserved by Worldcoin and Thirdweb Studio ©2023
      </div>
    </main>
  );
};

export default memo(App);
