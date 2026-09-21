import fs from "fs";
import path from "path";
import { AutoProcessor, CLIPVisionModelWithProjection, RawImage, env } from "@huggingface/transformers";
import fodmap from "../src/data/fodmap";
import { MODEL, MODEL_DTYPE, RECOGNITION_PATH } from "../src/recognition/config";
import { embedCrops, fitWithin, MAX_DECODE_SIZE, similarities } from "../src/recognition/pipeline";
import { labelProbabilities, assemble } from "../src/recognition/scoring";
import { LabelIndex } from "../src/recognition/types";

const args = process.argv.slice(2);
const debug = args.includes("--debug");
const files = args.filter((a) => !a.startsWith("--"));
if (files.length === 0) {
  console.error("usage: tsx util/recognise.ts [--debug] <image>...");
  process.exit(1);
}

const dir = path.resolve("public", RECOGNITION_PATH);
env.allowRemoteModels = false;
env.localModelPath = dir;
const index = JSON.parse(fs.readFileSync(path.join(dir, "labels.json"), "utf8")) as LabelIndex;
const raw = fs.readFileSync(path.join(dir, "embeddings.bin"));
const matrix = new Float32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4);

const processor = await AutoProcessor.from_pretrained(MODEL);
const model = await CLIPVisionModelWithProjection.from_pretrained(MODEL, { dtype: MODEL_DTYPE });
const embed = async (image: RawImage) => {
  const inputs = await processor(image);
  const { image_embeds } = await model(inputs);
  return Float32Array.from(image_embeds.data as ArrayLike<number>);
};

const nameOf = (id: string) => fodmap.find((f) => f.id === id)?.name ?? id;
const pct = (v: number) => `${Math.round(v * 100)}%`;

for (const file of files) {
  const started = Date.now();
  let image = await RawImage.read(file);
  const fitted = fitWithin(image.width, image.height, MAX_DECODE_SIZE);
  image = await image.resize(fitted.width, fitted.height);
  const embeddings = await embedCrops(image, embed);
  const sims = embeddings.map((e) => similarities(e, matrix, index.dim));
  const probabilities = labelProbabilities(index, sims);
  const result = assemble(index, probabilities);
  console.log(`\n== ${path.basename(file)} (${embeddings.length} crops, ${Date.now() - started}ms)`);
  if (result.dishes.length) console.log("dishes:", result.dishes.map((d) => `${d.name} ${pct(d.confidence)}`).join(", "));
  for (const c of result.candidates) {
    const via = c.dish ? ` via ${c.dish} (${c.role})` : "";
    console.log(`  [${c.selected ? "x" : " "}] ${nameOf(c.foodId)} ${pct(c.confidence)}${via}`);
  }
  if (debug) {
    const top = [...probabilities].map((p, i) => [p, i] as const).sort((a, b) => b[0] - a[0]).slice(0, 12);
    console.log("  top labels:", top.map(([p, i]) => `${index.labels[i].name} ${pct(p)}`).join(" | "));
  }
}
