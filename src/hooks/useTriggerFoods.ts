import { useContext, useMemo } from "react";
import AppContext, { SymptomEntry } from "../context/AppContext";
import fodmapData from "../data/fodmap";

export type TriggerFood = {
  foodId: string;
  name: string;
  category: string;
  count: number;
  avgSeverity: number;
};

const entryMaxSeverity = (entry: SymptomEntry): number => {
  const stoolDev = Math.abs(entry.stoolConsistency - 3);
  const stoolScore = stoolDev === 0 ? 1 : stoolDev === 1 ? 3 : 5;
  return Math.max(entry.bloating, entry.gas, entry.stomachPain, entry.urgency, stoolScore);
};

export const useTriggerFoods = (): TriggerFood[] => {
  const { state } = useContext(AppContext);

  return useMemo(() => {
    const scores: Record<string, { count: number; totalSeverity: number }> = {};

    for (const [date, entries] of Object.entries(state.symptoms)) {
      for (const entry of entries) {
        if (entry.mealContext === "morning") continue;
        const mealFoods = state.meals[date]?.[entry.mealContext] ?? [];
        if (mealFoods.length === 0) continue;

        const severity = entryMaxSeverity(entry);
        for (const { foodId } of mealFoods) {
          if (!scores[foodId]) scores[foodId] = { count: 0, totalSeverity: 0 };
          scores[foodId].count++;
          scores[foodId].totalSeverity += severity;
        }
      }
    }

    return Object.entries(scores)
      .map(([foodId, { count, totalSeverity }]) => {
        const food = fodmapData.find((f) => f.id === foodId);
        if (!food) return null;
        return { foodId, name: food.name, category: food.category, count, avgSeverity: totalSeverity / count };
      })
      .filter((c): c is TriggerFood => c !== null)
      .sort((a, b) => b.count - a.count || b.avgSeverity - a.avgSeverity);
  }, [state.symptoms, state.meals]);
};
