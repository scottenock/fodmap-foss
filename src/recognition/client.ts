import { RecognitionProgress, RecognitionResult } from "./types";
import type { WorkerReply, WorkerRequest } from "./worker";

type Pending = {
  onProgress?: (progress: RecognitionProgress) => void;
  reject: (error: Error) => void;
  resolve: (result: RecognitionResult) => void;
};

let worker: Worker | null = null;
let nextId = 1;
const pending = new Map<number, Pending>();

const baseUrl = () => new URL(import.meta.env.BASE_URL, document.baseURI).href;

const failAll = (message: string) => {
  for (const request of pending.values()) request.reject(new Error(message));
  pending.clear();
};

const getWorker = (): Worker => {
  if (worker) return worker;
  worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
  worker.addEventListener("message", (event: MessageEvent<WorkerReply>) => {
    const reply = event.data;
    if (reply.type === "ready") return;
    if (reply.id === undefined) {
      if (reply.type === "error") failAll(reply.message);
      return;
    }
    const request = pending.get(reply.id);
    if (!request) return;
    if (reply.type === "progress") {
      request.onProgress?.(reply.progress);
      return;
    }
    pending.delete(reply.id);
    if (reply.type === "result") request.resolve(reply.result);
    else request.reject(new Error(reply.message));
  });
  worker.addEventListener("error", (event) => {
    failAll(event.message || "recognition worker crashed");
    worker?.terminate();
    worker = null;
  });
  return worker;
};

const post = (request: WorkerRequest) => getWorker().postMessage(request);

export const isRecognitionSupported = (): boolean =>
  typeof Worker !== "undefined" && typeof OffscreenCanvas !== "undefined" && typeof WebAssembly !== "undefined";

export const preloadRecogniser = () => {
  if (isRecognitionSupported()) post({ type: "load", baseUrl: baseUrl() });
};

export const recogniseFoods = (blob: Blob, onProgress?: (progress: RecognitionProgress) => void) =>
  new Promise<RecognitionResult>((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { onProgress, reject, resolve });
    post({ type: "recognise", id, blob, baseUrl: baseUrl() });
  });
