import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export { gsap, ScrollTrigger };

gsap.registerPlugin(ScrollTrigger);

/** Motion language token (PRD §8) — satu easing di seluruh site. */
export const EASE = "expo.out";
export const EASE_IN_OUT = "expo.inOut";
export const EASE_BEZIER = [0.16, 1, 0.3, 1] as const;

export const DURATIONS = {
  reveal: 1.0,
  hover: 0.3,
  preloader: 2.0,
} as const;

/** Reset ScrollTrigger pada unmount + saat route berubah. */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}
