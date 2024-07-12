import { ChangeEvent, useEffect, useState } from "react";
import options from "../icons/vertical-dots.svg";
import { Fodmap } from "../types/Fodmap";
import leftArrow from "../icons/arrow-left-solid.svg";
import { useNavigate } from "react-router-dom";

type FoodListSearchProps = {
  setFoods: (foods: Fodmap[]) => void;
  foods: Fodmap[];
};

const styles = {
  container: "p-4 bg-green-400 flex justify-between",
  icons: "w-5 h-5 mx-3 cursor-pointer",
};

const FoodListSearch: React.FC<FoodListSearchProps> = ({ setFoods, foods }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    const filteredFoods = foods.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
    setFoods(filteredFoods);
  }, [search]);

  return (
    <div className="bg-green-400 px-2 py-3 flex items-center">
      <img
        src={leftArrow}
        className={styles.icons}
        onClick={() => navigate("/")}
      />
      <input
        placeholder="search..."
        className="appearance-none text-lg border-2 placeholder:text-white bg-green-400 border-green-300 rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:text-black text-white focus:border-white"
        type="text"
        onChange={handleChange}
      />
      <img src={options} className={styles.icons} />
    </div>
  );
};

export default FoodListSearch;
