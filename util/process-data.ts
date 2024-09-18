import fodmap from "../src/data/fodmap";
import fs from "fs";

const alphabetical = fodmap.sort((a, b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return 0;
});

fs.writeFileSync(
  "./src/data/alphabetical.ts",
  `export default ${JSON.stringify(alphabetical)}`
);

const high = fodmap.sort((a, b) => {
  if (a.fodmap === "high" && b.fodmap === "high") {
    return 0;
  }

  if (a.fodmap === "high") {
    return -1;
  }
  return 1;
});

fs.writeFileSync(
  "./src/data/high.ts",
  `export default ${JSON.stringify(high)}`
);

const low = fodmap.sort((a, b) => {
  if (a.fodmap === "low" && b.fodmap === "low") {
    return 0;
  }

  if (a.fodmap === "low") {
    return -1;
  }
  return 1;
});

fs.writeFileSync("./src/data/low.ts", `export default ${JSON.stringify(low)}`);
