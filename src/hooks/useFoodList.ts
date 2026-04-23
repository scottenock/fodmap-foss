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

export function useFoodList(
  sortOrder: string,
  searchTerm: string,
  selectedCategories: string[],
  favorites: string[] = [],
  showFavoritesOnly: boolean = false
): Fodmap[] {
  return useMemo(() => {
    const base = sortedData[sortOrder] ?? alphabetical;
    if (!searchTerm && selectedCategories.length === 0 && !showFavoritesOnly)
      return base;
    const lowerSearch = searchTerm.toLowerCase();
    return base.filter((food) => {
      if (showFavoritesOnly && !favorites.includes(food.id)) return false;
      if (searchTerm && !food.name.toLowerCase().includes(lowerSearch))
        return false;
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(food.category)
      )
        return false;
      return true;
    });
  }, [sortOrder, searchTerm, selectedCategories, favorites, showFavoritesOnly]);
}
