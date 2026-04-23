import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import FilterMenu from "./FilterMenu";

const categories = ["Fruit", "Dairy", "Drinks"];
const noop = () => {};

const defaultProps = {
  sortOrder: "a-z",
  onSortChange: noop,
  showFavoritesOnly: false,
  onToggleFavoritesOnly: noop,
  categories,
  selectedCategories: [] as string[],
  onCategoryToggle: noop,
  onClearCategories: noop,
  onClose: noop,
};

describe("FilterMenu", () => {
  it("renders all sort options", () => {
    render(<FilterMenu {...defaultProps} />);
    expect(screen.getByText("Low → High")).toBeInTheDocument();
    expect(screen.getByText("A-Z")).toBeInTheDocument();
    expect(screen.getByText("High → Low")).toBeInTheDocument();
  });

  it("calls onSortChange with the correct order value", () => {
    const onSortChange = vitest.fn();
    render(<FilterMenu {...defaultProps} onSortChange={onSortChange} />);
    fireEvent.click(screen.getByText("Low → High"));
    expect(onSortChange).toHaveBeenCalledWith("l-h");
    fireEvent.click(screen.getByText("High → Low"));
    expect(onSortChange).toHaveBeenCalledWith("h-l");
  });

  it("renders all category checkboxes", () => {
    render(<FilterMenu {...defaultProps} />);
    categories.forEach((cat) =>
      expect(screen.getByText(cat)).toBeInTheDocument()
    );
  });

  it("calls onCategoryToggle when a category is clicked", () => {
    const onCategoryToggle = vitest.fn();
    render(<FilterMenu {...defaultProps} onCategoryToggle={onCategoryToggle} />);
    fireEvent.click(screen.getByText("Fruit"));
    expect(onCategoryToggle).toHaveBeenCalledWith("Fruit");
  });

  it("shows Clear all button only when categories are selected", () => {
    const { rerender } = render(<FilterMenu {...defaultProps} />);
    expect(screen.queryByText("Clear all")).not.toBeInTheDocument();

    rerender(<FilterMenu {...defaultProps} selectedCategories={["Fruit"]} />);
    expect(screen.getByText("Clear all")).toBeInTheDocument();
  });

  it("calls onClearCategories when Clear all is clicked", () => {
    const onClearCategories = vitest.fn();
    render(
      <FilterMenu
        {...defaultProps}
        selectedCategories={["Fruit"]}
        onClearCategories={onClearCategories}
      />
    );
    fireEvent.click(screen.getByText("Clear all"));
    expect(onClearCategories).toHaveBeenCalledOnce();
  });

  it("renders the Favorites only button", () => {
    render(<FilterMenu {...defaultProps} />);
    expect(screen.getByRole("button", { name: /favorites only/i })).toBeInTheDocument();
  });

  it("calls onToggleFavoritesOnly when the Favorites only button is clicked", () => {
    const onToggleFavoritesOnly = vitest.fn();
    render(
      <FilterMenu
        {...defaultProps}
        onToggleFavoritesOnly={onToggleFavoritesOnly}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /favorites only/i }));
    expect(onToggleFavoritesOnly).toHaveBeenCalledOnce();
  });

  it("calls onClose when the overlay is clicked", () => {
    const onClose = vitest.fn();
    const { container } = render(<FilterMenu {...defaultProps} onClose={onClose} />);
    const overlay = container.querySelector(".fixed.inset-0") as HTMLElement;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
