/**
 * Pure Web Audio API Ambient Soundscape Generator
 * 100% synthetic, zero external audio asset dependencies, runs completely offline.
 */

let audioCtx = null;
let currentTrack = null;
let masterGain = null;
let activeNodes = [];

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundscapeVolume(vol) {
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), audioCtx.currentTime);
  }
}

export function stopSoundscape() {
  activeNodes.forEach((node) => {
    try {
      if (node.stop) node.stop();
      if (node.disconnect) node.disconnect();
    } catch (e) {
      // ignore cleanup errors
    }
  });
  activeNodes = [];
  currentTrack = null;
}

// 1. Rain on Window
function playRain(ctx) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    data[i] = (b0 + b1 + b2) * 0.11;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, ctx.currentTime);

  noise.connect(filter);
  filter.connect(masterGain);
  noise.start();
  activeNodes.push(noise, filter);
}

// 2. Warm Fireplace Crackle
function playFireplace(ctx) {
  // Low frequency hearth rumble
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(65, ctx.currentTime);

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.08, ctx.currentTime);

  osc.connect(oscGain);
  oscGain.connect(masterGain);
  osc.start();
  activeNodes.push(osc, oscGain);

  // Organic crackles
  const crackleInterval = setInterval(() => {
    if (!currentTrack || currentTrack !== 'fireplace') {
      clearInterval(crackleInterval);
      return;
    }
    if (Math.random() > 0.4) {
      const snap = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snap.frequency.setValueAtTime(200 + Math.random() * 800, ctx.currentTime);
      snapGain.gain.setValueAtTime(0.05 + Math.random() * 0.08, ctx.currentTime);
      snapGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      snap.connect(snapGain);
      snapGain.connect(masterGain);
      snap.start();
      snap.stop(ctx.currentTime + 0.05);
    }
  }, 120);
}

// 3. 432Hz Zen Singing Bowl
function playZenBowl(ctx) {
  const osc1 = ctx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(432, ctx.currentTime);

  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(432 * 1.5, ctx.currentTime); // Perfect fifth overtone

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, ctx.currentTime);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(masterGain);
  osc1.start();
  osc2.start();
  activeNodes.push(osc1, osc2, gain);
}

// 4. Cozy Cafe Murmur
function playCafeMurmur(ctx) {
  const bufferSize = ctx.sampleRate * 3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.05;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(500, ctx.currentTime);
  bandpass.Q.setValueAtTime(1.2, ctx.currentTime);

  noise.connect(bandpass);
  bandpass.connect(masterGain);
  noise.start();
  activeNodes.push(noise, bandpass);
}

export function playSoundscapeTrack(trackId) {
  const ctx = getAudioContext();
  if (!ctx) return;

  stopSoundscape();
  currentTrack = trackId;

  switch (trackId) {
    case 'rain':
      playRain(ctx);
      break;
    case 'fireplace':
      playFireplace(ctx);
      break;
    case 'zen':
      playZenBowl(ctx);
      break;
    case 'cafe':
      playCafeMurmur(ctx);
      break;
    default:
      break;
  }
}

// Play pleasant tactile bubble wrap pop
export function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(350 + Math.random() * 150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.06);
  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.07);
}
