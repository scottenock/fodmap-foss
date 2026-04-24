import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Fodmap } from "../types/Fodmap";
import { useFoodList } from "../hooks/useFoodList";
import SearchInput from "./SearchInput";
import leftArrow from "../icons/arrow-left-solid.svg";

type FoodPickerProps = {
  meal: string;
  onSelect: (food: Fodmap) => void;
  onClose: () => void;
};

const incrementValue = 25;

const FoodPicker: React.FC<FoodPickerProps> = ({ meal, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadedItems, setLoadedItems] = useState(incrementValue);
  const foods = useFoodList("a-z", searchTerm, []);
  const currentItems = foods.slice(0, loadedItems);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="px-4 py-3 bg-green-400 flex items-center gap-3">
        <button onClick={onClose} aria-label="Go back">
          <img src={leftArrow} className="w-5 h-5" alt="" />
        </button>
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </nav>
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-400 bg-gray-50 border-b border-gray-200">
        Adding to {meal}
      </p>
      <div className="overflow-y-auto flex-1">
        <InfiniteScroll
          start={0}
          hasMore={foods.length > currentItems.length}
          loadMore={() => setLoadedItems((n) => n + incrementValue)}
        >
          {currentItems.map((food, index) => (
            <button
              key={`${food.id}-${index}`}
              onClick={() => onSelect(food)}
              className="w-full text-left px-3 py-2 border-b border-gray-200"
            >
              <p className="text-lg">{food.name}</p>
              <p className="text-sm text-gray-500">{food.category}</p>
            </button>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default FoodPicker;
