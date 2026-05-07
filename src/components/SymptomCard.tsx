import { SymptomEntry } from "../context/AppContext";

type SymptomCardProps = {
  entry: SymptomEntry;
  onRemove: () => void;
};

const TIMING_LABELS   = ["Immediate", "1 hour", "2 hours", "3 hours", "4+ hours"];
const STOOL_LABELS    = ["Very firm", "Firm", "Normal", "Soft", "Very loose"];
const SEVERITY_LABELS = ["None", "Mild", "Moderate", "Strong", "Severe"];

const CONTEXT_LABELS: Record<SymptomEntry["mealContext"], string> = {
  morning:   "Morning",
  breakfast: "After Breakfast",
  lunch:     "After Lunch",
  dinner:    "After Dinner",
};

const stoolColor = (v: number) => {
  if (v === 3) return "text-green-600";
  if (v === 2 || v === 4) return "text-amber-500";
  return "text-red-500";
};

const severityColor = (v: number) => {
  if (v <= 2) return "text-foreground-muted";
  if (v === 3) return "text-amber-500";
  if (v === 4) return "text-orange-500";
  return "text-red-500";
};

const FIELDS: {
  key: keyof Omit<SymptomEntry, "id" | "mealContext" | "timing">;
  label: string;
  labels: string[];
  color: (v: number) => string;
}[] = [
  { key: "stoolConsistency", label: "Stool",    labels: STOOL_LABELS,    color: stoolColor    },
  { key: "bloating",         label: "Bloating", labels: SEVERITY_LABELS, color: severityColor },
  { key: "gas",              label: "Gas",      labels: SEVERITY_LABELS, color: severityColor },
  { key: "stomachPain",      label: "Pain",     labels: SEVERITY_LABELS, color: severityColor },
  { key: "urgency",          label: "Urgency",  labels: SEVERITY_LABELS, color: severityColor },
];

const SymptomCard: React.FC<SymptomCardProps> = ({ entry, onRemove }) => (
  <div className="bg-background-tertiary rounded-xl p-3 mb-3">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-semibold text-foreground-primary">
        {CONTEXT_LABELS[entry.mealContext]}
        <span className="font-normal text-foreground-muted"> · {TIMING_LABELS[entry.timing]}</span>
      </p>
      <button onClick={onRemove} aria-label="Remove symptom entry" className="text-foreground-muted text-xl leading-none p-1">
        ×
      </button>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
      {FIELDS.map(({ key, label, labels, color }) => (
        <div key={key} className="flex items-center justify-between">
          <span className="text-xs text-foreground-muted">{label}</span>
          <span className={`text-xs font-medium ${color(entry[key])}`}>
            {labels[entry[key] - 1]}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default SymptomCard;
