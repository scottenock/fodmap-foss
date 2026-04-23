import { useMemo } from "react";
import alphabetical from "../data/alphabetical";
import high from "../data/high";
import low from "../data/low";
import { Fodmap } from "../types/Fodmap";

const sortedData: Record<string, Fodmap[]> = {
  "a-z": alphabetical,
  "h-l": high,
  "l-h": low,
};

export function useFoodList(sortOrder: string, searchTerm: string): Fodmap[] {
  return useMemo(() => {
    const base = sortedData[sortOrder] ?? alphabetical;
    if (!searchTerm) return base;
    const lower = searchTerm.toLowerCase();
    return base.filter((food) => food.name.toLowerCase().includes(lower));
  }, [sortOrder, searchTerm]);
}
