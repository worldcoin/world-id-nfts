import { Modal } from "@/components/Modal";
import { validateAddress } from "@/lib/validate-address";
import cn from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OnResultFunction, QrReader, QrReaderProps } from "react-qr-reader";
import { Flows, SceneProps, Steps } from "types";

function getQrReaderProps(): QrReaderProps {
  if (typeof window === "undefined") {
    return {} as QrReaderProps;
  }

  return {
    containerStyle: { display: "contents" },
    videoContainerStyle: { display: "contents" },
    videoStyle: {
      position: "absolute",
      inset: 0,
      objectFit: "cover",
    },
    constraints: {
      aspectRatio: window.innerWidth / window.innerHeight,
      width: { ideal: window.innerWidth * 2 },
      facingMode: ["environment"],
    },
  };
}

const minD = (d: string) =>
  d
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/(\s|)([a-z])(\s|)/gi, "$2")
    .replace(/(\s|)(-)(\s|)/gi, "$2");

function Scanner({ onResult }: { onResult: OnResultFunction }) {
  const [frame, setFrame] = useState("");
  const [border, setBorder] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const setSizes = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const s = 174;
      const pt = (h - s) / 4;
      const pl = (w - s) / 2;

      const frame = `
        M ${w} 0 
        H 0 
          v ${h} 
          h ${w} 
        V 0 
        M ${pl} ${pt} 
          c -14 0 -26 12 -26 26 
          v 188 
          c 0 14 12 26 26 26 
          h 188 
          c 14 0 26 -12 26 -26 
          v -188 
          c 0 -14 -12 -26 -26 -26 
          h -188
      `;

      const border = `
        M ${pl + 20} ${pt}
        h -20 
        c -14 0 -26 12 -26 26 
        v 20 
        m 192 193 
        h 21 
        c 14 0 26 -12 26 -26 
        v -20 
        m 0 -147 
        v -20 
        c 0 -12 -12 -26 -26 -26 
        h -20 
        m -194 192 
        v 20 
        c 0 12 12 26 26 26 
        h 20
      `;

      setFrame(minD(frame));

      setBorder(minD(border));
    };

    setSizes();

    window.addEventListener("resize", setSizes);

    return () => {
      window.removeEventListener("resize", setSizes);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-clip rounded-none lg:rounded-xl"
      ref={containerRef}
    >
      <QrReader {...getQrReaderProps()} onResult={onResult} />

      <svg
        className="absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
      >
        <path
          d={frame}
          fill="#191C20"
          fillRule="evenodd"
          clipRule="evenodd"
          opacity=".7"
        />
        <path d={border} stroke="#fff" strokeLinecap="round" strokeWidth="4" />
      </svg>

      <div
        className={cn(
          "text-center absolute top-[calc(35%+240px)] left-1/2 -translate-x-1/2 -translate-y-1/2",
          "text-white text-rubik",
          "space-y-4"
        )}
      >
        <p className="text-xl font-semibold">Scan code</p>
        <p>Use this QR code for payments and identity verification</p>
      </div>
    </div>
  );
}

export function QrScanner({
  step,
  setStep,
  flow,
  setFlow,
  setAddress,
}: SceneProps) {
  const show = useMemo(
    () => step === Steps.flow && flow === Flows.scan,
    [flow, step]
  );

  const handleClose = useCallback(() => {
    setStep(Steps.selectClaimMethod);
    setFlow(null);
  }, [setFlow, setStep]);

  const handleResult = useCallback<OnResultFunction>(
    (result) => {
      if (
        step === Steps.flow &&
        flow === Flows.scan &&
        result &&
        validateAddress(result.getText())
      ) {
        // FIXME: fires infinitely, issue with react-qr-reader, need to find solution
        setAddress(result.getText());
        setStep(Steps.confirmation);
      }
    },
    [flow, setAddress, setStep, step]
  );

  return (
    <Modal
      open={show}
      onClose={handleClose}
      classNameToolbar="relative z-10"
      classNameContainer={cn(
        "w-screen h-screen !max-w-[unset] !max-h-[unset] rounded-none overflow-hidden",
        "md:w-auto md:h-auto md:!max-w-[480px] md:!aspect-[9/16] rounded-xl"
      )}
      hideImage
    >
      <Scanner onResult={handleResult} />
    </Modal>
  );
}
