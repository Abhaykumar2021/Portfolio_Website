/* ============================================================
   SOUND.JS — cinematic intro sound on boot reveal.
   Priority: CONFIG.sound.customFile (your own MP3) →
   otherwise a synthesized "transformer power-up" via Web Audio
   followed by an optional spoken voice line.
   Browsers only allow audio after a user gesture, so this is
   armed on the first key press / tap (the boot-skip interaction).
   ============================================================ */
import { CONFIG } from "./config.js";

let played = false;

export function playIntro() {
  const S = CONFIG.sound;
  if (!S?.enabled || played) return;
  played = true;

  if (S.customFile) {
    const a = new Audio(S.customFile);
    a.volume = 0.8;
    a.play().catch(() => {}); // blocked or file missing — fail silently
    return;
  }

  try {
    synthPowerUp();
  } catch { /* Web Audio unavailable — skip */ }

  if (S.voiceLine && "speechSynthesis" in window) {
    setTimeout(() => {
      const u = new SpeechSynthesisUtterance(S.voiceLine);
      u.rate = 0.85;
      u.pitch = 0.6; // low, robotic
      u.volume = 0.9;
      speechSynthesis.speak(u);
    }, 1400);
  }
}

/* Rising metallic sweep + sub-bass boom + shimmer, ~2s */
function synthPowerUp() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const t0 = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = 0.6;
  master.connect(ctx.destination);

  // 1. rising sweep (the "machine spinning up")
  const sweep = ctx.createOscillator();
  sweep.type = "sawtooth";
  sweep.frequency.setValueAtTime(60, t0);
  sweep.frequency.exponentialRampToValueAtTime(880, t0 + 1.1);
  const sweepGain = ctx.createGain();
  sweepGain.gain.setValueAtTime(0.0001, t0);
  sweepGain.gain.exponentialRampToValueAtTime(0.25, t0 + 0.4);
  sweepGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.2);
  const sweepFilter = ctx.createBiquadFilter();
  sweepFilter.type = "lowpass";
  sweepFilter.frequency.setValueAtTime(400, t0);
  sweepFilter.frequency.exponentialRampToValueAtTime(4000, t0 + 1.1);
  sweep.connect(sweepFilter).connect(sweepGain).connect(master);
  sweep.start(t0); sweep.stop(t0 + 1.3);

  // 2. sub-bass boom at the reveal moment
  const boom = ctx.createOscillator();
  boom.type = "sine";
  boom.frequency.setValueAtTime(150, t0 + 1.05);
  boom.frequency.exponentialRampToValueAtTime(38, t0 + 1.9);
  const boomGain = ctx.createGain();
  boomGain.gain.setValueAtTime(0.0001, t0 + 1.0);
  boomGain.gain.exponentialRampToValueAtTime(0.9, t0 + 1.12);
  boomGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.2);
  boom.connect(boomGain).connect(master);
  boom.start(t0 + 1.0); boom.stop(t0 + 2.3);

  // 3. metallic shimmer (detuned fifth stack)
  [523.25, 784, 1046.5].forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.value = f;
    o.detune.value = (i - 1) * 8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0 + 1.1);
    g.gain.exponentialRampToValueAtTime(0.08, t0 + 1.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.4);
    o.connect(g).connect(master);
    o.start(t0 + 1.1); o.stop(t0 + 2.5);
  });
}
