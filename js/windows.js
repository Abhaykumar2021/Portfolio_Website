/* ============================================================
   WINDOWS.JS — tiny window manager.
   openWindow({ id, title, html, terminal, onMount }) creates a
   draggable window; opening the same id twice refocuses/restores it.
   Supports minimize-to-dock and restore.
   ============================================================ */

let zTop = 200;
const openWins = new Map();   // id -> { win, opener }
const minimized = new Set();  // ids currently minimized
let spawnOffset = 0;

function emitChange() {
  document.dispatchEvent(new CustomEvent("win:change", {
    detail: { open: [...openWins.keys()], minimized: [...minimized] },
  }));
}

export function openWindow({ id, title, html, terminal = false, onMount = null }) {
  // already open → restore if minimized, then focus
  if (openWins.has(id)) {
    if (minimized.has(id)) restoreWindow(id);
    else focusWin(openWins.get(id).win);
    return;
  }

  const layer = document.getElementById("window-layer");
  const win = document.createElement("section");
  win.className = "win";
  win.dataset.winId = id;
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", title);

  win.innerHTML = `
    <div class="win-titlebar">
      <div class="win-lights">
        <button class="win-light win-close" aria-label="Close ${title}" title="Close"></button>
        <button class="win-light win-min" aria-label="Minimize ${title}" title="Minimize"></button>
        <span class="win-light win-max" aria-hidden="true"></span>
      </div>
      <span class="win-title">${title}</span>
    </div>
    <div class="win-body ${terminal ? "term-body" : ""}"></div>
  `;
  const body = win.querySelector(".win-body");
  if (typeof html === "string") body.innerHTML = html;
  else if (html instanceof Node) body.appendChild(html);

  layer.appendChild(win);

  // spawn centred, with a slight cascade for multiple windows
  const w = win.offsetWidth || Math.min(620, innerWidth * 0.92);
  const h = win.offsetHeight || innerHeight * 0.5;
  const x = Math.max(12, (innerWidth - w) / 2 + spawnOffset);
  const y = Math.max(44, (innerHeight - h) / 2.2 + spawnOffset);
  spawnOffset = (spawnOffset + 24) % 96;
  win.style.left = `${x}px`;
  win.style.top = `${y}px`;

  openWins.set(id, { win, opener: () => openWindow({ id, title, html, terminal, onMount }) });
  focusWin(win);

  win.querySelector(".win-close").addEventListener("click", (e) => { e.stopPropagation(); closeWindow(id); });
  win.querySelector(".win-min").addEventListener("click", (e) => { e.stopPropagation(); minimizeWindow(id); });
  win.addEventListener("pointerdown", () => focusWin(win));
  makeDraggable(win, win.querySelector(".win-titlebar"));

  if (typeof onMount === "function") onMount(win, body);
  emitChange();
}

export function closeWindow(id) {
  const rec = openWins.get(id);
  if (!rec) return;
  rec.win.classList.add("closing");
  rec.win.addEventListener("animationend", () => rec.win.remove(), { once: true });
  openWins.delete(id);
  minimized.delete(id);
  emitChange();
}

export function minimizeWindow(id) {
  const rec = openWins.get(id);
  if (!rec || minimized.has(id)) return;
  minimized.add(id);
  rec.win.classList.add("minimized");
  emitChange();
}

export function restoreWindow(id) {
  const rec = openWins.get(id);
  if (!rec) return;
  minimized.delete(id);
  rec.win.classList.remove("minimized");
  focusWin(rec.win);
  emitChange();
}

/* Dock/taskbar toggle: open → minimize → restore cycle */
export function toggleWindow(id, opener) {
  if (!openWins.has(id)) { opener(); return; }
  if (minimized.has(id)) restoreWindow(id);
  else minimizeWindow(id);
}

export function isOpen(id) { return openWins.has(id); }

function focusWin(win) {
  document.querySelectorAll(".win.focused").forEach((w) => w.classList.remove("focused"));
  win.classList.add("focused");
  win.style.zIndex = ++zTop;
}

function makeDraggable(win, handle) {
  let sx, sy, ox, oy, dragging = false;
  handle.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".win-light")) return;
    dragging = true;
    sx = e.clientX; sy = e.clientY;
    ox = win.offsetLeft; oy = win.offsetTop;
    handle.setPointerCapture(e.pointerId);
  });
  handle.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const nx = ox + e.clientX - sx;
    const ny = oy + e.clientY - sy;
    win.style.left = `${Math.min(Math.max(nx, -win.offsetWidth + 80), innerWidth - 60)}px`;
    win.style.top = `${Math.min(Math.max(ny, 34), innerHeight - 60)}px`;
  });
  handle.addEventListener("pointerup", () => (dragging = false));
}
