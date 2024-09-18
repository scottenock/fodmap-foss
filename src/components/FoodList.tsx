import { Link } from "react-router-dom";
import { Fodmap } from "../types/Fodmap";
import Score from "./Score";
import InfiniteScroll from "react-infinite-scroller";
import { useState } from "react";

type FoodListProps = {
  foods: Fodmap[];
};

const styles = {
  container: "flex justify-between items-center my-1 px-3",
};

const incrementValue = 25;

const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  const [loadedItems, setLoadedItems] = useState(incrementValue);
  const currentItems = foods.slice(0, loadedItems);

  return (
    <div>
      <InfiniteScroll
        start={0}
        hasMore={foods.length > currentItems.length}
        loadMore={() => {
          setLoadedItems((items) => items + incrementValue);
        }}
      >
        {currentItems.map((food, index) => (
          <div key={`${food.id}-${index}`}>
            <Link to={`/food/${food.id}`}>
              <div className={styles.container}>
                <div>
                  <p className="text-lg">{food.name}</p>
                  <p className="text-base">{food.category}</p>
                </div>
                <div className="flex items-center my-1">
                  <Score
                    text={food.fodmap}
                    score={food.fodmap === "high" ? 2 : 0}
                    reversed={true}
                  />
                </div>
              </div>
            </Link>
            <div className="border-b-2 border-gray-300 mb-2" />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default FoodList;
