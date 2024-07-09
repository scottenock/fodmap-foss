import { useContext, useEffect, useState } from "react";
import FoodList from "../components/FoodList";
import FoodListFilter from "../components/FoodListFilter";
import FoodListSearch from "../components/FoodListSearch";
import AppContext from "../context/AppContext";
import { Fodmap } from "../types/Fodmap";

function Foods() {
  const { state } = useContext(AppContext);
  const [foodsToRender, setFoodsToRender] = useState<Fodmap[]>(state.foods);

  useEffect(() => {
    setFoodsToRender(state.foods);
  }, [state.foods]);

  return (
    <>
      <FoodListSearch foods={state.foods} setFoods={setFoodsToRender} />
      <FoodListFilter />
      <FoodList foods={foodsToRender} />
    </>
  );
}

export default Foods;
