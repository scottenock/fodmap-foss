import { useEffect, useState } from "react";
import { MealContext, SymptomEntry } from "../context/AppContext";
import PillButton from "./PillButton";

type SymptomSheetProps = {
  existingSymptoms?: SymptomEntry[];
  onLog: (entry: SymptomEntry) => void;
  onClose: () => void;
};

const MEAL_CONTEXTS: { value: MealContext; label: string }[] = [
  { value: "morning",   label: "Morning" },
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch",     label: "Lunch" },
  { value: "dinner",    label: "Dinner" },
];

const TIMING_LABELS = ["Immediate", "1 hour", "2 hours", "3 hours", "4+ hours"];

const SLIDERS: { key: keyof Omit<SymptomEntry, "id" | "mealContext" | "timing">; label: string; minLabel: string; midLabel?: string; maxLabel: string }[] = [
  { key: "stoolConsistency", label: "Stool Consistency", minLabel: "Very firm", midLabel: "Normal", maxLabel: "Very loose" },
  { key: "bloating",         label: "Bloating",          minLabel: "None",                          maxLabel: "Severe" },
  { key: "gas",              label: "Gas",               minLabel: "None",                          maxLabel: "Severe" },
  { key: "stomachPain",      label: "Stomach Pain",      minLabel: "None",                          maxLabel: "Severe" },
  { key: "urgency",          label: "Urgency",           minLabel: "None",                          maxLabel: "Severe" },
];

type SliderValues = Record<typeof SLIDERS[number]["key"], number>;

const DEFAULT_SLIDERS: SliderValues = {
  stoolConsistency: 3,
  bloating: 1,
  gas: 1,
  stomachPain: 1,
  urgency: 1,
};

const SymptomSheet: React.FC<SymptomSheetProps> = ({ existingSymptoms = [], onLog, onClose }) => {
  const [mealContext, setMealContext] = useState<MealContext>("morning");
  const [timing, setTiming] = useState(0);
  const [sliders, setSliders] = useState<SliderValues>(DEFAULT_SLIDERS);

  useEffect(() => {
    const match = existingSymptoms.find(
      (e) => e.mealContext === mealContext && e.timing === timing
    );
    if (match) {
      setSliders({
        stoolConsistency: match.stoolConsistency,
        bloating: match.bloating,
        gas: match.gas,
        stomachPain: match.stomachPain,
        urgency: match.urgency,
      });
    } else {
      setSliders(DEFAULT_SLIDERS);
    }
  }, [mealContext, timing, existingSymptoms]);

  const handleConfirm = () => {
    onLog({ id: String(Date.now()), mealContext, timing, ...sliders });
  };

  const isUpdating = existingSymptoms.some(
    (e) => e.mealContext === mealContext && e.timing === timing
  );

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-end items-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-40 bg-background-primary rounded-t-2xl w-full max-w-screen-sm max-h-[85vh] flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-divider shrink-0">
          <p className="font-semibold text-base text-foreground-primary">Log Symptom</p>
          <button onClick={onClose} className="text-foreground-muted text-2xl leading-none">×</button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-6">
          <section>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">
              Relative to
            </p>
            <div className="flex gap-2">
              {MEAL_CONTEXTS.map(({ value, label }) => (
                <PillButton key={value} active={mealContext === value} onClick={() => setMealContext(value)} className="flex-1 py-1 px-2">
                  {label}
                </PillButton>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">Timing</p>
            <input
              type="range" min={0} max={4} step={1} value={timing}
              onChange={(e) => setTiming(Number(e.target.value))}
              className="w-full accent-green-400"
            />
            <div className="flex justify-between text-xs text-foreground-muted mt-1">
              {TIMING_LABELS.map((l) => <span key={l}>{l}</span>)}
            </div>
            <p className="text-center text-green-600 font-semibold mt-1">{TIMING_LABELS[timing]}</p>
          </section>

          {SLIDERS.map(({ key, label, minLabel, midLabel, maxLabel }) => (
            <section key={key}>
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">{label}</p>
              <input
                type="range" min={1} max={5} step={1} value={sliders[key]}
                onChange={(e) => setSliders((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                className="w-full accent-green-400"
              />
              <div className="flex justify-between text-xs text-foreground-muted mt-1">
                <span>{minLabel}</span>
                {midLabel && <span>{midLabel}</span>}
                <span>{maxLabel}</span>
              </div>
            </section>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-divider shrink-0">
          <button onClick={handleConfirm} className="w-full bg-green-400 text-white rounded-full py-3 font-semibold">
            {isUpdating ? "Update Symptoms" : "Log Symptoms"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymptomSheet;
