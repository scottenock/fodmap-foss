import { useContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AppContext, { ACTIONS, AppProvider } from "./AppContext";

const date = "2026-04-23";

const MockPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const logCount = state.log[date]?.["food-1"] ?? 0;
  const breakfastCount = state.meals[date]?.breakfast.length ?? 0;
  return (
    <div>
      <button onClick={() => dispatch({ type: ACTIONS.HIGH_LOW_ORDER })}>HIGH-LOW</button>
      <button onClick={() => dispatch({ type: ACTIONS.ALPHABETICAL_ORDER })}>A-Z</button>
      <button onClick={() => dispatch({ type: ACTIONS.LOW_HIGH_ORDER })}>LOW-HIGH</button>
      <button onClick={() => dispatch({ type: ACTIONS.LOG_FOOD, payload: { id: "food-1", date } })}>LOG</button>
      <button onClick={() => dispatch({ type: ACTIONS.UNLOG_FOOD, payload: { id: "food-1", date } })}>UNLOG</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_MEAL_FOOD, payload: { date, meal: "breakfast", foodId: "food-1" } })}>ADD MEAL</button>
      <button onClick={() => dispatch({ type: ACTIONS.REMOVE_MEAL_FOOD, payload: { date, meal: "breakfast", index: 0 } })}>REMOVE MEAL</button>
      <p>Sort Order: {state.sortOrder}</p>
      <p>Log count: {logCount}</p>
      <p>Breakfast count: {breakfastCount}</p>
    </div>
  );
};

const baseState = { sortOrder: "a-z", favorites: [], log: {}, meals: {} };

describe("AppContext", () => {
  it("defaults to alphabetical sort order", () => {
    render(<AppProvider><MockPage /></AppProvider>);
    expect(screen.getByText("Sort Order: a-z")).toBeInTheDocument();
  });

  it("updates sort order to high-low", () => {
    render(<AppProvider><MockPage /></AppProvider>);
    fireEvent.click(screen.getByText("HIGH-LOW"));
    expect(screen.getByText("Sort Order: h-l")).toBeInTheDocument();
  });

  it("updates sort order to low-high", () => {
    render(<AppProvider><MockPage /></AppProvider>);
    fireEvent.click(screen.getByText("LOW-HIGH"));
    expect(screen.getByText("Sort Order: l-h")).toBeInTheDocument();
  });

  it("increments log count when LOG_FOOD is dispatched", () => {
    render(<AppProvider><MockPage /></AppProvider>);
    fireEvent.click(screen.getByText("LOG"));
    fireEvent.click(screen.getByText("LOG"));
    expect(screen.getByText("Log count: 2")).toBeInTheDocument();
  });

  it("decrements log count when UNLOG_FOOD is dispatched", () => {
    render(
      <AppProvider initialState={{ ...baseState, log: { [date]: { "food-1": 3 } } }}>
        <MockPage />
      </AppProvider>
    );
    fireEvent.click(screen.getByText("UNLOG"));
    expect(screen.getByText("Log count: 2")).toBeInTheDocument();
  });

  it("removes the food entry when log count reaches 0", () => {
    render(
      <AppProvider initialState={{ ...baseState, log: { [date]: { "food-1": 1 } } }}>
        <MockPage />
      </AppProvider>
    );
    fireEvent.click(screen.getByText("UNLOG"));
    expect(screen.getByText("Log count: 0")).toBeInTheDocument();
  });

  it("adds a food to a meal when ADD_MEAL_FOOD is dispatched", () => {
    render(<AppProvider initialState={baseState}><MockPage /></AppProvider>);
    expect(screen.getByText("Breakfast count: 0")).toBeInTheDocument();
    fireEvent.click(screen.getByText("ADD MEAL"));
    expect(screen.getByText("Breakfast count: 1")).toBeInTheDocument();
  });

  it("removes a food from a meal when REMOVE_MEAL_FOOD is dispatched", () => {
    render(
      <AppProvider initialState={{ ...baseState, meals: { [date]: { breakfast: ["food-1"], lunch: [], dinner: [] } } }}>
        <MockPage />
      </AppProvider>
    );
    expect(screen.getByText("Breakfast count: 1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("REMOVE MEAL"));
    expect(screen.getByText("Breakfast count: 0")).toBeInTheDocument();
  });
});
