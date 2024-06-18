import { Fodmap } from "../types/Fodmap";

export const sortAlphabetical = (food1: Fodmap, food2: Fodmap) => {
  let val = 0;
  val = food1.name < food2.name ? -1 : val;
  val = food1.name > food2.name ? 1 : val;
  return val;
};

export const sortHighFodmap = (food1: Fodmap, food2: Fodmap) => {
  let val;
  val = food1.fodmap === "high" ? -1 : 1;
  val = food1.fodmap === food2.fodmap ? 0 : val;
  return val;
};
