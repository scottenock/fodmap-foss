import { useEffect, useState } from "react";
import alphabetical from "../data/alphabetical";
import high from "../data/high";
import low from "../data/low";
import { Fodmap } from "../types/Fodmap";
import Button from "./Button";

type FoodListFilterProps = {
  className?: string;
  setFoods: (foods: Fodmap[]) => void;
};

const styles = {
  button: "border-none px-2 py-2 rounded-none w-1/3",
  selected: "border-none bg-white",
};

const FoodListFilter: React.FC<FoodListFilterProps> = ({ setFoods }) => {
  const [sort, setSort] = useState("a-z");
  const setProps = (sortTerm: string) => ({
    onClick: () => setSort(sortTerm),
    className:
      sortTerm === sort ? `${styles.button} ${styles.selected}` : styles.button,
  });

  useEffect(() => {
    if (sort === "a-z") {
      setFoods(alphabetical);
    }
    if (sort === "l-h") {
      setFoods([...low, ...high]);
    }
    if (sort === "h-l") {
      setFoods([...high, ...low]);
    }
  }, [sort]);

  return (
    <div className="flex justify-around bg-gray-200">
      <Button {...setProps("l-h")}>Low-High</Button>
      <Button {...setProps("a-z")}>A-Z</Button>
      <Button {...setProps("h-l")}>High-Low</Button>
    </div>
  );
};

export default FoodListFilter;
