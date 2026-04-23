import { useContext, useState } from "react";
import FoodList from "../components/FoodList";
import SortTabs from "../components/SortTabs";
import SearchInput from "../components/SearchInput";
import NavBar from "../components/NavBar";
import AppContext from "../context/AppContext";
import { useFoodList } from "../hooks/useFoodList";

function Foods() {
  const { state } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const foods = useFoodList(state.sortOrder, searchTerm);

  return (
    <>
      <NavBar className="!py-3">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </NavBar>
      <SortTabs />
      <FoodList foods={foods} />
    </>
  );
}

export default Foods;
