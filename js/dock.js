/* ============================================================
   DOCK.JS — macOS-style magnification.
   Icons near the cursor scale up smoothly; the effect falls off
   with distance. Tune MAX_SCALE and RANGE to taste.
   ============================================================ */
const MAX_SCALE = 1.85;   // peak size of the icon under the cursor
const RANGE = 130;        // px of influence on either side
const LIFT = 14;          // px the biggest icon rises

export function initDockMagnify(dockEl) {
  const btns = () => [...dockEl.querySelectorAll(".dock-btn")];

  const reset = () => btns().forEach((b) => {
    b.style.setProperty("--s", 1);
    b.style.setProperty("--y", "0px");
  });

  dockEl.addEventListener("pointermove", (e) => {
    btns().forEach((b) => {
      const r = b.getBoundingClientRect();
      const center = r.left + r.width / 2;
      const dist = Math.abs(e.clientX - center);
      let scale = 1;
      if (dist < RANGE) {
        // cosine falloff for a smooth Dock-like curve
        const t = 1 - dist / RANGE;
        scale = 1 + (MAX_SCALE - 1) * (0.5 - Math.cos(Math.PI * t) / 2);
      }
      b.style.setProperty("--s", scale.toFixed(3));
      b.style.setProperty("--y", `${-LIFT * (scale - 1) / (MAX_SCALE - 1)}px`);
    });
  });

  dockEl.addEventListener("pointerleave", reset);
  reset();
}
