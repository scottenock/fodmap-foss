import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Fodmap } from "../types/Fodmap";
import { useFoodList } from "../hooks/useFoodList";
import SearchInput from "./SearchInput";
import Score from "./Score";
import leftArrow from "../icons/arrow-left-solid.svg";

type FoodPickerProps = {
  meal: string;
  existingFoodIds?: string[];
  onSelect: (food: Fodmap, quantity: number) => void;
  onClose: () => void;
};

const QUANTITY_LABELS = ["Tiny", "Small", "Medium", "Large", "Loads"];
const incrementValue = 25;

const FoodPicker: React.FC<FoodPickerProps> = ({ meal, existingFoodIds = [], onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadedItems, setLoadedItems] = useState(incrementValue);
  const [selectedFood, setSelectedFood] = useState<Fodmap | null>(null);
  const [quantity, setQuantity] = useState(3);
  const allFoods = useFoodList("a-z", searchTerm, []);
  const foods = allFoods.filter((f) => !existingFoodIds.includes(f.id));
  const currentItems = foods.slice(0, loadedItems);

  const handleFoodTap = (food: Fodmap) => {
    setSelectedFood(food);
    setQuantity(3);
  };

  const handleConfirm = () => {
    if (!selectedFood) return;
    onSelect(selectedFood, quantity);
    setSelectedFood(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <nav className="px-4 py-3 bg-green-400 flex items-center gap-3">
        <button onClick={onClose} aria-label="Go back">
          <img src={leftArrow} className="w-5 h-5" alt="" />
        </button>
        <SearchInput value={searchTerm} onChange={setSearchTerm} autoFocus />
      </nav>
      <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        Adding to {meal}
      </p>
      <div className="overflow-y-auto flex-1 bg-white dark:bg-gray-900">
        <InfiniteScroll
          start={0}
          hasMore={foods.length > currentItems.length}
          loadMore={() => setLoadedItems((n) => n + incrementValue)}
        >
          {currentItems.map((food, index) => (
            <button
              key={`${food.id}-${index}`}
              onClick={() => handleFoodTap(food)}
              className="w-full text-left px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between"
            >
              <div>
                <p className="text-base font-medium text-gray-900 dark:text-white">{food.name}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">{food.category}</p>
              </div>
              <Score text={food.fodmap} score={food.fodmap === "high" ? 2 : 0} />
            </button>
          ))}
        </InfiniteScroll>
      </div>

      {selectedFood && (
        <div className="fixed inset-0 z-30 flex flex-col justify-end items-center">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSelectedFood(null)} />
          <div className="relative z-40 bg-white dark:bg-gray-800 rounded-t-2xl p-5 shadow-xl w-full max-w-screen-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedFood.name}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">{selectedFood.category}</p>
              </div>
              <Score text={selectedFood.fodmap} score={selectedFood.fodmap === "high" ? 2 : 0} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3">
              Quantity
            </p>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-green-400"
            />
            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1 mb-1">
              {QUANTITY_LABELS.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <p className="text-center text-green-600 dark:text-green-400 font-semibold mb-5">
              {QUANTITY_LABELS[quantity - 1]}
            </p>

            <button
              onClick={handleConfirm}
              className="w-full bg-green-400 text-white rounded-full py-3 font-semibold"
            >
              Add to {meal}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodPicker;
