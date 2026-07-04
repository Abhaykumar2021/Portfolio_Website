/* ============================================================
   DRAGON.JS — injects the flying dragon into the wallpaper.
   To use your own artwork: replace DRAGON_FLYING in icons.js,
   or set layer.innerHTML to `<img id="dragon" src="assets/your.svg">`.
   The flight path lives in the `fly` keyframes in desktop.css.
   ============================================================ */
import { DRAGON_FLYING } from "./icons.js";

export function spawnDragon() {
  document.getElementById("dragon-layer").innerHTML = DRAGON_FLYING;
}
