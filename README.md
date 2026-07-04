# Abhay Kumar — Hacker-OS Portfolio

An interactive portfolio styled like a Linux desktop: boot curtain → desktop with icons, draggable windows, a flying cyber-dragon wallpaper, and your tech stack painted across it.

## Run locally

ES modules need a server (opening `index.html` directly won't work):

```bash
cd portfolio
python3 serve.py          # caching disabled — always shows latest edits
# open http://localhost:8000
```

**Seeing an old version?** You're serving a stale folder. Confirm the build:
the top-right of the menu bar shows a `BUILD v4` tag, and the browser console
prints an `ABHAY-OS BUILD v4 …` banner. If you don't see those, delete the old
extracted folder, re-extract this zip fresh, and run `python3 serve.py`.
`serve.py` disables caching so this can't happen again. (Plain
`python3 -m http.server` also works but may serve cached files.)

## Deploy (free)

Push the folder to a GitHub repo → Settings → Pages → deploy from branch. Done.

## How to customize (99% of edits = one file)

**`js/config.js`** holds every piece of content:

| What | Where in config.js |
|---|---|
| Name, tagline, summary | `identity` |
| Boot screen lines | `bootLines` |
| GitHub / LinkedIn / email / phone / resume PDF | `links` |
| Projects (cards + windows) | `projects` — copy an object to add one |
| Certifications | `certifications` |
| Skills (wallpaper watermark + Skills window) | `skills` |
| Education, achievements | `education`, `achievements` |

Drop your resume PDF at `assets/Resume.pdf` (or change `links.resumeFile`).

## Architecture

```
index.html          static shell (empty containers)
css/theme.css       design tokens — change colors/fonts once here
css/boot.css        curtain + boot terminal
css/desktop.css     wallpaper, dragon flight path, icons, dock
css/windows.css     window chrome
js/config.js        ★ ALL CONTENT — edit this
js/main.js          entry point (boot → desktop)
js/boot.js          typed boot log + curtain reveal
js/desktop.js       builds icons/cards/dock/windows from config
js/windows.js       tiny window manager (open/close/drag/focus)
js/dragon.js        injects the wallpaper dragon
js/icons.js         all SVGs (dragon + icons)
```

## Interactive features (the "OS" layer)

- **Live terminal** — the Terminal app is a real REPL. Type `help` for commands:
  `about`, `whoami`, `skills`, `projects`, `certs`, `resume`, `contact`,
  `open <github|linkedin|email|resume>`, `neofetch`, `echo`, `date`, `clear`.
  ↑/↓ walks command history, Tab autocompletes. Add commands in the `COMMANDS`
  map in `js/terminal.js`.
- **Minimize to dock** — the yellow window light (or clicking an open app's dock
  icon) minimizes it; clicking the dock icon again restores it. Red light closes.
- **macOS dock magnification** — dock icons grow based on cursor distance.
  Tune `MAX_SCALE`, `RANGE`, `LIFT` at the top of `js/dock.js`.
- **Right-click menu** — right-click the desktop for Terminal / About / Projects /
  Resume / GitHub / Reboot. Edit entries in `js/contextmenu.js`.

## Intro sound

A synthesized power-up + spoken voice line plays when the curtains open (`js/sound.js`).
Configure in `config.js → sound`: set `voiceLine` to any phrase, or drop your own MP3 at
`assets/intro.mp3` and set `customFile: "assets/intro.mp3"` to play it instead.
Browsers require a user gesture for audio — it always plays when the visitor taps/presses a key
to skip the boot; on a fully hands-off load some browsers may mute it.

## Wallpaper

Set `wallpaper.image` in config.js (current: `assets/wallpaper.png`).
`wallpaper.showFlyingDragon: true` re-enables the extra animated SVG dragon on top.

## Swapping the dragon artwork

The dragon here is an original design (the official Kali logo is Offensive Security's trademark — check their brand policy before using it). To use your own art: replace `DRAGON_FLYING` in `js/icons.js`, or in `js/dragon.js` set the layer to `<img id="dragon" src="assets/your-art.svg">`. Keep `id="dragon"` so the flight animation applies. Flight path = `@keyframes fly` in `css/desktop.css`.

## Nice future additions

- Add project thumbnails: set `image` on a project and render it in the card.
- A "Contact" window with a form (Formspree works on static sites).
- Boot sound / keyboard shortcuts (e.g. `T` opens terminal).
