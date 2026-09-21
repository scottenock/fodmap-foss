import { describe, expect, it } from "vitest";
import fodmap from "../data/fodmap";
import { assemble, foodIdFor, labelProbabilities, score, THRESHOLDS } from "./scoring";
import { LabelIndex } from "./types";

const id = (name: string) => fodmap.find((f) => f.name === name)!.id;

const index: Pick<LabelIndex, "labels"> = {
  labels: [
    { kind: "food", id: id("Salmon"), name: "Salmon", rows: [0, 1] },
    { kind: "food", id: id("White rice"), name: "White rice", rows: [2] },
    { kind: "food", id: id("Mandarin"), name: "Mandarin", rows: [3] },
    { kind: "dish", id: "sushi", name: "Sushi", rows: [4] },
    { kind: "dish", id: "pizza", name: "Pizza", rows: [5] },
    { kind: "background", id: "a table", name: "a table", rows: [6] },
  ],
};

const sims = (values: number[]) => Float32Array.from(values);

describe("labelProbabilities", () => {
  it("scores foods and dishes in separate competitions", () => {
    const probs = labelProbabilities(index, [sims([0.3, 0.1, 0.1, 0.1, 0.3, 0.1, 0.1]), sims([0.3, 0.1, 0.1, 0.1, 0.3, 0.1, 0.1])]);
    expect(probs[0]).toBeGreaterThan(0.9);
    expect(probs[3]).toBeGreaterThan(0.9);
  });

  it("uses the best row of a multi-row label", () => {
    const probs = labelProbabilities(index, [sims([0.1, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1]), sims([0.1, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1])]);
    expect(probs[0]).toBeGreaterThan(0.9);
  });

  it("averages the two best crops for a food so a single odd tile is damped", () => {
    const full = sims([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]);
    const fluke = sims([0.1, 0.1, 0.1, 0.35, 0.1, 0.1, 0.1]);
    const probs = labelProbabilities(index, [full, fluke, full, full]);
    expect(probs[2]).toBeLessThan(0.7);
    expect(probs[2]).toBeGreaterThan(0.3);
  });

  it("scores a dish by the full view or the mean of all crops", () => {
    const full = sims([0.1, 0.1, 0.1, 0.1, 0.35, 0.1, 0.1]);
    const tile = sims([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]);
    const probs = labelProbabilities(index, [full, tile, tile, tile]);
    expect(probs[3]).toBeGreaterThan(0.9);
    const flukeOnly = labelProbabilities(index, [tile, full, tile, tile, tile, tile]);
    expect(flukeOnly[3]).toBeLessThan(0.5);
  });
});

describe("assemble", () => {
  const probabilities = (values: Partial<Record<number, number>>) =>
    Float32Array.from(index.labels.map((_, i) => values[i] ?? 0));

  it("selects confidently seen foods and shows weaker ones unticked", () => {
    const result = assemble(index, probabilities({ 0: 0.7, 2: 0.1 }));
    expect(result.dishes).toEqual([]);
    expect(result.candidates.map((c) => [c.foodId, c.selected])).toEqual([
      [id("Salmon"), true],
      [id("Mandarin"), false],
    ]);
  });

  it("hides foods below the show threshold", () => {
    const result = assemble(index, probabilities({ 2: THRESHOLDS.seenShow / 2 }));
    expect(result.candidates).toEqual([]);
  });

  it("expands a detected dish into core and common ingredients", () => {
    const result = assemble(index, probabilities({ 3: 0.9 }));
    expect(result.dishes.map((d) => d.name)).toEqual(["Sushi"]);
    const rice = result.candidates.find((c) => c.foodId === foodIdFor("White rice"))!;
    expect(rice).toMatchObject({ source: "dish", role: "core", selected: true, quantity: 3, dish: "Sushi" });
    const avocado = result.candidates.find((c) => c.foodId === foodIdFor("Avocado"))!;
    expect(avocado).toMatchObject({ source: "dish", role: "common", selected: false, quantity: 2 });
  });

  it("selects a weakly seen food when a detected dish lists it as an ingredient", () => {
    const result = assemble(index, probabilities({ 0: 0.15, 3: 0.9 }));
    const salmon = result.candidates.find((c) => c.foodId === id("Salmon"))!;
    expect(salmon).toMatchObject({ source: "seen", selected: true, dish: "Sushi", role: "common" });
    expect(result.candidates.filter((c) => c.foodId === id("Salmon"))).toHaveLength(1);
  });

  it("drops secondary dishes that are weak relative to the best one", () => {
    const result = assemble(index, probabilities({ 3: 0.9, 4: 0.25 }));
    expect(result.dishes.map((d) => d.name)).toEqual(["Sushi"]);
    const both = assemble(index, probabilities({ 3: 0.5, 4: 0.3 }));
    expect(both.dishes.map((d) => d.name)).toEqual(["Sushi", "Pizza"]);
  });

  it("orders selected before unselected and seen before inferred", () => {
    const result = assemble(index, probabilities({ 0: 0.8, 2: 0.1, 3: 0.9 }));
    const order = result.candidates.map((c) => `${c.selected}-${c.source}`);
    const firstUnselected = order.findIndex((o) => o.startsWith("false"));
    expect(order.slice(0, firstUnselected).every((o) => o.startsWith("true"))).toBe(true);
    expect(order[0]).toBe("true-seen");
  });

  it("scores end to end", () => {
    const result = score(index, [sims([0.3, 0.1, 0.1, 0.1, 0.3, 0.1, 0.1]), sims([0.3, 0.1, 0.1, 0.1, 0.3, 0.1, 0.1])]);
    expect(result.dishes[0].name).toBe("Sushi");
    expect(result.candidates[0].foodId).toBe(id("Salmon"));
  });
});
