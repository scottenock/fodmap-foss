import { ChangeEvent, useEffect, useState } from "react";
import { Fodmap } from "../types/Fodmap";
import fodmap from "../data/fodmap";

type FoodListSearchProps = {
  setFoods: (foods: Fodmap[]) => void;
};

const FoodListSearch: React.FC<FoodListSearchProps> = ({ setFoods }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    const filteredFoods = fodmap.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
    setFoods(filteredFoods);
  }, [search]);

  return (
    <input
      className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      type="text"
      onChange={handleChange}
    />
  );
};

export default FoodListSearch;
