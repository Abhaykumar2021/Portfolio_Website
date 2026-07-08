# Abhay Kumar — Portfolio

**Live: [abhaykumar2021portfolio.vercel.app](https://abhaykumar2021portfolio.vercel.app/)**

Built as a vibe-coded project using Claude Code, Cursor, and Antigravity.

I got tired of portfolio sites that are just a resume in HTML, so I built mine as a fake operating system instead. It boots like a machine powering on, then drops you onto a desktop with draggable windows, a dock, a right-click context menu, and a real terminal you can type into. My projects, skills, and certifications live inside that desktop as apps rather than as a scroll of `<div>`s.

## Why an "OS," and why vanilla JS

No React, no build step, no npm install. Just HTML/CSS and plain ES modules loaded directly by the browser. That was a deliberate choice going in: even with AI tools doing a lot of the actual typing, I wanted the window manager, drag/focus logic, and terminal REPL built from scratch rather than pulled in as a library, so the result stays something I can actually reason about and modify by hand. It also means anyone can clone this, open it, and understand the whole thing in an afternoon — there's no framework to learn first.

## What's actually happening under the hood

- **Boot sequence** — a typed boot log plays on load, then the curtain lifts into the desktop. A synthesized power-up tone plus a spoken voice line fires on skip/keypress (browsers require a user gesture for audio, so a fully hands-off load may stay muted).
- **Window manager** — every "app" (Projects, Skills, Terminal, Resume, etc.) is a window with open/close/drag/focus/minimize handled by a small custom manager, not a UI framework. Minimizing sends it to the dock; clicking the dock icon restores it.
- **Dock** — macOS-style magnification: icons grow based on cursor distance, tuned via a few constants at the top of one file.
- **Terminal app** — a genuine REPL, not a fake text box. Commands like `whoami`, `skills`, `projects`, `certs`, `resume`, `open <github|linkedin|email|resume>`, and `neofetch` are real, with command history (↑/↓) and Tab autocomplete.
- **Wallpaper** — an original animated dragon design flies across the desktop on a CSS keyframe path (this is not the Kali Linux logo — that's Offensive Security's trademark, so I built my own art instead).
- **Context menu** — right-click the desktop for quick actions (Terminal, About, Projects, Resume, GitHub, Reboot).

## Content lives in one file

Every piece of text on the site — name, tagline, project cards, skills, certifications, education, resume link, even the boot log lines — comes from a single config object in `js/config.js`. Nothing else needs to change to update the content; the rendering code just reads from that file. This was the main design goal: keep content and structure completely separate so future edits don't mean digging through markup.

## Architecture

```
index.html          static shell — empty containers, no inline content
css/theme.css        design tokens (colors, fonts) — the one place to change the look
css/boot.css          curtain + boot terminal styling
css/desktop.css       wallpaper, dragon flight path, icons, dock
css/windows.css       window chrome (title bars, traffic lights, borders)
js/config.js          ★ all content — name, links, projects, skills, certs, boot lines
js/main.js            entry point: boot sequence → desktop handoff
js/boot.js            typed boot log + curtain reveal animation
js/desktop.js         reads config.js and builds icons/cards/windows from it
js/windows.js         custom window manager: open, close, drag, focus, minimize
js/dragon.js          injects and animates the wallpaper dragon
js/icons.js           inline SVGs for the dragon and desktop icons
js/terminal.js         REPL logic + command map for the Terminal app
js/dock.js             dock rendering + macOS-style icon magnification
js/contextmenu.js      right-click menu entries and actions
js/sound.js            boot power-up tone + spoken voice line
```

The split is intentional: `config.js` is the only file meant to change often (new project, new skill, new cert), while everything else is structural and stays stable. `desktop.js`, `windows.js`, and `dock.js` don't know or care what content they're rendering — they just read whatever's in the config.

## Running it locally

This uses ES modules, so opening `index.html` directly in a browser won't work — it needs to be served:

```bash
cd portfolio
python3 serve.py
# open http://localhost:8000
```

`serve.py` disables caching, so edits always show up immediately. If you use `python3 -m http.server` instead, it works too, but your browser may cache old files.

**Confirming you're on the latest build:** the top-right of the menu bar shows a `BUILD vN` tag, and the browser console prints a matching `ABHAY-OS BUILD vN …` banner on load. If those don't match what you expect, you're serving a stale copy — delete the old folder and re-extract.

## Customizing your own copy

Nearly every edit you'd want to make lives in `js/config.js`:

| What | Where in `config.js` |
|---|---|
| Name, tagline, summary | `identity` |
| Boot screen lines | `bootLines` |
| GitHub / LinkedIn / email / phone / resume link | `links` |
| Projects (cards + windows) | `projects` — copy an existing object to add a new one |
| Certifications | `certifications` |
| Skills (wallpaper watermark + Skills window) | `skills` |
| Education, achievements | `education`, `achievements` |
| Intro voice line / custom audio | `sound` — set `voiceLine`, or point `customFile` at an MP3 in `assets/` |
| Wallpaper image / extra flying dragon toggle | `wallpaper` |

Drop a resume PDF at `assets/Resume.pdf` (or point `links.resumeFile` elsewhere).

## Deploying

Currently deployed on Vercel. Since it's fully static (no build step, no server-side code), it'll also deploy as-is on GitHub Pages: push to a repo → Settings → Pages → deploy from branch.

## Ideas for later

- Project thumbnails — set an `image` field on a project and render it in its card.
- A working "Contact" window (Formspree plays nicely with static sites).
- More keyboard shortcuts (e.g. `T` to jump straight to the terminal).
