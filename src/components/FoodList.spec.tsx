import FoodList from "./FoodList";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Fodmap } from "../types/Fodmap";
import { MemoryRouter } from "react-router-dom";

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
    render(
      <MemoryRouter>
        <FoodList foods={items} />
      </MemoryRouter>
    );

    expect(screen.getByText("apples")).toBeInTheDocument();
    expect(screen.getByText("Barbeque sauce")).toBeInTheDocument();
    expect(screen.getByText("Fruit")).toBeInTheDocument();
    expect(screen.getByText("Condiments")).toBeInTheDocument();
    expect(screen.getByText("high")).toBeInTheDocument();
    expect(screen.getByText("low")).toBeInTheDocument();
  });

  test("list items have the expected anchor tags", () => {
    render(
      <MemoryRouter>
        <FoodList foods={items} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute("href", "/food/1");
    expect(links[1]).toHaveAttribute("href", "/food/2");
  });
});
