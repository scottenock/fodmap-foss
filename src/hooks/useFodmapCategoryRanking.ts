import { useContext, useMemo } from "react";
import AppContext from "../context/AppContext";
import { entryMaxSeverity } from "../utils/symptomSeverity";
import fodmapData from "../data/fodmap";

export type FodmapCategoryScore = {
  key: "fructose" | "oligos" | "lactose" | "polyols";
  label: string;
  score: number;
  percentage: number;
};

const CATEGORIES: { key: FodmapCategoryScore["key"]; label: string }[] = [
  { key: "fructose", label: "Fructose"        },
  { key: "oligos",   label: "Oligos"           },
  { key: "lactose",  label: "Lactose"          },
  { key: "polyols",  label: "Polyols"          },
];

export const useFodmapCategoryRanking = (): FodmapCategoryScore[] => {
  const { state } = useContext(AppContext);

  return useMemo(() => {
    const totals: Record<FodmapCategoryScore["key"], number> = {
      fructose: 0,
      oligos: 0,
      lactose: 0,
      polyols: 0,
    };

    for (const [date, entries] of Object.entries(state.symptoms)) {
      for (const entry of entries) {
        if (entry.mealContext === "morning") continue;
        const mealFoods = state.meals[date]?.[entry.mealContext] ?? [];
        if (mealFoods.length === 0) continue;

        const severity = entryMaxSeverity(entry);
        for (const { foodId } of mealFoods) {
          const food = fodmapData.find((f) => f.id === foodId);
          if (!food?.details) continue;
          totals.fructose += food.details.fructose * severity;
          totals.oligos   += food.details.oligos   * severity;
          totals.lactose  += food.details.lactose  * severity;
          totals.polyols  += food.details.polyols  * severity;
        }
      }
    }

    const max = Math.max(...Object.values(totals));

    return CATEGORIES
      .map(({ key, label }) => ({
        key,
        label,
        score: totals[key],
        percentage: max > 0 ? Math.round((totals[key] / max) * 100) : 0,
      }))
      .sort((a, b) => b.score - a.score);
  }, [state.symptoms, state.meals]);
};
