import { useContext } from "react";
import FoodListFilter from "./FoodListFilter";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AppContext, { AppProvider } from "../context/AppContext";

const MockPage = () => {
  const { state } = useContext(AppContext);

  return (
    <div>
      <p>Sort Order: {state.sortOrder}</p>
      <FoodListFilter />
    </div>
  );
};

describe("FoodListFilter", () => {
  it("the corresponding filter button will update the sortOder of the state", async () => {
    render(
      <AppProvider>
        <MockPage />
      </AppProvider>
    );

    expect(screen.getByText("Sort Order: a-z")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Low-High"));

    expect(screen.getByText("Sort Order: l-h")).toBeInTheDocument();

    fireEvent.click(screen.getByText("High-Low"));

    expect(screen.getByText("Sort Order: h-l")).toBeInTheDocument();

    fireEvent.click(screen.getByText("A-Z"));

    expect(screen.getByText("Sort Order: a-z")).toBeInTheDocument();
  });
});
