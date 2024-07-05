import { ChangeEvent, useEffect, useState } from "react";
import options from "../icons/vertical-dots.svg";
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
    <div className="bg-green-400 p-2 flex items-center">
      <input
        placeholder="search..."
        className="appearance-none border-2 placeholder:text-white bg-green-400 border-green-300 rounded-full w-full mr-3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:text-black text-white focus:border-white"
        type="text"
        onChange={handleChange}
      />
      <img src={options} className="w-5 h-5" />
    </div>
  );
};

export default FoodListSearch;
