import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { Fodmap } from "../types/Fodmap";
import AppContext, { ACTIONS } from "../context/AppContext";
import Score from "./Score";
import StarButton from "./StarButton";

type FoodListProps = {
  foods: Fodmap[];
};

const incrementValue = 25;

const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  const { state, dispatch } = useContext(AppContext);
  const [loadedItems, setLoadedItems] = useState(incrementValue);
  const currentItems = foods.slice(0, loadedItems);

  return (
    <div className="bg-white dark:bg-gray-800">
      <InfiniteScroll
        start={0}
        hasMore={foods.length > currentItems.length}
        loadMore={() => setLoadedItems((items) => items + incrementValue)}
      >
        {currentItems.map((food, index) => (
          <div key={`${food.id}-${index}`} className="border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center px-4 py-3 gap-3">
              <Link
                to={`/food/${food.id}`}
                className="flex flex-1 items-center justify-between gap-3 min-w-0"
              >
                <div className="min-w-0">
                  <p className="text-base font-medium text-gray-900 dark:text-white truncate">{food.name}</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">{food.category}</p>
                </div>
                <Score text={food.fodmap} score={food.fodmap === "high" ? 2 : 0} />
              </Link>
              <StarButton
                isFavorited={state.favorites.includes(food.id)}
                onToggle={(e) => {
                  e.preventDefault();
                  dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: food.id });
                }}
              />
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default FoodList;
