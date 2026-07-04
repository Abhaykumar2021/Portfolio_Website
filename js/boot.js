/* ============================================================
   BOOT.JS — landing animation: emblem draw, typed boot log,
   curtain split. Skippable with any key / tap.
   ============================================================ */
import { CONFIG } from "./config.js";
import { DRAGON_EMBLEM } from "./icons.js";
import { playIntro } from "./sound.js";

const TYPE_SPEED = 14;     // ms per character
const LINE_PAUSE = 160;    // ms between lines

export function runBoot(onDone) {
  const screen = document.getElementById("boot-screen");
  const logo = document.getElementById("boot-logo");
  const term = document.getElementById("boot-terminal");
  const skip = document.getElementById("boot-skip");
  logo.innerHTML = DRAGON_EMBLEM;

  let finished = false;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finish = () => {
    if (finished) return;
    finished = true;
    playIntro(); // guaranteed: finish only ever runs from a user gesture
    screen.classList.add("open");
    const cleanup = () => {
      screen.classList.add("done");
      onDone();
    };
    reduced ? cleanup() : setTimeout(cleanup, 1150);
    removeEventListener("keydown", finish);
    screen.removeEventListener("pointerdown", finish);
  };

  // entering the site IS the gesture — required for browsers to allow audio
  addEventListener("keydown", finish, { once: false });
  screen.addEventListener("pointerdown", finish);

  const showEnterPrompt = () => {
    skip.textContent = "▸ press any key / tap to enter ◂";
    skip.classList.add("ready");
  };

  if (reduced) { showEnterPrompt(); return; }

  // type lines sequentially
  const lines = CONFIG.bootLines;
  let li = 0;

  const cursor = document.createElement("span");
  cursor.className = "cursor";

  function typeLine() {
    if (finished) return;
    if (li >= lines.length) {
      showEnterPrompt(); // wait for the visitor — no auto-open
      return;
    }
    const raw = lines[li++];
    const lineEl = document.createElement("span");
    lineEl.className = raw.startsWith("[ OK ]") ? "ok" : "";
    term.appendChild(lineEl);
    term.appendChild(cursor);

    let ci = 0;
    (function typeChar() {
      if (finished) return;
      if (ci <= raw.length) {
        lineEl.textContent = raw.slice(0, ci++);
        setTimeout(typeChar, TYPE_SPEED);
      } else {
        term.insertBefore(document.createTextNode("\n"), cursor);
        setTimeout(typeLine, LINE_PAUSE);
      }
    })();
  }
  setTimeout(typeLine, 600); // let the emblem start drawing first
}
