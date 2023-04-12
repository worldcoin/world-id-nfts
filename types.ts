export enum Steps {
  intro,
  verified,
  selectClaimMethod,
  flow,
  claimed,
  confirmation,
}

export enum Flows {
  direct,
  walletConnect,
  scan,
}

export interface SceneProps {
  address: string;
  flow: Flows;
  setAddress: (address: string) => void;
  setFlow: (flow: Flows | null) => void;
  setStep: (step: Steps) => void;
  step: Steps;
}
