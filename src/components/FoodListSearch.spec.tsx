import FoodListSearch from "./FoodListSearch";
import { describe, expect, it, vitest } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Fodmap } from "../types/Fodmap";
import fodmap from "../data/fodmap";
import { MemoryRouter } from "react-router-dom";

const items: Fodmap[] = [
  {
    id: "121",
    category: "Fruit",
    fodmap: "high",
    name: "apples",
    details: { oligos: 0, fructose: 2, polyols: 2, lactose: 0 },
  },
  {
    id: "128",
    category: "Condiments",
    fodmap: "low",
    name: "Barbeque sauce",
    details: { oligos: 0, fructose: 0, polyols: 0, lactose: 0 },
  },
  {
    id: "154",
    name: "Chickpeas, canned",
    fodmap: "low",
    category: "Vegetables and legumes",
    qty: "1/4 cup",
    details: { oligos: 0, fructose: 0, polyols: 0, lactose: 0 },
  },
  {
    id: "424",
    name: "Chickpeas, sprouted",
    fodmap: "high",
    category: "Vegetables and legumes",
    details: { oligos: 0, fructose: 0, polyols: 0, lactose: 0 },
  },
];

describe("FoodListSearch", () => {
  it("will filter and return the matching foods", async () => {
    const setFoods = vitest.fn();

    render(
      <MemoryRouter>
        <FoodListSearch setFoods={setFoods} foods={fodmap} />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Barbeque sauce" } });
    expect(setFoods).toHaveBeenCalledWith([items[1]]);
  });

  it("will filter and return the a partial match", async () => {
    const setFoods = vitest.fn();

    render(
      <MemoryRouter>
        <FoodListSearch setFoods={setFoods} foods={fodmap} />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "chickpeas" } });
    expect(setFoods).toHaveBeenCalledWith([items[2], items[3]]);
  });
});
