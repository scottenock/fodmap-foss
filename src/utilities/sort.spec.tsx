import { sortAlphabetical, sortHighFodmap } from "./sort";
import { describe, expect, it } from "vitest";

const fodmap = (name: string, fodmap: string = "high") => ({
  id: "121",
  category: "Fruit",
  fodmap,
  name,
  details: { oligos: 0, fructose: 2, polyols: 2, lactose: 0 },
});

describe("sortAlphabetical", () => {
  it("will return 0 if the values are identical", async () => {
    const value = sortAlphabetical(fodmap("apples"), fodmap("apples"));

    expect(value).toBe(0);
  });

  it("will return 1 if the first value comes after the second value", async () => {
    const value = sortAlphabetical(fodmap("banana"), fodmap("apples"));

    expect(value).toBe(1);
  });

  it("will return -1 if the first value comes before the second value", async () => {
    const value = sortAlphabetical(fodmap("apples"), fodmap("pear"));

    expect(value).toBe(-1);
  });
});

describe("sortHighFodmap (high-low)", () => {
  it("will return 0 if the values are identical", async () => {
    const value = sortHighFodmap(
      fodmap("apples", "high"),
      fodmap("banana", "high")
    );

    expect(value).toBe(0);
  });

  it("will return 1 if the first value comes after the second value", async () => {
    const value = sortHighFodmap(
      fodmap("apples", "low"),
      fodmap("banana", "high")
    );
    expect(value).toBe(1);
  });

  it("will return -1 if the first value comes before the second value", async () => {
    const value = sortHighFodmap(
      fodmap("apples", "high"),
      fodmap("banana", "low")
    );
    expect(value).toBe(-1);
  });
});
