import { writable } from "svelte/store";

import { mobile } from "./styles/shared";

export const currentSection = writable("Home");
export const isMobile = writable(
  window.innerWidth < mobile.width.split("px")[0]
);
