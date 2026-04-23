import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import alphabetical from "../data/alphabetical";
import high from "../data/high";
import low from "../data/low";
import { useFoodList } from "./useFoodList";

describe("useFoodList", () => {
  it("returns alphabetical foods for a-z order", () => {
    const { result } = renderHook(() => useFoodList("a-z", "", []));
    expect(result.current).toBe(alphabetical);
  });

  it("returns high-first foods for h-l order", () => {
    const { result } = renderHook(() => useFoodList("h-l", "", []));
    expect(result.current).toBe(high);
  });

  it("returns low-first foods for l-h order", () => {
    const { result } = renderHook(() => useFoodList("l-h", "", []));
    expect(result.current).toBe(low);
  });

  it("filters by search term case-insensitively", () => {
    const { result } = renderHook(() => useFoodList("a-z", "apple", []));
    expect(
      result.current.every((f) => f.name.toLowerCase().includes("apple"))
    ).toBe(true);
  });

  it("returns all foods when search term is cleared", () => {
    const { result, rerender } = renderHook(
      ({ term }) => useFoodList("a-z", term, []),
      { initialProps: { term: "apple" } }
    );
    rerender({ term: "" });
    expect(result.current).toBe(alphabetical);
  });

  it("filters by a single selected category", () => {
    const { result } = renderHook(() => useFoodList("a-z", "", ["Fruit"]));
    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current.every((f) => f.category === "Fruit")).toBe(true);
  });

  it("filters by multiple selected categories", () => {
    const { result } = renderHook(() =>
      useFoodList("a-z", "", ["Fruit", "Dairy"])
    );
    expect(result.current.length).toBeGreaterThan(0);
    expect(
      result.current.every(
        (f) => f.category === "Fruit" || f.category === "Dairy"
      )
    ).toBe(true);
  });

  it("applies both search and category filters together", () => {
    const { result } = renderHook(() =>
      useFoodList("a-z", "a", ["Fruit"])
    );
    expect(
      result.current.every(
        (f) => f.category === "Fruit" && f.name.toLowerCase().includes("a")
      )
    ).toBe(true);
  });

  it("returns the base array reference when no filters are active", () => {
    const { result } = renderHook(() => useFoodList("a-z", "", []));
    expect(result.current).toBe(alphabetical);
  });

  it("returns only favorited foods when showFavoritesOnly is true", () => {
    const favorites = [alphabetical[0].id, alphabetical[1].id];
    const { result } = renderHook(() =>
      useFoodList("a-z", "", [], favorites, true)
    );
    expect(result.current).toHaveLength(2);
    expect(result.current.every((f) => favorites.includes(f.id))).toBe(true);
  });

  it("returns an empty list when showFavoritesOnly is true and there are no favorites", () => {
    const { result } = renderHook(() => useFoodList("a-z", "", [], [], true));
    expect(result.current).toHaveLength(0);
  });

  it("combines favorites filter with search term", () => {
    const favFood = alphabetical.find((f) =>
      f.name.toLowerCase().includes("a")
    )!;
    const { result } = renderHook(() =>
      useFoodList("a-z", "a", [], [favFood.id], true)
    );
    expect(result.current.every((f) => f.id === favFood.id)).toBe(true);
  });
});
