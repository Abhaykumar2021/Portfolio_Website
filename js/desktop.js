/* ============================================================
   DESKTOP.JS — builds the desktop from CONFIG:
   wallpaper identity + skills watermark, desktop icons,
   project preview cards, dock, top-bar clock, window contents.
   ============================================================ */
import { CONFIG } from "./config.js";
import { ICONS, DRAGON_EMBLEM } from "./icons.js";
import { openWindow, toggleWindow } from "./windows.js";
import { openTerminal } from "./terminal.js";
import { initDockMagnify } from "./dock.js";
import { initContextMenu } from "./contextmenu.js";
import { initGooglyEyes } from "./googlyeyes.js";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export function buildDesktop() {
  document.getElementById("tb-emblem").innerHTML = DRAGON_EMBLEM;
  initGooglyEyes(document.querySelector("#topbar .tb-left"));
  paintIdentity();
  buildProjectCards();
  buildSocialIcons();
  buildDock();
  startClock();
  initContextMenu({ terminal: openTerminal, about: openAbout, projects: openProjects });
}

/* app registry — lets the terminal (and others) open windows by id */
const APPS = {
  about: openAbout, projects: openProjects, certs: openCerts,
  skills: openSkills, terminal: openTerminal,
};
export function openAppById(id) { APPS[id]?.(); }

/* ── wallpaper ────────────────────────────────────────────── */
function paintIdentity() {
  const { name, tagline } = CONFIG.identity;
  document.getElementById("wp-identity").innerHTML =
    `<h1>${esc(name)}</h1><p>${esc(tagline)}</p>`;
}

