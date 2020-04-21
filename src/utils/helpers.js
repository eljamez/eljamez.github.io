import { afterUpdate } from "svelte";
import { currentSection } from "../stores.js";

export const isSelected = (name) => {
  let is;
  afterUpdate(() => {
    is = name === $currentSection;
  });
  return is;
};
