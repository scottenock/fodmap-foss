/// <reference lib="webworker" />
import { AutoProcessor, CLIPVisionModelWithProjection, RawImage, env } from "@huggingface/transformers";
import { MODEL, MODEL_DTYPE, ORT_FILES, RECOGNITION_PATH } from "./config";
import { embedCrops, fitWithin, MAX_DECODE_SIZE, similarities } from "./pipeline";
import { score } from "./scoring";
import { LabelIndex, RecognitionProgress, RecognitionResult } from "./types";

export type WorkerRequest =
  | { type: "load"; baseUrl: string }
  | { type: "recognise"; id: number; blob: Blob; baseUrl: string };

export type WorkerReply =
  | { type: "ready" }
  | { type: "progress"; id: number; progress: RecognitionProgress }
  | { type: "result"; id: number; result: RecognitionResult }
  | { type: "error"; id?: number; message: string };

type Assets = {
  index: LabelIndex;
  matrix: Float32Array;
  embed: (image: RawImage) => Promise<Float32Array>;
};

let loading: Promise<Assets> | null = null;

const reply = (message: WorkerReply) => self.postMessage(message);

const load = (baseUrl: string): Promise<Assets> => {
  if (loading) return loading;
  loading = (async () => {
    const root = new URL(RECOGNITION_PATH, baseUrl).href;
    env.allowRemoteModels = false;
    env.allowLocalModels = true;
    env.localModelPath = root;
    env.useBrowserCache = false;
    const wasm = env.backends.onnx.wasm;
    if (wasm) {
      const [mjs, wasmFile] = ORT_FILES;
      wasm.wasmPaths = { mjs: `${root}ort/${mjs}`, wasm: `${root}ort/${wasmFile}` };
    }
    const [labelsResponse, embeddingsResponse, processor, model] = await Promise.all([
      fetch(`${root}labels.json`),
      fetch(`${root}embeddings.bin`),
      AutoProcessor.from_pretrained(MODEL),
      CLIPVisionModelWithProjection.from_pretrained(MODEL, { dtype: MODEL_DTYPE, device: "wasm" }),
    ]);
    if (!labelsResponse.ok) throw new Error(`load labels: ${labelsResponse.status}`);
    if (!embeddingsResponse.ok) throw new Error(`load embeddings: ${embeddingsResponse.status}`);
    const index = (await labelsResponse.json()) as LabelIndex;
    const matrix = new Float32Array(await embeddingsResponse.arrayBuffer());
    const embed = async (image: RawImage) => {
      const inputs = await processor(image);
      const { image_embeds } = await model(inputs);
      return Float32Array.from(image_embeds.data as ArrayLike<number>);
    };
    return { index, matrix, embed };
  })();
  loading.catch(() => {
    loading = null;
  });
  return loading;
};

const recognise = async (id: number, blob: Blob, baseUrl: string) => {
  const progress = (progress: RecognitionProgress) => reply({ type: "progress", id, progress });
  progress({ stage: "loading-model", done: 0, total: 1 });
  const { index, matrix, embed } = await load(baseUrl);
  progress({ stage: "decoding", done: 0, total: 1 });
  let image = await RawImage.fromBlob(blob);
  const fitted = fitWithin(image.width, image.height, MAX_DECODE_SIZE);
  image = await image.resize(fitted.width, fitted.height);
  const embeddings = await embedCrops(image, embed, (done, total) => progress({ stage: "embedding", done, total }));
  const result = score(index, embeddings.map((e) => similarities(e, matrix, index.dim)));
  reply({ type: "result", id, result });
};

self.addEventListener("message", async (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;
  try {
    if (request.type === "load") {
      await load(request.baseUrl);
      reply({ type: "ready" });
    } else {
      await recognise(request.id, request.blob, request.baseUrl);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    reply({ type: "error", id: request.type === "recognise" ? request.id : undefined, message });
  }
});
