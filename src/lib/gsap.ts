import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function registerGsapPlugins(): typeof gsap {
  if (!isRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }

  return gsap;
}

export { gsap, ScrollTrigger };