/* ── project preview cards on the wallpaper ──────────────── */
function buildProjectCards() {
  const wrap = document.getElementById("project-previews");
  CONFIG.projects.forEach((p) => {
    const card = document.createElement("button");
    card.className = "proj-card";
    card.innerHTML = `
      <div class="pc-bar">
        <span class="pc-dots"><i></i><i></i><i></i></span>
        <span>~/projects/${esc(p.id)}</span>
      </div>
      ${p.image ? `<div class="pc-thumb-wrap"><img class="pc-thumb" src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy" /></div>` : ""}
      <div class="pc-body">
        <h3>${esc(p.title)}</h3>
        <div class="pc-stack">${p.stack.map((s) => `<em>${esc(s)}</em>`).join("")}</div>
        <div class="pc-hint">click to open project</div>
      </div>`;
    card.addEventListener("click", () => openProjectWindow(p));
    wrap.appendChild(card);
  });
}

function openProjectWindow(p) {
  openWindow({
    id: `proj-${p.id}`,
    title: `${p.title} — ${p.year}`,
    html: `
      ${p.image ? `<img class="win-hero" src="${esc(p.image)}" alt="${esc(p.title)} screenshot" />` : ""}
      <h2>${esc(p.title)}</h2>
      <div class="chip-row">${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
      <ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      ${p.url ? `<a class="btn-accent" href="${esc(p.url)}" target="_blank" rel="noopener">Open repo / live demo ↗</a>` : ""}`,
  });
}

/* ── app windows ──────────────────────────────────────────── */
function openAbout() {
  const I = CONFIG.identity;
  openWindow({
    id: "about",
    title: "about_me.txt",
    html: `
      <h2>${esc(I.name)}</h2>
      <p class="win-kicker">${esc(I.tagline)} · ${esc(I.location)}</p>
      <p style="margin-top:10px">${esc(I.summary)}</p>
      <div class="win-section" style="margin-top:18px">
        <h2>Education</h2>
        ${CONFIG.education.map((e) => `
          <div class="win-section ${e.highlight ? "edu-highlight" : ""}">
            <div class="win-item-title">${esc(e.school)}${e.highlight ? ' <span class="edu-badge">CURRENT · B.E.</span>' : ""}</div>
            <div class="win-item-sub">${esc(e.degree)} · ${esc(e.period)}</div>
            ${e.detail ? `<p style="font-size:13px;color:var(--muted)">${esc(e.detail)}</p>` : ""}
          </div>`).join("")}
      </div>
      <h2>Achievements</h2>
      <ul>${CONFIG.achievements.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>`,
  });
}

function openProjects() {
  openWindow({
    id: "projects",
    title: "~/projects",
    html: CONFIG.projects.map((p) => `
      <div class="win-section">
        <div class="win-item-title">${esc(p.title)} <span class="win-item-sub">(${esc(p.year)})</span></div>
        <div class="chip-row">${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
        <ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        ${p.url ? `<a class="btn-accent" href="${esc(p.url)}" target="_blank" rel="noopener">Open ↗</a>` : ""}
      </div>`).join(""),
  });
}

function openCerts() {
  openWindow({
    id: "certs",
    title: "~/certifications",
    html: CONFIG.certifications.map((c) => `
      <div class="win-section">
        <div class="win-item-title">${esc(c.name)}</div>
        <div class="win-item-sub">${esc(c.issuer)} · ${esc(c.year)}</div>
        <div style="display:flex;gap:14px;margin-top:6px;flex-wrap:wrap">
          ${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">Verify on Coursera ↗</a>` : ""}
          ${c.file ? `<a href="${esc(c.file)}" target="_blank" rel="noopener">View certificate (PDF) ↗</a>` : ""}
        </div>
      </div>`).join(""),
  });
}

function openSkills() {
  openWindow({
    id: "skills",
    title: "~/skills",
    html: Object.entries(CONFIG.skills).map(([group, list]) => `
      <div class="win-section">
        <span class="win-kicker">${esc(group)}</span>
        <div class="chip-row">${list.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
      </div>`).join(""),
  });
}

/* ── social icons on the desktop ─────────────────────────── */
function buildSocialIcons() {
  const grid = document.getElementById("desktop-icons");
  if (!grid) return;

  const map = {
    instagram: ICONS.instagram,
    chess: ICONS.chess,
    youtube: ICONS.youtube,
    x: ICONS.x,
  };

  (CONFIG.socials || []).forEach(({ key, label, url }) => {
    const a = document.createElement("a");
    a.className = "dt-social";
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.title = label;
    a.setAttribute("aria-label", label);
    a.innerHTML = `<span class="dt-social-ic">${map[key] || ICONS.folder}</span><span class="dt-social-lbl">${esc(label)}</span>`;
    grid.appendChild(a);
  });
}

/* ── dock ─────────────────────────────────────────────────── */
function buildDock() {
  const dock = document.getElementById("dock-items");
  const L = CONFIG.links;
  const items = [
    { id: "about", icon: ICONS.user, label: "About", act: openAbout },
    { id: "projects", icon: ICONS.folder, label: "Projects", act: openProjects },
    { id: "certs", icon: ICONS.cert, label: "Certifications", act: openCerts },
    { id: "skills", icon: ICONS.chip, label: "Skills", act: openSkills },
    { id: "terminal", icon: ICONS.terminal, label: "Terminal", act: openTerminal },
    { sep: true },
    { id: "resume", icon: ICONS.resume, label: "Resume", href: L.resumeFile },
    { id: "github", icon: ICONS.github, label: "GitHub", href: L.github },
    { id: "linkedin", icon: ICONS.linkedin, label: "LinkedIn", href: L.linkedin },
    { id: "email", icon: ICONS.mail, label: "Email", href: `mailto:${L.email}` },
  ];

  items.forEach((it) => {
    if (it.sep) {
      const s = document.createElement("span");
      s.className = "dock-sep";
      dock.appendChild(s);
      return;
    }
    const { id, icon, label, act, href } = it;
    const b = document.createElement(href ? "a" : "button");
    b.className = "dock-btn";
    b.dataset.appId = id;
    b.title = label;
    b.setAttribute("aria-label", label);
    b.innerHTML = `<span class="dock-ic">${icon}</span><span class="dock-tip">${esc(label)}</span>`;
    if (href) {
      b.href = href;
      if (href.startsWith("http")) { b.target = "_blank"; b.rel = "noopener"; }
    } else {
      // click toggles: open → minimize → restore, like a real taskbar
      b.addEventListener("click", () => toggleWindow(id, act));
    }
    dock.appendChild(b);
  });

  document.addEventListener("win:change", (e) => {
    const { open, minimized } = e.detail;
    dock.querySelectorAll(".dock-btn").forEach((b) => {
      const id = b.dataset.appId;
      b.classList.toggle("active", open.includes(id));
      b.classList.toggle("minimized", minimized.includes(id));
    });
  });

  initDockMagnify(dock);
}

/* ── clock ────────────────────────────────────────────────── */
function startClock() {
  const el = document.getElementById("tb-clock");
  const tick = () => {
    el.textContent = new Date().toLocaleString("en-IN", {
      weekday: "short", day: "2-digit", month: "short",
      hour: "2-digit", minute: "2-digit",
    });
  };
  tick();
  setInterval(tick, 30_000);
}
