import { useContext, useMemo } from "react";
import AppContext from "../context/AppContext";
import { entryMaxSeverity } from "../utils/symptomSeverity";
import fodmapData from "../data/fodmap";

export type TriggerFood = {
  foodId: string;
  name: string;
  category: string;
  count: number;
  avgSeverity: number;
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
