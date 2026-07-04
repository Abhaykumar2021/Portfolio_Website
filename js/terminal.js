/* ============================================================
   TERMINAL.JS — a real interactive shell.
   Visitors type commands; output prints below. Add commands in
   the COMMANDS map — each returns HTML (string) or "" (side-effect).
   ============================================================ */
import { CONFIG } from "./config.js";
import { openWindow } from "./windows.js";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export function openTerminal() {
  openWindow({
    id: "terminal",
    title: `${CONFIG.identity.handle}: ~`,
    terminal: true,
    html: `<div class="term-scroll" id="term-scroll"></div>
      <div class="term-input-line">
        <span class="prompt">${esc(CONFIG.identity.handle)}:~$</span>
        <input id="term-input" class="term-input" autocomplete="off"
               autocapitalize="off" spellcheck="false" aria-label="Terminal input" />
      </div>`,
    onMount: (win, body) => initShell(win, body),
  });
}

function initShell(win, body) {
  const scroll = body.querySelector("#term-scroll");
  const input = body.querySelector("#term-input");
  const history = [];
  let hIdx = -1;

  const print = (html, cls = "") => {
    const div = document.createElement("div");
    div.className = `term-out ${cls}`;
    div.innerHTML = html;
    scroll.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  const echoCmd = (cmd) =>
    print(`<span class="prompt">${esc(CONFIG.identity.handle)}:~$</span> ${esc(cmd)}`);

  // banner
  print(COMMANDS.neofetch());
  print(`Type <span class="hl">help</span> to see available commands.`, "dim");

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    echoCmd(cmd);
    history.unshift(cmd); hIdx = -1;

    const [name, ...args] = cmd.split(/\s+/);
    const fn = COMMANDS[name.toLowerCase()];
    if (name.toLowerCase() === "clear") { scroll.innerHTML = ""; return; }
    if (fn) {
      const out = fn(args, print);
      if (out) print(out);
    } else {
      print(`command not found: <span class="err">${esc(name)}</span>. Try <span class="hl">help</span>.`, "");
    }
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { run(input.value); input.value = ""; }
    else if (e.key === "ArrowUp") {
      if (hIdx < history.length - 1) { hIdx++; input.value = history[hIdx] || ""; }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (hIdx > 0) { hIdx--; input.value = history[hIdx] || ""; }
      else { hIdx = -1; input.value = ""; }
      e.preventDefault();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cur = input.value.trim().toLowerCase();
      const match = Object.keys(COMMANDS).find((c) => c.startsWith(cur));
      if (match) input.value = match;
    }
  });

  // clicking anywhere in the window focuses the input
  win.addEventListener("pointerup", (e) => {
    if (!e.target.closest("a") && window.getSelection().isCollapsed) input.focus();
  });
  setTimeout(() => input.focus(), 50);
}

/* ── command set ──────────────────────────────────────────── */
const L = () => CONFIG.links;
const link = (href, text, blank = true) =>
  `<a href="${esc(href)}"${blank ? ' target="_blank" rel="noopener"' : ""}>${esc(text)}</a>`;

const COMMANDS = {
  help: () => `<span class="hl">Available commands</span>
  <span class="cmd">help</span>       show this list
  <span class="cmd">about</span>      who I am
  <span class="cmd">whoami</span>     one-line bio
  <span class="cmd">skills</span>     tech stack
  <span class="cmd">projects</span>   list projects (opens window)
  <span class="cmd">certs</span>      certifications
  <span class="cmd">resume</span>     open my resume (PDF)
  <span class="cmd">contact</span>    email / phone / socials
  <span class="cmd">open</span> &lt;x&gt;   x = github | linkedin | email | resume
  <span class="cmd">neofetch</span>   system info
  <span class="cmd">echo</span> &lt;s&gt;   print text
  <span class="cmd">date</span>       current date/time
  <span class="cmd">sudo</span>       nice try 😏
  <span class="cmd">clear</span>      clear the screen`,

  about: () => {
    setTimeout(() => import("./desktop.js").then((m) => m.openAppById?.("about")), 0);
    return `${esc(CONFIG.identity.name)} — ${esc(CONFIG.identity.summary)}`;
  },

  whoami: () => `${esc(CONFIG.identity.name)} · ${esc(CONFIG.identity.tagline)}`,

  skills: () => Object.entries(CONFIG.skills)
    .map(([g, l]) => `<span class="hl">${esc(g)}:</span> ${l.map(esc).join(", ")}`)
    .join("\n"),

  projects: () => {
    setTimeout(() => import("./desktop.js").then((m) => m.openAppById?.("projects")), 0);
    return CONFIG.projects.map((p) =>
      `<span class="cmd">${esc(p.id)}</span> — ${esc(p.title)} (${esc(p.year)})`).join("\n")
      + `\n<span class="dim">opening projects window…</span>`;
  },

  certs: () => CONFIG.certifications.map((c) =>
    `• ${esc(c.name)} — ${esc(c.issuer)} ${c.url ? link(c.url, "[verify]") : ""}`).join("\n"),

  resume: () => { window.open(L().resumeFile, "_blank"); return `opening ${esc(L().resumeFile)} …`; },

  contact: () => `email  : ${link("mailto:" + L().email, L().email, false)}
phone  : ${esc(L().phone)}
github : ${link(L().github, L().github)}
linkedin: ${link(L().linkedin, L().linkedin)}`,

  open: (args) => {
    const t = (args[0] || "").toLowerCase();
    const map = {
      github: L().github, linkedin: L().linkedin,
      email: "mailto:" + L().email, resume: L().resumeFile,
    };
    if (map[t]) { window.open(map[t], "_blank"); return `opening ${esc(t)} …`; }
    return `usage: open &lt;github|linkedin|email|resume&gt;`;
  },

  echo: (args) => esc(args.join(" ")),
  date: () => new Date().toString(),
  sudo: () => `<span class="err">[sudo] password for guest:</span> permission denied — but I admire the confidence.`,
  clear: () => "", // handled in run()

  neofetch: () => {
    const s = CONFIG.skills;
    const stack = [...(s["ML / DL"] || []), ...(s.Languages || [])].slice(0, 4).join(", ");
    return `<pre class="neofetch"><span class="ascii">      /\\
     /  \\      </span><span class="hl">${esc(CONFIG.identity.name)}</span>@portfolio
<span class="ascii">    /    \\     </span>-------------------
<span class="ascii">   /  /\\  \\    </span><span class="key">OS</span>     : ABHAY-OS v2.0
<span class="ascii">  /  /  \\  \\   </span><span class="key">Role</span>   : ${esc(CONFIG.identity.tagline)}
<span class="ascii"> /  /____\\  \\  </span><span class="key">Uptime</span> : 3rd year B.E.
<span class="ascii">/__/      \\__\\ </span><span class="key">Stack</span>  : ${esc(stack)}
              <span class="key">Shell</span>  : abhay-sh
              <span class="key">Contact</span>: ${esc(L().email)}</pre>`;
  },
};
