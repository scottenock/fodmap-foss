import { describe, expect, it } from "vitest";
import { fitWithin, normalise, planCrops, similarities } from "./pipeline";

describe("planCrops", () => {
  it("starts with the full centred square", () => {
    const [full] = planCrops(1000, 600);
    expect(full).toEqual({ x: 200, y: 0, size: 600 });
  });

  it("covers the whole image with tiles that stay inside the bounds", () => {
    for (const [w, h] of [[1000, 600], [600, 1000], [800, 800], [1024, 576]]) {
      const crops = planCrops(w, h);
      expect(crops.length).toBeLessThanOrEqual(9);
      expect(crops.length).toBeGreaterThan(3);
      for (const c of crops) {
        expect(c.x).toBeGreaterThanOrEqual(0);
        expect(c.y).toBeGreaterThanOrEqual(0);
        expect(c.x + c.size).toBeLessThanOrEqual(w);
        expect(c.y + c.size).toBeLessThanOrEqual(h);
      }
      const tiles = crops.slice(1);
      expect(Math.min(...tiles.map((c) => c.x))).toBe(0);
      expect(Math.max(...tiles.map((c) => c.x + c.size))).toBe(w);
    }
  });

  it("respects the crop cap", () => {
    expect(planCrops(4000, 1000, 5).length).toBe(5);
  });
});

describe("fitWithin", () => {
  it("scales down large images and leaves small ones alone", () => {
    expect(fitWithin(4000, 3000, 1024)).toEqual({ width: 1024, height: 768 });
    expect(fitWithin(500, 300, 1024)).toEqual({ width: 500, height: 300 });
  });
});

describe("similarities", () => {
  it("computes dot products against every row", () => {
    const matrix = Float32Array.from([1, 0, 0, 1, 0.5, 0.5]);
    const out = similarities(Float32Array.from([1, 0]), matrix, 2);
    expect([...out]).toEqual([1, 0, 0.5]);
  });

  it("normalises to unit length", () => {
    const n = normalise(Float32Array.from([3, 4]));
    expect(n[0]).toBeCloseTo(0.6);
    expect(n[1]).toBeCloseTo(0.8);
  });
});
