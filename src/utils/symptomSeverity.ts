import { SymptomEntry } from "../context/AppContext";

export const entryMaxSeverity = (entry: SymptomEntry): number => {
  const stoolDev = Math.abs(entry.stoolConsistency - 3);
  const stoolScore = stoolDev === 0 ? 1 : stoolDev === 1 ? 3 : 5;
  return Math.max(entry.bloating, entry.gas, entry.stomachPain, entry.urgency, stoolScore);
};
