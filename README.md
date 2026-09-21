# FODMAP FOSS

<div style="text-align:center">

![FODMAPP FOSS Logo](cordova/res/mipmap/mipmap-xxxhdpi/ic_launcher_round.png)

</div>

A Free & Open Source FODMAP diet UI built for Android + Web.

Code is distributed under the GPLv3 license.

## Photo meal logging

The journal can recognise the foods on a plate from a photo and log them as a meal. Recognition runs
entirely on the device with a bundled [MobileCLIP-S2](https://huggingface.co/Xenova/mobileclip_s2)
vision encoder running on ONNX Runtime Web. Photos never leave the phone.

How it works:

1. `npm run prepare-recognition` downloads the fp16 vision encoder (about 80 MB), copies the ONNX
   Runtime wasm files, and embeds a text prompt for every recognisable food in `src/data/fodmap.ts`
   plus every dish in `src/recognition/dishes.ts`. The output lands in `public/models/recognition`
   (git-ignored) and is reused until the food list, aliases or dishes change. `npm run dev` and
   `npm run build` run this step automatically.
2. At runtime a web worker embeds the full photo plus overlapping tiles, compares each against the
   precomputed prompt embeddings, and scores foods and dishes separately. A recognised dish expands
   into its usual ingredients so hidden FODMAP sources such as onion and garlic are suggested too.
3. The user reviews the suggestions, unticks mistakes, sets portions, and adds the lot to the meal.

Tune what gets recognised in `src/recognition/labels.ts` (prompt aliases and exclusions) and
`src/recognition/dishes.ts`. Try the pipeline on sample photos from the command line with
`npm run recognise -- --debug photo.jpg`.

