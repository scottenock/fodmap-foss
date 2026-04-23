import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import StarButton from "./StarButton";

describe("StarButton", () => {
  it("shows 'Add to favorites' label when not favorited", () => {
    render(<StarButton isFavorited={false} onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: "Add to favorites" })).toBeInTheDocument();
  });

  it("shows 'Remove from favorites' label when favorited", () => {
    render(<StarButton isFavorited={true} onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: "Remove from favorites" })).toBeInTheDocument();
  });

  it("calls onToggle when clicked", () => {
    const onToggle = vitest.fn();
    render(<StarButton isFavorited={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledOnce();
  });
});
