// import Select from "react-select";

import { useEffect, useState } from "react";
import Button from "./Button";
import { Fodmap } from "../types/Fodmap";
import { sortAlphabetical, sortHighFodmap } from "../utilities/sort";

type FoodListFilterProps = {
  className?: string;
  foods: Fodmap[];
  setFoods: (foods: Fodmap[]) => void;
};

const styles = {
  button: "border rounded border-gray-800 px-2 py-1",
  selected: "bg-emerald-200",
};

const FoodListFilter: React.FC<FoodListFilterProps> = ({ foods, setFoods }) => {
  const [sort, setSort] = useState("a-z");
  const setProps = (sortTerm: string) => ({
    onClick: () => setSort(sortTerm),
    className: sortTerm === sort ? styles.selected : "",
  });

  useEffect(() => {
    if (sort === "a-z") {
      setFoods(foods.toSorted((f1, f2) => sortAlphabetical(f1, f2)));
    }
    if (sort === "l-h") {
      setFoods(foods.toSorted((f1, f2) => sortHighFodmap(f1, f2)).reverse());
    }
    if (sort === "h-l") {
      setFoods(foods.toSorted((f1, f2) => sortHighFodmap(f1, f2)));
    }
  }, [sort]);

  return (
    <div className="flex justify-around my-2">
      <Button {...setProps("l-h")}>Low-High</Button>
      <Button {...setProps("a-z")}>A-Z</Button>
      <Button {...setProps("h-l")}>High-Low</Button>
    </div>
  );
};

export default FoodListFilter;
