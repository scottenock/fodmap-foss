import { useContext, useEffect, useState } from "react";
import FoodList from "../components/FoodList";
import FoodListFilter from "../components/FoodListFilter";
import FoodListSearch from "../components/FoodListSearch";
import AppContext from "../context/AppContext";
import { Fodmap } from "../types/Fodmap";
import NavBar from "../components/NavBar";

function Foods() {
  const { state } = useContext(AppContext);
  const [foodsToRender, setFoodsToRender] = useState<Fodmap[]>(state.foods);

  useEffect(() => {
    setFoodsToRender(state.foods);
  }, [state.foods]);

  return (
    <>
      <NavBar className="!py-3">
        <FoodListSearch foods={state.foods} setFoods={setFoodsToRender} />
      </NavBar>
      <FoodListFilter />
      <FoodList foods={foodsToRender} />
    </>
  );
}

export default Foods;
