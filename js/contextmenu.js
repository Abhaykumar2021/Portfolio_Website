/* ============================================================
   CONTEXTMENU.JS — right-click desktop menu (OS feel).
   Add/remove entries in the `items` array. Each has an action.
   ============================================================ */
import { CONFIG } from "./config.js";
import { ICONS } from "./icons.js";

export function initContextMenu(actions) {
  const desktop = document.getElementById("desktop");

  const menu = document.createElement("div");
  menu.id = "ctx-menu";
  menu.setAttribute("role", "menu");
  document.body.appendChild(menu);

  const items = [
    { icon: ICONS.terminal, label: "Open Terminal", act: actions.terminal },
    { icon: ICONS.user, label: "About Me", act: actions.about },
    { icon: ICONS.folder, label: "Projects", act: actions.projects },
    { sep: true },
    { icon: ICONS.resume, label: "View Resume", act: () => window.open(CONFIG.links.resumeFile, "_blank") },
    { icon: ICONS.github, label: "GitHub Profile", act: () => window.open(CONFIG.links.github, "_blank") },
    { sep: true },
    { icon: ICONS.chip, label: "Reboot", act: () => location.reload() },
  ];

  menu.innerHTML = items.map((it) => it.sep
    ? `<div class="ctx-sep"></div>`
    : `<button class="ctx-item" role="menuitem"><span class="ctx-ic">${it.icon}</span>${it.label}</button>`
  ).join("");

  // bind actions (skip separators)
  const buttons = [...menu.querySelectorAll(".ctx-item")];
  const acts = items.filter((i) => !i.sep).map((i) => i.act);
  buttons.forEach((b, i) => b.addEventListener("click", () => { hide(); acts[i]?.(); }));

  function show(x, y) {
    menu.style.display = "block";
    const mw = menu.offsetWidth, mh = menu.offsetHeight;
    menu.style.left = `${Math.min(x, innerWidth - mw - 8)}px`;
    menu.style.top = `${Math.min(y, innerHeight - mh - 8)}px`;
    requestAnimationFrame(() => menu.classList.add("open"));
  }
  function hide() { menu.classList.remove("open"); menu.style.display = "none"; }

  desktop.addEventListener("contextmenu", (e) => {
    // let links/inputs keep native menu
    if (e.target.closest("a, input, .win")) return;
    e.preventDefault();
    show(e.clientX, e.clientY);
  });
  addEventListener("click", hide);
  addEventListener("scroll", hide, true);
  addEventListener("keydown", (e) => e.key === "Escape" && hide());
}
