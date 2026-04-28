import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test } from "vitest";
import fodmap from "../data/fodmap";
import FoodDetail from "./FoodDetail";

describe("FoodDetail", () => {
  test("renders name, category, and FODMAP breakdown for a known food", () => {
    const food = fodmap[0];

    render(
      <MemoryRouter initialEntries={[`/food/${food.id}`]}>
        <Routes>
          <Route path="/food/:id" element={<FoodDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(food.name)).toBeInTheDocument();
    expect(screen.getByText(food.category)).toBeInTheDocument();
    expect(screen.getByText("Oligos")).toBeInTheDocument();
    expect(screen.getAllByText("Fructose").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Polyols").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Lactose").length).toBeGreaterThan(0);
  });

  test("renders nothing for an unknown food id", () => {
    render(
      <MemoryRouter initialEntries={["/food/unknown-id"]}>
        <Routes>
          <Route path="/food/:id" element={<FoodDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Oligos")).not.toBeInTheDocument();
  });
});
