import { useState } from "react";
import fodmap from "../data/fodmap";
import { Fodmap } from "../types/Fodmap";
import { useParams } from "react-router-dom";

function FoodInfo() {
  const [foods, setFoods] = useState<Fodmap[]>(fodmap);
  const { id } = useParams();

  return (
    <>
      <h1>{id}</h1>
    </>
  );
}

export default FoodInfo;
