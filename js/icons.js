/* ============================================================
   ICONS.JS — every SVG used on the site.
   To swap the dragon for your own artwork, replace DRAGON_FLYING
   and DRAGON_EMBLEM with your own SVG markup (or an <img> tag).
   ============================================================ */

/* Real dragon extracted from the wallpaper (white on transparent).
   Used on the boot screen and the top bar. */
export const DRAGON_EMBLEM = `<img src="assets/dragon-logo.png" alt="Dragon emblem" class="dragon-img" />`;

/* Previous original SVG emblem kept as a fallback if you ever need it */
export const DRAGON_EMBLEM_SVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path class="emblem-stroke" stroke="#2ea8ff" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"
    d="M50 8 L64 20 L84 24 L70 34 L88 48 L68 50 L78 68 L60 60 L62 82 L50 66 L38 82 L40 60 L22 68 L32 50 L12 48 L30 34 L16 24 L36 20 Z" />
  <path class="emblem-stroke" stroke="#2ea8ff" stroke-width="2" stroke-linejoin="round"
    d="M50 26 L58 34 L54 46 L50 40 L46 46 L42 34 Z" />
  <circle class="emblem-eye" cx="46" cy="35" r="2.4" fill="#37ff8b"/>
  <circle class="emblem-eye" cx="54" cy="35" r="2.4" fill="#37ff8b"/>
</svg>`;

/* Flying dragon silhouette for the wallpaper (original artwork) */
export const DRAGON_FLYING = `
<svg id="dragon" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" fill="none">
  <g stroke="#2ea8ff" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
    <!-- back wing -->
    <path class="wing back" fill="rgba(46,168,255,0.06)"
      d="M300 170 L250 60 L280 100 L300 55 L316 105 L350 70 L340 130 Z"/>
    <!-- body + tail -->
    <path fill="rgba(46,168,255,0.10)"
      d="M120 250 Q170 210 230 195 Q300 178 360 168 Q420 160 470 138 L505 118 L492 140 L520 134 L500 156
         Q450 185 390 196 Q330 208 270 226 Q200 248 150 282 Q132 268 120 250 Z"/>
    <!-- head -->
    <path fill="rgba(46,168,255,0.12)"
      d="M470 138 L522 108 L560 96 L540 116 L570 114 L544 132 L516 144 Z"/>
    <circle cx="527" cy="119" r="3.4" fill="#37ff8b" stroke="none"/>
    <!-- front wing -->
    <path class="wing" fill="rgba(46,168,255,0.10)"
      d="M340 175 L300 40 L336 92 L358 30 L376 96 L420 46 L404 120 L440 96 L410 150 Z"/>
    <!-- legs -->
    <path d="M340 200 L330 226 L346 220 M400 182 L396 208 L410 200"/>
    <!-- tail flame -->
    <path d="M150 282 L112 300 L134 278 L104 284 L128 264" stroke="#37ff8b" stroke-width="2"/>
  </g>
</svg>`;

/* ── desktop / dock icons (40×40 viewBox 24) ─────────────── */
const S = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';

export const ICONS = {
  folder: `<svg ${S} stroke="#2ea8ff"><path fill="rgba(46,168,255,.12)" d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
  cert: `<svg ${S} stroke="#ffb020"><circle cx="12" cy="9" r="5" fill="rgba(255,176,32,.12)"/><path d="M9 13.5 7.5 21l4.5-2.5L16.5 21 15 13.5"/><path d="M10.5 9l1.2 1.2L14 7.9" stroke="#37ff8b"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#d7e3f4"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path fill="#fff" d="M6.94 8.5H4.56V19h2.38V8.5ZM5.75 4.5a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88ZM13 8.3c-1.3 0-2.17.6-2.6 1.3h-.06l-.1-1.1H8.06c.03.7.06 1.53.06 2.5V19h2.38v-5.9c0-.3.02-.6.1-.8.24-.6.77-1.23 1.68-1.23 1.18 0 1.66.9 1.66 2.2V19h2.38v-6c0-3.1-1.66-4.7-3.32-4.7Z"/></svg>`,
  mail: `<svg ${S} stroke="#37ff8b"><rect x="3" y="5" width="18" height="14" rx="2" fill="rgba(55,255,139,.08)"/><path d="m3 7 9 6 9-6"/></svg>`,
  phone: `<svg ${S} stroke="#37ff8b"><path fill="rgba(55,255,139,.08)" d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>`,
  terminal: `<svg ${S} stroke="#37ff8b"><rect x="3" y="4" width="18" height="16" rx="2" fill="#030608"/><path d="m7 9 3 3-3 3M12 15h5"/></svg>`,
  resume: `<svg ${S} stroke="#d7e3f4"><path fill="rgba(215,227,244,.06)" d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4M9 11h6M9 15h6M9 19h4"/></svg>`,
  user: `<svg ${S} stroke="#2ea8ff"><circle cx="12" cy="8" r="4" fill="rgba(46,168,255,.1)"/><path d="M4 21c1.5-4 5-5.5 8-5.5s6.5 1.5 8 5.5"/></svg>`,
  chip: `<svg ${S} stroke="#ffb020"><rect x="6" y="6" width="12" height="12" rx="2" fill="rgba(255,176,32,.08)"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>`,

  // ── brand icons for desktop social links ──
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#feda75"/><stop offset="0.35" stop-color="#fa7e1e"/><stop offset="0.6" stop-color="#d62976"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig)"/><rect x="6" y="6" width="12" height="12" rx="4" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="16.4" cy="7.6" r="1.1" fill="#fff"/></svg>`,

  chess: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="#81b64c"/><path fill="#fff" d="M12 4.6c-1.5 0-2.7 1.2-2.7 2.7 0 .8.3 1.5.9 2-.7.5-1.2 1.3-1.4 2.2h1.8c.2-.6.7-1 1.4-1s1.2.4 1.4 1h1.8c-.2-.9-.7-1.7-1.4-2.2.6-.5.9-1.2.9-2 0-1.5-1.2-2.7-2.7-2.7Zm-3 8.1-.8 4.1c-.1.5.1.9.5 1.2.6.4 1.9.7 3.3.7s2.7-.3 3.3-.7c.4-.3.6-.7.5-1.2l-.8-4.1H9Zm-1.2 6.4c-.7.3-1.1.7-1.1 1.1v.2h10.6v-.2c0-.4-.4-.8-1.1-1.1-1 .4-2.5.6-4.2.6s-3.2-.2-4.2-.6Z"/></svg>`,

  youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="1.5" y="5" width="21" height="14" rx="4.5" fill="#ff0000"/><path fill="#fff" d="M10 8.8v6.4l5.5-3.2z"/></svg>`,

  x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="#000"/><path fill="#fff" d="M13.6 10.6 18.4 5h-1.6l-4 4.7L9.6 5H5.2l5 7.3L5.2 19h1.6l4.4-5.1 3.5 5.1h4.4l-5.5-8.4Zm-1.5 1.8-.5-.7-4-5.7h1.7l3.3 4.7.5.7 4.2 6h-1.7l-3.5-5Z"/></svg>`,
};
