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
      <p>First: {state.foods[0].name}</p>
      <p>Second: {state.foods[1].name}</p>
      <p>Third: {state.foods[2].name}</p>
    </div>
  );
};

describe("AppContext", () => {
  it("The correct order is rendered when sort order: LOW-HIGH is dispatched", async () => {
    render(
      <AppProvider>
        <MockPage />
      </AppProvider>
    );

    expect(screen.getByText("First: Acesulfame K"));
    expect(screen.getByText("Second: Acorn Squash"));
    expect(screen.getByText("Third: Agave"));

    const input = screen.getByText("HIGH-LOW");
    fireEvent.click(input);

    expect(screen.getByText("First: Agave"));
    expect(screen.getByText("Second: Amaranth flour"));
    expect(screen.getByText("Third: Apple juice"));
  });

  it("The correct order is rendered when sort order: LOW-HIGH is dispatched", async () => {
    render(
      <AppProvider>
        <MockPage />
      </AppProvider>
    );

    expect(screen.getByText("First: Acesulfame K"));
    expect(screen.getByText("Second: Acorn Squash"));
    expect(screen.getByText("Third: Agave"));

    const input = screen.getByText("LOW-HIGH");
    fireEvent.click(input);

    expect(screen.getByText("First: Acesulfame K"));
    expect(screen.getByText("Second: Acorn Squash"));
    expect(screen.getByText("Third: Alfalfa sprouts"));
  });
});
