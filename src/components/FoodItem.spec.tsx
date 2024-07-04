import FoodList from "./FoodList";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Fodmap } from "../types/Fodmap";
import { MemoryRouter } from "react-router-dom";
import FoodItem from "./FoodItem";

const items: Fodmap[] = [
  {
    id: "1",
    category: "Fruit",
    fodmap: "high",
    name: "apples",
    qty: "2",
    details: { oligos: 0, fructose: 2, polyols: 2, lactose: 0 },
  },
  {
    id: "2",
    category: "Condiments",
    fodmap: "low",
    name: "Barbeque sauce",
    details: { oligos: 2, fructose: 0, polyols: 0, lactose: 0 },
  },
];

describe("FoodItem", () => {
  test("component renders the expected text (Apples)", () => {
    render(
      <MemoryRouter>
        <FoodItem food={items[0]} />
      </MemoryRouter>
    );

    expect(screen.getByText("apples")).toBeInTheDocument();
    expect(screen.getByText("Fruit")).toBeInTheDocument();
    expect(screen.getByText("Max Quantity: 2")).toBeInTheDocument();
    expect(screen.getByText("HIGH")).toBeInTheDocument();
    expect(screen.getByText("Oligos")).toBeInTheDocument();
    expect(screen.getByText("Fructose")).toBeInTheDocument();
    expect(screen.getByText("Polyols")).toBeInTheDocument();
    expect(screen.getByText("Lactose")).toBeInTheDocument();
  });

  test("component renders the expected text (BBQ sauce)", () => {
    render(
      <MemoryRouter>
        <FoodItem food={items[1]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Barbeque sauce")).toBeInTheDocument();
    expect(screen.getByText("Condiments")).toBeInTheDocument();
    expect(screen.getByText("Max Quantity: unspecified")).toBeInTheDocument();
    expect(screen.getByText("LOW")).toBeInTheDocument();
    expect(screen.getByText("Oligos")).toBeInTheDocument();
    expect(screen.getByText("Fructose")).toBeInTheDocument();
    expect(screen.getByText("Polyols")).toBeInTheDocument();
    expect(screen.getByText("Lactose")).toBeInTheDocument();
  });
});
