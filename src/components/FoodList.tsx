import { Fodmap } from "../types/Fodmap";

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
        <div key={food.id} className={styles.container}>
          <div>
            <p className="text-lg">{food.name}</p>
            <p className="text-base">{food.category}</p>
          </div>
          <p className="text-3xl">{food.fodmap}</p>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
