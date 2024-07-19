import { ChangeEvent, useEffect, useState } from "react";
import { Fodmap } from "../types/Fodmap";

type FoodListSearchProps = {
  setFoods: (foods: Fodmap[]) => void;
  foods: Fodmap[];
};

const FoodListSearch: React.FC<FoodListSearchProps> = ({ setFoods, foods }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    const filteredFoods = foods.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
    setFoods(filteredFoods);
  }, [search]);

  return (
    <input
      placeholder="search..."
      className="appearance-none text-lg border-2 placeholder:text-white bg-green-400 border-green-300 rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:text-black text-white focus:border-white"
      type="text"
      onChange={handleChange}
    />
  );
};

export default FoodListSearch;
