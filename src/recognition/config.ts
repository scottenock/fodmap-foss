export const MODEL = "mobileclip_s2";

// The q8 export of this model returns near-random embeddings; fp16 matches fp32 output at half the size.
export const MODEL_DTYPE = "fp16";

export const MODEL_REPO = `Xenova/${MODEL}`;

export const RECOGNITION_PATH = "models/recognition/";

export const ORT_FILES = ["ort-wasm-simd-threaded.mjs", "ort-wasm-simd-threaded.wasm"];
