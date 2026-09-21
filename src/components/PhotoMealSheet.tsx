import { useEffect, useRef, useState } from "react";
import fodmap from "../data/fodmap";
import { MealEntry } from "../context/AppContext";
import { Fodmap } from "../types/Fodmap";
import { isRecognitionSupported, preloadRecogniser, recogniseFoods } from "../recognition/client";
import { Candidate, RecognitionProgress, RecognitionResult } from "../recognition/types";
import leftArrow from "../icons/arrow-left-solid.svg";
import camera from "../icons/camera.svg";
import FoodPicker from "./FoodPicker";
import Score from "./Score";

type PhotoMealSheetProps = {
  meal: string;
  existingFoodIds?: string[];
  onAdd: (entries: MealEntry[]) => void;
  onClose: () => void;
};

type Phase = { name: "pick" } | { name: "analysing" } | { name: "review"; result: RecognitionResult } | { name: "error"; message: string };

const QUANTITY_LABELS = ["Tiny", "Small", "Medium", "Large", "Loads"];

const stageText = (progress: RecognitionProgress | null): string => {
  if (!progress) return "Getting ready…";
  switch (progress.stage) {
    case "loading-model":
      return "Loading the recogniser…";
    case "decoding":
      return "Reading your photo…";
    case "embedding":
      return `Looking at the plate… ${progress.done}/${progress.total}`;
  }
};

const progressFraction = (progress: RecognitionProgress | null): number => {
  if (!progress) return 0.05;
  if (progress.stage === "loading-model") return 0.1;
  if (progress.stage === "decoding") return 0.2;
  return 0.2 + 0.8 * (progress.done / Math.max(progress.total, 1));
};

const confidenceText = (candidate: Candidate): string => {
  if (candidate.source === "dish") return candidate.role === "core" ? `Usually in ${candidate.dish}` : `Often in ${candidate.dish}`;
  if (candidate.confidence >= 0.6) return "Strong match";
  if (candidate.confidence >= 0.3) return "Likely";
  return "Possible";
};

