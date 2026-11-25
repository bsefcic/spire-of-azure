// Zero-bloat Web Audio API synth + Android Haptics for 100% offline 120Hz feel

let audioCtx: AudioContext | null = null;
let muted = false;

export function setAudioMuted(isMuted: boolean) {
  muted = isMuted;
}

function getCtx(): AudioContext | null {
  if (muted || typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (Ctor) audioCtx = new Ctor();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function vibrate(pattern: number | number[]) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore if blocked by OS battery saver
    }
  }
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainPeak = 0.12,
  slideToFreq?: number,
  delaySec = 0
) {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime + delaySec;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (slideToFreq) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideToFreq), now + duration);
  }
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export const sfx = {
  tap() {
    vibrate(8);
    playTone(520, 0.045, 'triangle', 0.06, 640);
  },

  correct(streak = 1) {
    vibrate([14, 24, 18]);
    const pitchBoost = Math.min(streak * 35, 320);
    playTone(523.25 + pitchBoost, 0.11, 'triangle', 0.12);
    playTone(659.25 + pitchBoost, 0.16, 'triangle', 0.13, undefined, 0.07);
    if (streak >= 3) {
      playTone(783.99 + pitchBoost, 0.22, 'sine', 0.14, undefined, 0.14);
    }
  },

  wrong() {
    vibrate([35, 40, 45]);
    playTone(210, 0.16, 'sawtooth', 0.09, 145);
    playTone(160, 0.22, 'sawtooth', 0.09, 115, 0.1);
  },

  cardAttack() {
    vibrate(18);
    playTone(280, 0.09, 'sawtooth', 0.12, 95);
    playTone(620, 0.06, 'triangle', 0.08, 220);
  },

  cardShield() {
    vibrate(12);
    playTone(360, 0.12, 'sine', 0.11, 540);
    playTone(720, 0.14, 'triangle', 0.07, 760, 0.04);
  },

  cardSkill() {
    vibrate(10);
    playTone(460, 0.08, 'triangle', 0.09, 780);
  },

  enemyHit() {
    vibrate([25, 20, 25]);
    playTone(135, 0.15, 'square', 0.1, 65);
  },

  victory() {
    vibrate([18, 30, 18, 30, 40]);
    playTone(523.25, 0.12, 'triangle', 0.13, undefined, 0);
    playTone(659.25, 0.12, 'triangle', 0.13, undefined, 0.09);
    playTone(783.99, 0.14, 'triangle', 0.13, undefined, 0.18);
    playTone(1046.5, 0.32, 'sine', 0.15, undefined, 0.27);
  },

  bossAlert() {
    vibrate([40, 50, 40, 50, 70]);
    playTone(150, 0.28, 'sawtooth', 0.12, 110, 0);
    playTone(145, 0.35, 'sawtooth', 0.12, 95, 0.3);
  }
};
