import type { RawImage } from "@huggingface/transformers";

export type Crop = { x: number; y: number; size: number };

export type Embedder = (image: RawImage) => Promise<Float32Array>;

export const MAX_DECODE_SIZE = 1024;

const TILE_FRACTION = 0.65;
const TILE_STEP = 0.6;
const ZOOM_FRACTION = 0.45;

const positions = (extent: number, size: number): number[] => {
  if (extent <= size) return [0];
  const count = Math.ceil((extent - size) / (size * TILE_STEP)) + 1;
  const stride = (extent - size) / (count - 1);
  return Array.from({ length: count }, (_, i) => Math.round(i * stride));
};

export const planCrops = (width: number, height: number, maxCrops = 9): Crop[] => {
  const shortest = Math.min(width, height);
  const crops: Crop[] = [{ x: Math.floor((width - shortest) / 2), y: Math.floor((height - shortest) / 2), size: shortest }];
  const tile = Math.round(shortest * TILE_FRACTION);
  for (const y of positions(height, tile)) {
    for (const x of positions(width, tile)) crops.push({ x, y, size: tile });
  }
  const zoom = Math.round(shortest * ZOOM_FRACTION);
  if (crops.length < maxCrops) {
    crops.push({ x: Math.floor((width - zoom) / 2), y: Math.floor((height - zoom) / 2), size: zoom });
  }
  return crops.slice(0, maxCrops);
};

export const fitWithin = (width: number, height: number, max: number): { width: number; height: number } => {
  const scale = Math.min(1, max / Math.max(width, height));
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
};

export const similarities = (embedding: Float32Array, matrix: Float32Array, dim: number): Float32Array => {
  const rows = matrix.length / dim;
  const out = new Float32Array(rows);
  for (let r = 0; r < rows; r++) {
    let sum = 0;
    const offset = r * dim;
    for (let i = 0; i < dim; i++) sum += matrix[offset + i] * embedding[i];
    out[r] = sum;
  }
  return out;
};

export const normalise = (vector: Float32Array): Float32Array => {
  let sum = 0;
  for (const v of vector) sum += v * v;
  const norm = Math.sqrt(sum) || 1;
  return vector.map((v) => v / norm);
};

export const embedCrops = async (
  image: RawImage,
  embed: Embedder,
  onProgress?: (done: number, total: number) => void,
): Promise<Float32Array[]> => {
  const crops = planCrops(image.width, image.height);
  const embeddings: Float32Array[] = [];
  onProgress?.(0, crops.length);
  for (const crop of crops) {
    const region = await image.crop([crop.x, crop.y, crop.x + crop.size - 1, crop.y + crop.size - 1]);
    embeddings.push(normalise(await embed(region)));
    onProgress?.(embeddings.length, crops.length);
  }
  return embeddings;
};
