import { useContext, useEffect, useState } from "react";
import AppContext, { ACTIONS } from "../context/AppContext";
import Button from "./Button";

type FoodListFilterProps = {
  className?: string;
};

const styles = {
  button: "border-none px-2 py-2 rounded-none w-1/3",
  selected: "border-none bg-white",
  container: "flex justify-around bg-gray-200",
};

const FoodListFilter: React.FC<FoodListFilterProps> = ({ className = "" }) => {
  const [sort, setSort] = useState("a-z");
  const { dispatch } = useContext(AppContext);

  const setProps = (sortTerm: string) => ({
    onClick: () => setSort(sortTerm),
    className:
      sortTerm === sort ? `${styles.button} ${styles.selected}` : styles.button,
  });

  useEffect(() => {
    if (sort === "a-z") {
      dispatch({ type: ACTIONS.ALPHABETICAL_ORDER });
    }
    if (sort === "l-h") {
      dispatch({ type: ACTIONS.LOW_HIGH_ORDER });
    }
    if (sort === "h-l") {
      dispatch({ type: ACTIONS.HIGH_LOW_ORDER });
    }
  }, [sort]);

  return (
    <div className={`${styles.container} ${className}`}>
      <Button {...setProps("l-h")}>Low-High</Button>
      <Button {...setProps("a-z")}>A-Z</Button>
      <Button {...setProps("h-l")}>High-Low</Button>
    </div>
  );
};

export default FoodListFilter;
