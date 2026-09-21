import { describe, expect, it } from "vitest";
import fodmap from "../data/fodmap";
import dishes from "./dishes";
import { aliasNames, buildLabelIndex, excludedNames, isRecognisable, promptsFor, rowKinds } from "./labels";

const names = new Set(fodmap.map((f) => f.name));

describe("recognition labels", () => {
  it("only excludes foods that exist in the database", () => {
    const missing = excludedNames().filter((n) => !names.has(n));
    expect(missing).toEqual([]);
  });

  it("only aliases foods that exist in the database", () => {
    const missing = aliasNames().filter((n) => !names.has(n));
    expect(missing).toEqual([]);
  });

  it("only references dish ingredients that exist in the database", () => {
    const missing = dishes.flatMap((d) => [...d.core, ...d.common]).filter((n) => !names.has(n));
    expect(missing).toEqual([]);
  });

  it("gives every dish a unique id and at least one prompt", () => {
    const ids = dishes.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const dish of dishes) expect(dish.prompts.length).toBeGreaterThan(0);
  });

  it("derives lowercase prompts without parentheses for unaliased foods", () => {
    const food = fodmap.find((f) => f.name === "Cabbage, red")!;
    expect(promptsFor(food)).toEqual(["red cabbage"]);
    const plain = fodmap.find((f) => f.name === "Broccoli")!;
    expect(promptsFor(plain)).toEqual(["broccoli"]);
  });

  it("keeps the recognisable majority of foods and drops non-visual ones", () => {
    const recognisable = fodmap.filter(isRecognisable);
    expect(recognisable.length).toBeGreaterThan(300);
    expect(isRecognisable(fodmap.find((f) => f.name === "Xanthan gum")!)).toBe(false);
  });

  it("builds an index whose rows are shared between labels of the same kind only", () => {
    const index = buildLabelIndex("test", "fp32");
    const kinds = rowKinds(index);
    expect(kinds.length).toBe(index.rows.length);
    const chickpeaLabels = index.labels.filter((l) => l.name.startsWith("Chickpeas") || l.name.startsWith("Garbanzo"));
    const shared = chickpeaLabels.map((l) => l.rows[0]);
    expect(new Set(shared).size).toBeLessThan(shared.length);
    const pizzaFood = index.labels.find((l) => l.name === "Pizza base, wheat")!;
    const pizzaDish = index.labels.find((l) => l.id === "pizza")!;
    expect(pizzaFood.rows).not.toContain(pizzaDish.rows[0]);
  });
});
