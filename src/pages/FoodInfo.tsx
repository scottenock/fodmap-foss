import fodmap from "../data/fodmap";
import { useParams } from "react-router-dom";
import FoodItem from "../components/FoodItem";

function FoodInfo() {
  const { id } = useParams();

  const food = fodmap.find((food) => food.id === id);

  return <>{food && <FoodItem food={food} />}</>;
}

export default FoodInfo;
