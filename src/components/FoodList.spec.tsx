import * as React from "react";
import FoodList from "./FoodList";
import { render, screen } from "@testing-library/react";
import { Fodmap } from "../types/Fodmap";

const items: Fodmap[] = [
  {
    id: "1",
    category: "Fruit",
    fodmap: "high",
    name: "apples",
    details: { oligos: 0, fructose: 2, polyols: 2, lactose: 0 },
  },
  {
    id: "2",
    category: "Barbeque sauce",
    fodmap: "low",
    name: "Condiments",
    details: { oligos: 2, fructose: 0, polyols: 0, lactose: 0 },
  },
];

describe("FoodList", () => {
  test("component renders expected text", () => {
    render(<FoodList foods={items} />);

    expect(screen.getByText("apples")).toBeInTheDocument();
    expect(screen.getByText("Barbeque sauce")).toBeInTheDocument();
    expect(screen.getByText("Fruit")).toBeInTheDocument();
    expect(screen.getByText("Condiments")).toBeInTheDocument();
    expect(screen.getByText("high")).toBeInTheDocument();
    expect(screen.getByText("low")).toBeInTheDocument();
  });
});
