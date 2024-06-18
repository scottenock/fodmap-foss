import { useEffect, useState } from "react";
import fodmap from "../data/fodmap";
import { Fodmap } from "../types/Fodmap";
import FoodList from "../components/FoodList";
import FoodListSearch from "../components/FoodListSearch";
import FoodListFilter from "../components/FoodListFilter";

function Foods() {
  const [foods, setFoods] = useState<Fodmap[]>(fodmap);
  const [foodsToRender, setFoodsToRender] = useState<Fodmap[]>(fodmap);

  useEffect(() => {
    setFoodsToRender(foods);
  }, [foods]);

  return (
    <>
      <FoodListSearch foods={foods} setFoods={setFoodsToRender} />
      <FoodListFilter foods={foods} setFoods={setFoods} />
      <FoodList foods={foodsToRender} />
    </>
  );
}

export default Foods;
