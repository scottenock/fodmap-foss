import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
  it("renders with the provided value", () => {
    render(<SearchInput value="apple" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("apple");
  });

  it("calls onChange with the new input value", () => {
    const onChange = vitest.fn();
    render(<SearchInput value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "banana" },
    });
    expect(onChange).toHaveBeenCalledWith("banana");
  });
});
