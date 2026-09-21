import fodmap from "../data/fodmap";
import dishes from "./dishes";
import { Candidate, DetectedDish, LabelIndex, RecognitionResult } from "./types";

export const LOGIT_SCALE = 100;

export const THRESHOLDS = {
  dish: 0.2,
  dishRelative: 0.4,
  maxDishes: 3,
  maxSeen: 10,
  seenSelect: 0.4,
  seenShow: 0.08,
};

export const QUANTITY_DEFAULTS = { common: 2, core: 3, seen: 3 };

const foodIdByName = new Map(fodmap.map((f) => [f.name, f.id]));

export const foodIdFor = (name: string): string => {
  const id = foodIdByName.get(name);
  if (!id) throw new Error(`unknown food "${name}"`);
  return id;
};

const softmax = (logits: Float32Array): Float32Array => {
  let max = -Infinity;
  for (const l of logits) if (l > max) max = l;
  const out = new Float32Array(logits.length);
  let sum = 0;
  for (let i = 0; i < logits.length; i++) {
    out[i] = Math.exp(logits[i] - max);
    sum += out[i];
  }
  for (let i = 0; i < out.length; i++) out[i] /= sum;
  return out;
};

const groupProbabilities = (
  labels: LabelIndex["labels"],
  members: number[],
  cropSimilarities: Float32Array[],
): Float32Array[] =>
  cropSimilarities.map((sims) => {
    const logits = new Float32Array(members.length);
    members.forEach((m, i) => {
      let max = -Infinity;
      for (const r of labels[m].rows) if (sims[r] > max) max = sims[r];
      logits[i] = LOGIT_SCALE * max;
    });
    return softmax(logits);
  });

const topTwoMean = (values: number[]): number => {
  let first = 0;
  let second = 0;
  for (const v of values) {
    if (v > first) {
      second = first;
      first = v;
    } else if (v > second) {
      second = v;
    }
  }
  return values.length > 1 ? (first + second) / 2 : first;
};

const mean = (values: number[]): number => values.reduce((s, v) => s + v, 0) / values.length;

export const labelProbabilities = (index: Pick<LabelIndex, "labels">, cropSimilarities: Float32Array[]): Float32Array => {
  const { labels } = index;
  const background = labels.flatMap((l, i) => (l.kind === "background" ? [i] : []));
  const foods = labels.flatMap((l, i) => (l.kind === "food" ? [i] : []));
  const dishesIdx = labels.flatMap((l, i) => (l.kind === "dish" ? [i] : []));
  const result = new Float32Array(labels.length);

  const foodMembers = [...foods, ...background];
  const foodProbs = groupProbabilities(labels, foodMembers, cropSimilarities);
  foods.forEach((labelIdx, i) => {
    result[labelIdx] = topTwoMean(foodProbs.map((p) => p[i]));
  });

  const dishMembers = [...dishesIdx, ...background];
  const dishProbs = groupProbabilities(labels, dishMembers, cropSimilarities);
  dishesIdx.forEach((labelIdx, i) => {
    const perCrop = dishProbs.map((p) => p[i]);
    result[labelIdx] = Math.max(perCrop[0], mean(perCrop));
  });
  return result;
};

export const assemble = (index: Pick<LabelIndex, "labels">, probabilities: Float32Array): RecognitionResult => {
  const seen: Candidate[] = [];
  const detected: DetectedDish[] = [];
  index.labels.forEach((label, i) => {
    const confidence = probabilities[i];
    if (label.kind === "food" && confidence >= THRESHOLDS.seenShow) {
      seen.push({
        foodId: label.id,
        confidence,
        source: "seen",
        selected: confidence >= THRESHOLDS.seenSelect,
        quantity: QUANTITY_DEFAULTS.seen,
      });
    } else if (label.kind === "dish" && confidence >= THRESHOLDS.dish) {
      detected.push({ id: label.id, name: label.name, confidence });
    }
  });
  seen.sort((a, b) => b.confidence - a.confidence);
  detected.sort((a, b) => b.confidence - a.confidence);
  const topDishes = detected
    .filter((d) => d.confidence >= detected[0].confidence * THRESHOLDS.dishRelative)
    .slice(0, THRESHOLDS.maxDishes);

  const merged = new Map<string, Candidate>();
  for (const candidate of seen.slice(0, THRESHOLDS.maxSeen)) merged.set(candidate.foodId, candidate);
  for (const dish of topDishes) {
    const definition = dishes.find((d) => d.id === dish.id);
    if (!definition) continue;
    const ingredients = [
      ...definition.core.map((name) => ({ name, role: "core" as const })),
      ...definition.common.map((name) => ({ name, role: "common" as const })),
    ];
    for (const { name, role } of ingredients) {
      const foodId = foodIdFor(name);
      const existing = merged.get(foodId);
      if (existing) {
        if (!existing.dish) {
          existing.dish = dish.name;
          existing.role = role;
        }
        existing.selected = true;
        continue;
      }
      merged.set(foodId, {
        foodId,
        confidence: dish.confidence,
        source: "dish",
        dish: dish.name,
        role,
        selected: role === "core",
        quantity: QUANTITY_DEFAULTS[role],
      });
    }
  }

  const candidates = [...merged.values()].sort((a, b) => {
    if (a.selected !== b.selected) return a.selected ? -1 : 1;
    if (a.source !== b.source) return a.source === "seen" ? -1 : 1;
    return b.confidence - a.confidence;
  });
  return { dishes: topDishes, candidates };
};

export const score = (index: Pick<LabelIndex, "labels">, cropSimilarities: Float32Array[]): RecognitionResult =>
  assemble(index, labelProbabilities(index, cropSimilarities));
