import { Link } from "react-router-dom";
import { Fodmap } from "../types/Fodmap";
import Score from "./Score";

type FoodListProps = {
  foods: Fodmap[];
};

const styles = {
  container: "flex justify-between items-center my-1 px-3",
};

const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  return (
    <div>
      {foods.map((food) => (
        <div key={food.id}>
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
    </div>
  );
};

export default FoodList;
