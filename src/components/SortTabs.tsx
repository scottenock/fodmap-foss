import { useContext } from "react";
import AppContext, { ACTIONS } from "../context/AppContext";

type SortTabsProps = {
  className?: string;
};

const styles = {
  button: "border-none px-2 py-2 rounded-none w-1/3",
  selected: "bg-white",
  container: "flex justify-around bg-gray-200",
};

const SortTabs: React.FC<SortTabsProps> = ({ className = "" }) => {
  const { state, dispatch } = useContext(AppContext);

  const buttonClass = (sortTerm: string) =>
    sortTerm === state.sortOrder
      ? `${styles.button} ${styles.selected}`
      : styles.button;

  return (
    <div className={`${styles.container} ${className}`}>
      <button
        className={buttonClass("l-h")}
        onClick={() => dispatch({ type: ACTIONS.LOW_HIGH_ORDER })}
      >
        Low-High
      </button>
      <button
        className={buttonClass("a-z")}
        onClick={() => dispatch({ type: ACTIONS.ALPHABETICAL_ORDER })}
      >
        A-Z
      </button>
      <button
        className={buttonClass("h-l")}
        onClick={() => dispatch({ type: ACTIONS.HIGH_LOW_ORDER })}
      >
        High-Low
      </button>
    </div>
  );
};

export default SortTabs;
