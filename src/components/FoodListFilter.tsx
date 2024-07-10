import { useContext } from "react";
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
  const { state, dispatch } = useContext(AppContext);

  const setProps = (sortTerm: string) => ({
    className:
      sortTerm === state.sortOrder
        ? `${styles.button} ${styles.selected}`
        : styles.button,
  });

  return (
    <div className={`${styles.container} ${className}`}>
      <Button
        onClick={() => dispatch({ type: ACTIONS.LOW_HIGH_ORDER })}
        {...setProps("l-h")}
      >
        Low-High
      </Button>
      <Button
        onClick={() => dispatch({ type: ACTIONS.ALPHABETICAL_ORDER })}
        {...setProps("a-z")}
      >
        A-Z
      </Button>
      <Button
        onClick={() => dispatch({ type: ACTIONS.HIGH_LOW_ORDER })}
        {...setProps("h-l")}
      >
        High-Low
      </Button>
    </div>
  );
};

export default FoodListFilter;
