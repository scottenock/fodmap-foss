import { useContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AppContext, { AppProvider } from "../context/AppContext";
import SortTabs from "./SortTabs";

const MockPage = () => {
  const { state } = useContext(AppContext);
  return (
    <div>
      <p>Sort Order: {state.sortOrder}</p>
      <SortTabs />
    </div>
  );
};

describe("SortTabs", () => {
  it("updates the sort order when tabs are clicked", async () => {
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
