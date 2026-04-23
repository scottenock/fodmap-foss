import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import alphabetical from "../data/alphabetical";
import high from "../data/high";
import low from "../data/low";
import { useFoodList } from "./useFoodList";

describe("useFoodList", () => {
  it("returns alphabetical foods for a-z order", () => {
    const { result } = renderHook(() => useFoodList("a-z", ""));
    expect(result.current).toBe(alphabetical);
  });

  it("returns high-first foods for h-l order", () => {
    const { result } = renderHook(() => useFoodList("h-l", ""));
    expect(result.current).toBe(high);
  });

  it("returns low-first foods for l-h order", () => {
    const { result } = renderHook(() => useFoodList("l-h", ""));
    expect(result.current).toBe(low);
  });

  it("filters by search term case-insensitively", () => {
    const { result } = renderHook(() => useFoodList("a-z", "apple"));
    expect(
      result.current.every((f) => f.name.toLowerCase().includes("apple"))
    ).toBe(true);
  });

  it("returns all foods when search term is cleared", () => {
    const { result, rerender } = renderHook(
      ({ term }) => useFoodList("a-z", term),
      { initialProps: { term: "apple" } }
    );
    rerender({ term: "" });
    expect(result.current).toBe(alphabetical);
  });
});
