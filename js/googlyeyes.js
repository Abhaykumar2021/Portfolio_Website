/* ============================================================
   GOOGLYEYES.JS — a pair of eyes in the top bar whose pupils
   track the cursor and blink on click. Pure fun / personality.
   ============================================================ */
export function initGooglyEyes(mountEl) {
  const wrap = document.createElement("div");
  wrap.id = "googly-eyes";
  wrap.setAttribute("aria-hidden", "true");
  wrap.innerHTML = `
    <div class="eye"><div class="pupil"></div></div>
    <div class="eye"><div class="pupil"></div></div>`;
  mountEl.appendChild(wrap);

  const eyes = [...wrap.querySelectorAll(".eye")];
  const pupils = eyes.map((e) => e.querySelector(".pupil"));

  // pupil follows cursor, clamped inside the eye
  const move = (cx, cy) => {
    eyes.forEach((eye, i) => {
      const r = eye.getBoundingClientRect();
      const ex = r.left + r.width / 2;
      const ey = r.top + r.height / 2;
      const ang = Math.atan2(cy - ey, cx - ex);
      const max = r.width * 0.22; // travel radius
      const dist = Math.min(max, Math.hypot(cx - ex, cy - ey));
      const px = Math.cos(ang) * (dist ? max : 0);
      const py = Math.sin(ang) * (dist ? max : 0);
      pupils[i].style.transform = `translate(${px}px, ${py}px)`;
    });
  };

  addEventListener("pointermove", (e) => move(e.clientX, e.clientY));

  const blink = () => {
    wrap.classList.add("blink");
    setTimeout(() => wrap.classList.remove("blink"), 220);
  };
  // blink on any click anywhere, plus an idle blink now and then
  addEventListener("pointerdown", blink);
  setInterval(() => Math.random() < 0.5 && blink(), 4200);

  // clicking the eyes themselves does a double-blink wink
  wrap.addEventListener("click", (e) => {
    e.stopPropagation();
    blink();
    setTimeout(blink, 260);
  });
}
