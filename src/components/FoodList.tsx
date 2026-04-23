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
    <div>
      <InfiniteScroll
        start={0}
        hasMore={foods.length > currentItems.length}
        loadMore={() => setLoadedItems((items) => items + incrementValue)}
      >
        {currentItems.map((food, index) => (
          <div key={`${food.id}-${index}`}>
            <div className="flex items-center my-1 px-3">
              <Link
                to={`/food/${food.id}`}
                className="flex flex-1 justify-between items-center"
              >
                <div>
                  <p className="text-lg">{food.name}</p>
                  <p className="text-base">{food.category}</p>
                </div>
                <div className="flex items-center mr-2">
                  <Score
                    text={food.fodmap}
                    score={food.fodmap === "high" ? 2 : 0}
                    reversed={true}
                  />
                </div>
              </Link>
              <StarButton
                isFavorited={state.favorites.includes(food.id)}
                onToggle={(e) => {
                  e.preventDefault();
                  dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: food.id });
                }}
              />
            </div>
            <div className="border-b-2 border-gray-300 mb-2" />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default FoodList;
