import { useContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AppContext, { ACTIONS, AppProvider } from "./AppContext";

const MockPage = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div>
      <button onClick={() => dispatch({ type: ACTIONS.HIGH_LOW_ORDER })}>
        HIGH-LOW
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.ALPHABETICAL_ORDER })}>
        A-Z
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.LOW_HIGH_ORDER })}>
        LOW-HIGH
      </button>
      <p>Sort Order: {state.sortOrder}</p>
    </div>
  );
};

describe("AppContext", () => {
  it("defaults to alphabetical sort order", () => {
    render(
      <AppProvider>
        <MockPage />
      </AppProvider>
    );
    expect(screen.getByText("Sort Order: a-z")).toBeInTheDocument();
  });

  it("updates sort order to high-low", () => {
    render(
      <AppProvider>
        <MockPage />
      </AppProvider>
    );
    fireEvent.click(screen.getByText("HIGH-LOW"));
    expect(screen.getByText("Sort Order: h-l")).toBeInTheDocument();
  });

  it("updates sort order to low-high", () => {
    render(
      <AppProvider>
        <MockPage />
      </AppProvider>
    );
    fireEvent.click(screen.getByText("LOW-HIGH"));
    expect(screen.getByText("Sort Order: l-h")).toBeInTheDocument();
  });
});
