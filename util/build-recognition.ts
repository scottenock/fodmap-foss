import crypto from "crypto";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { AutoTokenizer, CLIPTextModelWithProjection, env } from "@huggingface/transformers";
import { MODEL, MODEL_DTYPE, MODEL_REPO, ORT_FILES, RECOGNITION_PATH } from "../src/recognition/config";
import { buildLabelIndex, rowKinds, templatesFor } from "../src/recognition/labels";
import { LabelIndex } from "../src/recognition/types";

const outDir = path.join("public", RECOGNITION_PATH);
const modelDir = path.join(outDir, MODEL);
const suffix = MODEL_DTYPE === "fp32" ? "" : `_${MODEL_DTYPE}`;
const modelFiles = ["config.json", "preprocessor_config.json", `onnx/vision_model${suffix}.onnx`];

const download = async (file: string) => {
  const dest = path.join(modelDir, file);
  if (fs.existsSync(dest)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const url = `https://huggingface.co/${MODEL_REPO}/resolve/main/${file}`;
  console.log(`downloading ${url}`);
  const response = await fetch(url);
  if (!response.ok || !response.body) throw new Error(`download ${url}: ${response.status}`);
  await pipeline(Readable.fromWeb(response.body as never), fs.createWriteStream(`${dest}.part`));
  fs.renameSync(`${dest}.part`, dest);
};

const copyRuntime = () => {
  const ortDir = path.join(outDir, "ort");
  fs.mkdirSync(ortDir, { recursive: true });
  for (const file of ORT_FILES) {
    const source = path.join("node_modules", "onnxruntime-web", "dist", file);
    const dest = path.join(ortDir, file);
    if (fs.existsSync(dest) && fs.statSync(dest).size === fs.statSync(source).size) continue;
    console.log(`copying ${file}`);
    fs.copyFileSync(source, dest);
  }
};

const embed = async () => {
  const index = buildLabelIndex(MODEL, MODEL_DTYPE);
  const kinds = rowKinds(index);
  const prompts = index.rows.map((row, i) => templatesFor(kinds[i]).map((t) => t.replace("{}", row)));
  const hash = crypto.createHash("sha256").update(JSON.stringify({ model: MODEL, prompts })).digest("hex");
  const labelsPath = path.join(outDir, "labels.json");
  const embeddingsPath = path.join(outDir, "embeddings.bin");
  if (fs.existsSync(labelsPath) && fs.existsSync(embeddingsPath)) {
    const existing = JSON.parse(fs.readFileSync(labelsPath, "utf8")) as LabelIndex;
    if (existing.hash === hash) {
      console.log(`embeddings up to date (${index.rows.length} rows, ${index.labels.length} labels)`);
      return;
    }
  }
  console.log(`embedding ${index.rows.length} rows with ${MODEL_REPO}`);
  env.allowLocalModels = false;
  const tokenizer = await AutoTokenizer.from_pretrained(MODEL_REPO);
  const textModel = await CLIPTextModelWithProjection.from_pretrained(MODEL_REPO, { dtype: "fp32" });
  let dim = 0;
  const rows: Float32Array[] = [];
  const batch = 32;
  for (let start = 0; start < prompts.length; start += batch) {
    const chunk = prompts.slice(start, start + batch);
    const texts = chunk.flat();
    const inputs = tokenizer(texts, { padding: "max_length", truncation: true });
    const { text_embeds } = await textModel(inputs);
    const normalised = text_embeds.normalize().tolist() as number[][];
    dim = normalised[0].length;
    let offset = 0;
    for (const templates of chunk) {
      const mean = new Float32Array(dim);
      for (let t = 0; t < templates.length; t++) {
        const vector = normalised[offset + t];
        for (let i = 0; i < dim; i++) mean[i] += vector[i] / templates.length;
      }
      offset += templates.length;
      const norm = Math.sqrt(mean.reduce((s, v) => s + v * v, 0));
      rows.push(mean.map((v) => v / norm));
    }
    console.log(`  ${Math.min(start + batch, prompts.length)}/${prompts.length}`);
  }
  const matrix = new Float32Array(rows.length * dim);
  rows.forEach((row, r) => matrix.set(row, r * dim));
  fs.writeFileSync(embeddingsPath, Buffer.from(matrix.buffer));
  const labels: LabelIndex = { ...index, dim, hash };
  fs.writeFileSync(labelsPath, JSON.stringify(labels));
  console.log(`wrote ${embeddingsPath} (${rows.length} x ${dim}) and ${labelsPath}`);
};

for (const file of modelFiles) await download(file);
copyRuntime();
await embed();