const PhotoMealSheet: React.FC<PhotoMealSheetProps> = ({ meal, existingFoodIds = [], onAdd, onClose }) => {
  const [phase, setPhase] = useState<Phase>({ name: "pick" });
  const [progress, setProgress] = useState<RecognitionProgress | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searching, setSearching] = useState(false);
  const cameraInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    preloadRecogniser();
  }, []);

  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl],
  );

  const analyse = async (file: File) => {
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(file);
    });
    setProgress(null);
    setPhase({ name: "analysing" });
    try {
      const result = await recogniseFoods(file, setProgress);
      setCandidates(result.candidates.filter((c) => !existingFoodIds.includes(c.foodId)));
      setPhase({ name: "review", result });
    } catch (error) {
      setPhase({ name: "error", message: error instanceof Error ? error.message : String(error) });
    }
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) void analyse(file);
  };

  const update = (foodId: string, patch: Partial<Candidate>) =>
    setCandidates((all) => all.map((c) => (c.foodId === foodId ? { ...c, ...patch } : c)));

  const addManual = (food: Fodmap, quantity: number) => {
    setCandidates((all) => {
      const without = all.filter((c) => c.foodId !== food.id);
      return [{ foodId: food.id, confidence: 1, source: "seen", selected: true, quantity }, ...without];
    });
    setSearching(false);
  };

  const selected = candidates.filter((c) => c.selected);
  const confirm = () => onAdd(selected.map(({ foodId, quantity }) => ({ foodId, quantity })));

  if (searching) {
    return (
      <FoodPicker
        meal={meal}
        existingFoodIds={[...existingFoodIds, ...candidates.map((c) => c.foodId)]}
        onSelect={addManual}
        onClose={() => setSearching(false)}
      />
    );
  }

  const inputs = (
    <>
      <input ref={cameraInput} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} data-testid="camera-input" />
      <input ref={galleryInput} type="file" accept="image/*" className="hidden" onChange={handleFile} data-testid="gallery-input" />
    </>
  );

  const nav = (
    <nav className="px-4 py-3 bg-green-400 flex items-center gap-3">
      <button onClick={onClose} aria-label="Go back">
        <img src={leftArrow} className="w-5 h-5" alt="" />
      </button>
      <p className="text-white font-semibold text-base">Photo your {meal.toLowerCase()}</p>
    </nav>
  );

  if (phase.name === "pick" || phase.name === "error") {
    return (
      <div className="flex flex-col min-h-screen bg-background-secondary">
        {nav}
        {inputs}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-3xl bg-green-400/15 flex items-center justify-center mb-5">
            <img src={camera} className="w-10 h-10 text-green-600" alt="" />
          </div>
          {phase.name === "error" ? (
            <>
              <h2 className="text-lg font-semibold text-foreground-primary mb-2">That didn't work</h2>
              <p className="text-sm text-foreground-muted mb-1">We couldn't analyse that photo.</p>
              <p className="text-xs text-foreground-muted mb-6 break-words max-w-xs">{phase.message}</p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-foreground-primary mb-2">Snap your plate</h2>
              <p className="text-sm text-foreground-muted mb-6 max-w-xs">
                We'll pick out the foods and their likely ingredients so you can log the whole meal at once.
                Everything runs on your phone. The photo never leaves your device.
              </p>
            </>
          )}
          {!isRecognitionSupported() && (
            <p className="text-sm text-red-500 mb-4">Photo recognition isn't supported on this device.</p>
          )}
          <button
            onClick={() => cameraInput.current?.click()}
            disabled={!isRecognitionSupported()}
            className="w-full max-w-xs bg-green-400 text-white rounded-full py-3 font-semibold mb-3 disabled:opacity-50"
          >
            Take a photo
          </button>
          <button
            onClick={() => galleryInput.current?.click()}
            disabled={!isRecognitionSupported()}
            className="w-full max-w-xs bg-background-primary text-foreground-primary border border-divider rounded-full py-3 font-semibold disabled:opacity-50"
          >
            Choose from gallery
          </button>
          {phase.name === "error" && (
            <button onClick={onClose} className="mt-4 text-sm text-green-600 font-semibold">
              Pick foods manually instead
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase.name === "analysing") {
    return (
      <div className="flex flex-col min-h-screen bg-background-secondary">
        {nav}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {previewUrl && (
            <img src={previewUrl} alt="Your meal" className="w-full max-w-xs aspect-square object-cover rounded-3xl shadow-xl mb-6" />
          )}
          <div className="w-full max-w-xs h-2 rounded-full bg-background-tertiary overflow-hidden mb-3" role="progressbar" aria-valuenow={Math.round(progressFraction(progress) * 100)} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-green-400 transition-all duration-300" style={{ width: `${progressFraction(progress) * 100}%` }} />
          </div>
          <p className="text-sm text-foreground-muted">{stageText(progress)}</p>
        </div>
      </div>
    );
  }

  const seen = candidates.filter((c) => c.source === "seen");
  const inferred = candidates.filter((c) => c.source === "dish");
  const dishNames = phase.result.dishes.map((d) => d.name);

  const row = (candidate: Candidate, last: boolean) => {
    const food = fodmap.find((f) => f.id === candidate.foodId);
    if (!food) return null;
    return (
      <div key={candidate.foodId} className={`px-4 py-3 ${last ? "" : "border-b border-divider"}`}>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={candidate.selected}
            onChange={(e) => update(candidate.foodId, { selected: e.target.checked })}
            aria-label={`Include ${food.name}`}
            className="w-5 h-5 accent-green-400 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-base font-medium text-foreground-primary truncate">{food.name}</p>
            <p className="text-sm text-foreground-muted truncate">{confidenceText(candidate)}</p>
          </div>
          <Score text={food.fodmap} score={food.fodmap === "high" ? 2 : 0} />
        </div>
        {candidate.selected && (
          <div className="flex gap-1 mt-2 ml-8" role="radiogroup" aria-label={`${food.name} portion`}>
            {QUANTITY_LABELS.map((label, i) => (
              <button
                key={label}
                role="radio"
                aria-checked={candidate.quantity === i + 1}
                onClick={() => update(candidate.foodId, { quantity: i + 1 })}
                className={`flex-1 text-xs py-1 rounded-full border ${
                  candidate.quantity === i + 1
                    ? "bg-green-400 text-white border-green-400"
                    : "bg-background-primary text-foreground-secondary border-divider"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const section = (title: string, items: Candidate[]) =>
    items.length > 0 && (
      <section className="mb-4">
        <h2 className="px-1 mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-muted">{title}</h2>
        <div className="bg-background-primary rounded-xl border border-divider overflow-hidden">
          {items.map((c, i) => row(c, i === items.length - 1))}
        </div>
      </section>
    );

  return (
    <div className="flex flex-col min-h-screen bg-background-secondary pb-28">
      {nav}
      {inputs}
      <div className="px-3 pt-3">
        <div className="flex items-center gap-3 mb-4">
          {previewUrl && <img src={previewUrl} alt="Your meal" className="w-16 h-16 rounded-2xl object-cover shrink-0" />}
          <div className="min-w-0">
            <p className="text-base font-semibold text-foreground-primary">
              {dishNames.length > 0 ? `Looks like ${dishNames.join(" and ")}` : candidates.length > 0 ? "Here's what we spotted" : "Nothing recognised"}
            </p>
            <p className="text-sm text-foreground-muted">
              {candidates.length > 0 ? "Untick anything that's wrong and set the portions." : "Try a closer, brighter photo, or add foods by search."}
            </p>
          </div>
        </div>
        {section("Spotted in the photo", seen)}
        {section("Likely ingredients", inferred)}
        <button
          onClick={() => setSearching(true)}
          className="w-full bg-background-primary text-foreground-primary border border-divider rounded-full py-2 text-sm font-semibold"
        >
          + Add something we missed
        </button>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center">
        <div className="w-full max-w-screen-sm bg-background-primary border-t border-divider px-4 py-3 flex gap-3">
          <button
            onClick={() => setPhase({ name: "pick" })}
            className="px-5 bg-background-primary text-foreground-primary border border-divider rounded-full py-3 font-semibold"
          >
            Retake
          </button>
          <button
            onClick={confirm}
            disabled={selected.length === 0}
            className="flex-1 bg-green-400 text-white rounded-full py-3 font-semibold disabled:opacity-50"
          >
            Add {selected.length} to {meal}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoMealSheet;
