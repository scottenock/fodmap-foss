import { useState } from "react";
import FoodList from "./components/FoodList";
import FoodListSearch from "./components/FoodListSearch";
import fodmap from "./data/fodmap";
import { Fodmap } from "./types/Fodmap";

function App() {
  const [foods, setFoods] = useState<Fodmap[]>(fodmap);

  return (
    <>
      <FoodListSearch setFoods={setFoods} />
      <FoodList foods={foods} />
    </>
  );
}

export default App;
