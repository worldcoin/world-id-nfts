export enum Steps {
  intro,
  selectClaimMethod,
  flow,
  worldId,
  verified,
  claimed,
  confirmation,
}

export enum Flows {
  direct,
  connectKit,
  scan,
}

export interface SceneProps {
  address: string|null;
  flow: Flows|null;
  setAddress: (address: string) => void;
  setFlow: (flow: Flows | null) => void;
  setStep: (step: Steps) => void;
  step: Steps;
}
