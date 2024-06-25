import { Fodmap } from "../types/Fodmap";
import { Link } from "react-router-dom";

type FoodListProps = {
  foods: Fodmap[];
};

const styles = {
  container: "flex justify-between items-center bg-yellow-200 my-1",
};

const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  return (
    <div>
      {foods.map((food) => (
        <Link to={`/food/${food.id}`} key={food.id}>
          <div key={food.id} className={styles.container}>
            <div>
              <p className="text-lg">{food.name}</p>
              <p className="text-base">{food.category}</p>
            </div>
            <p className="text-3xl">{food.fodmap.toUpperCase()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FoodList;
