import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";

// The ONNX runtime is served from public/models/recognition/ort, so the copy the worker bundle drags in is dead weight.
const dropBundledOrtWasm = (): Plugin => ({
  name: "drop-bundled-ort-wasm",
  generateBundle(_, bundle) {
    for (const name of Object.keys(bundle)) if (/ort-wasm-.*\.wasm$/.test(name)) delete bundle[name];
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "cordova/www",
    target: "es2022",
  },
  optimizeDeps: {
    exclude: ["@huggingface/transformers"],
  },
  worker: {
    format: "es",
    plugins: () => [dropBundledOrtWasm()],
  },
});
