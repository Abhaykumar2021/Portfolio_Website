/* ============================================================
   MAIN.JS — entry point. Boot → reveal desktop.
   ============================================================ */
import { CONFIG } from "./config.js";
import { runBoot } from "./boot.js";
import { buildDesktop } from "./desktop.js";
import { spawnDragon } from "./dragon.js";

const BUILD = "v6 · 2026-07-04 · social desktop icons";
console.log(
  `%c ABHAY-OS %c BUILD ${BUILD} `,
  "background:#2ea8ff;color:#001a2e;font-weight:800;border-radius:4px 0 0 4px;padding:3px 6px",
  "background:#0a1220;color:#4dffa0;border-radius:0 4px 4px 0;padding:3px 6px"
);

const desktop = document.getElementById("desktop");

// wallpaper image from config (overlay grid/skills layers stay on top)
if (CONFIG.wallpaper?.image) {
  const wp = document.getElementById("wallpaper");
  wp.style.backgroundImage =
    `radial-gradient(120% 100% at 50% 40%, rgba(4,7,13,0) 40%, rgba(4,7,13,0.7) 100%), url("${CONFIG.wallpaper.image}")`;
  wp.style.backgroundSize = "cover";
  wp.style.backgroundPosition = "center";
}

// build the desktop up-front so the curtain reveals a finished scene
buildDesktop();
if (CONFIG.wallpaper?.showFlyingDragon) spawnDragon();
desktop.hidden = false;

runBoot(() => {
  /* boot finished — nothing else needed, desktop is live.
     Hook post-boot effects here if you add any. */
});
