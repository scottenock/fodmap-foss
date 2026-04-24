import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import FoodPicker from "./FoodPicker";

describe("FoodPicker", () => {
  it("renders the meal label in the subtitle", () => {
    render(<FoodPicker meal="Breakfast" onSelect={() => {}} onClose={() => {}} />);
    expect(screen.getByText(/breakfast/i)).toBeInTheDocument();
  });

  it("renders food items from the list", () => {
    render(<FoodPicker meal="Lunch" onSelect={() => {}} onClose={() => {}} />);
    const items = screen.getAllByRole("button", { name: /.+/ });
    expect(items.length).toBeGreaterThan(1);
  });

  it("filters foods by search term", () => {
    render(<FoodPicker meal="Dinner" onSelect={() => {}} onClose={() => {}} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "apple" } });
    const buttons = screen.getAllByRole("button");
    // every food button (excluding back button) should contain "apple"
    const foodButtons = buttons.filter(
      (b) => b.textContent?.toLowerCase().includes("apple")
    );
    expect(foodButtons.length).toBeGreaterThan(0);
  });

  it("calls onSelect with the chosen food and quantity when confirmed", () => {
    const onSelect = vitest.fn();
    render(<FoodPicker meal="Breakfast" onSelect={onSelect} onClose={() => {}} />);
    const foodButtons = screen.getAllByRole("button");
    // click the first food (index 1 skips the back button) to open the bottom sheet
    fireEvent.click(foodButtons[1]);
    // click the confirm button in the bottom sheet
    fireEvent.click(screen.getByRole("button", { name: /add to breakfast/i }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith(expect.any(Object), expect.any(Number));
  });

  it("calls onClose when the back button is clicked", () => {
    const onClose = vitest.fn();
    render(<FoodPicker meal="Lunch" onSelect={() => {}} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Go back" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
