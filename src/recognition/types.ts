export type LabelKind = "food" | "dish" | "background";

export type RecognitionLabel = {
  kind: LabelKind;
  id: string;
  name: string;
  rows: number[];
};

export type LabelIndex = {
  model: string;
  dtype: string;
  dim: number;
  hash: string;
  rows: string[];
  labels: RecognitionLabel[];
};

export type IngredientRole = "core" | "common";

export type CandidateSource = "seen" | "dish";

export type Candidate = {
  foodId: string;
  confidence: number;
  source: CandidateSource;
  dish?: string;
  role?: IngredientRole;
  selected: boolean;
  quantity: number;
};

export type DetectedDish = {
  id: string;
  name: string;
  confidence: number;
};

export type RecognitionResult = {
  dishes: DetectedDish[];
  candidates: Candidate[];
};

export type RecognitionStage = "loading-model" | "decoding" | "embedding";

export type RecognitionProgress = {
  stage: RecognitionStage;
  done: number;
  total: number;
};
