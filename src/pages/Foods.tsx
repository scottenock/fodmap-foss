import { useState } from "react";
import fodmap from "../data/fodmap";
import { Fodmap } from "../types/Fodmap";
import FoodList from "../components/FoodList";
import FoodListSearch from "../components/FoodListSearch";
import FoodListFilter from "../components/FoodListFilter";

function Foods() {
  const [foods, setFoods] = useState<Fodmap[]>(fodmap);

  return (
    <>
      <FoodListSearch setFoods={setFoods} />
      <FoodListFilter foods={foods} setFoods={setFoods} />
      <FoodList foods={foods} />
    </>
  );
}

export default Foods;
