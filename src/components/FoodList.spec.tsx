import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { Fodmap } from "../types/Fodmap";
import { AppProvider } from "../context/AppContext";
import FoodList from "./FoodList";

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
      <AppProvider initialState={{ sortOrder: "a-z", favorites: [], log: {} }}>
        <MemoryRouter>
          <FoodList foods={items} />
        </MemoryRouter>
      </AppProvider>
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
      <AppProvider initialState={{ sortOrder: "a-z", favorites: [], log: {} }}>
        <MemoryRouter>
          <FoodList foods={items} />
        </MemoryRouter>
      </AppProvider>
    );

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/food/1");
    expect(links[1]).toHaveAttribute("href", "/food/2");
  });

  test("renders star buttons for each food item", () => {
    render(
      <AppProvider initialState={{ sortOrder: "a-z", favorites: [], log: {} }}>
        <MemoryRouter>
          <FoodList foods={items} />
        </MemoryRouter>
      </AppProvider>
    );

    const stars = screen.getAllByRole("button", { name: "Add to favorites" });
    expect(stars).toHaveLength(2);
  });

  test("renders a filled star for favorited items", () => {
    render(
      <AppProvider initialState={{ sortOrder: "a-z", favorites: ["1"], log: {} }}>
        <MemoryRouter>
          <FoodList foods={items} />
        </MemoryRouter>
      </AppProvider>
    );

    expect(
      screen.getByRole("button", { name: "Remove from favorites" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add to favorites" })
    ).toBeInTheDocument();
  });
});
