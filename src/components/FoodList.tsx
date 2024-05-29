import * as React from "react";
import { Fodmap } from "../types/Fodmap";

type FoodListProps = {
  foods: Fodmap[];
};

const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  return (
    <div className="">
      {foods.map((food) => (
        <div className="flex justify-between items-center bg-yellow-200 my-1">
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
