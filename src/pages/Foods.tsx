import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import FoodList from "../components/FoodList";
import FilterMenu from "../components/FilterMenu";
import SearchInput from "../components/SearchInput";
import NavBar from "../components/NavBar";
import AppContext, { ACTIONS } from "../context/AppContext";
import { useFoodList } from "../hooks/useFoodList";
import fodmap from "../data/fodmap";

const allCategories = [...new Set(fodmap.map((f) => f.category))].sort();

const sortActionMap: Record<string, string> = {
  "a-z": ACTIONS.ALPHABETICAL_ORDER,
  "h-l": ACTIONS.HIGH_LOW_ORDER,
  "l-h": ACTIONS.LOW_HIGH_ORDER,
};

function Foods() {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(
    (location.state as { showFavoritesOnly?: boolean } | null)
      ?.showFavoritesOnly ?? false
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const foods = useFoodList(
    state.sortOrder,
    searchTerm,
    selectedCategories,
    state.favorites,
    showFavoritesOnly
  );

  const activeFilterCount =
    selectedCategories.length + (showFavoritesOnly ? 1 : 0);

  const handleSortChange = (order: string) => {
    dispatch({ type: sortActionMap[order] });
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <>
      <NavBar className="!py-3">
        <div className="flex items-center gap-2 flex-1">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <button
            onClick={() => setFilterOpen((open) => !open)}
            className="relative flex-shrink-0 p-1"
            aria-label="Toggle filters"
          >
            <svg
              className={`w-6 h-6 ${filterOpen || activeFilterCount > 0 ? "text-white" : "text-green-100"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            {activeFilterCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-white text-green-600 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </NavBar>
      {filterOpen && (
        <FilterMenu
          sortOrder={state.sortOrder}
          onSortChange={handleSortChange}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesOnly={() => setShowFavoritesOnly((v) => !v)}
          categories={allCategories}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          onClearCategories={() => setSelectedCategories([])}
          onClose={() => setFilterOpen(false)}
        />
      )}
      <FoodList foods={foods} />
    </>
  );
}

export default Foods;
