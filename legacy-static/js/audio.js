/* ==========================================================================
   DYNAMIC STRESS BUSTER CAFE — WEB AUDIO SOUNDSCAPE ENGINE
   Synthesized real-time ambient soundscapes & interactive audio cues
   Zero external audio files required — 100% offline and reliable!
   ========================================================================== */

class AmbientSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.currentTrack = 'rain';
    this.gainNode = null;
    this.activeNodes = [];
    this.volume = 0.4;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  stopCurrent() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  play(trackName) {
    this.init();
    this.stopCurrent();
    this.currentTrack = trackName || this.currentTrack;

    switch (this.currentTrack) {
      case 'rain':
        this.createRainSound();
        break;
      case 'fire':
        this.createFireplaceSound();
        break;
      case 'zen':
        this.createZenDrone();
        break;
      case 'cafe':
        this.createCafeAtmosphere();
        break;
      default:
        this.createRainSound();
    }
    this.isPlaying = true;
  }

  toggle(trackName) {
    if (this.isPlaying && (!trackName || trackName === this.currentTrack)) {
      this.stopCurrent();
      return false;
    } else {
      this.play(trackName || this.currentTrack);
      return true;
    }
  }

  // Brown/Pink Noise Generator for Rain
  createRainSound() {
    const bufferSize = this.audioCtx.sampleRate * 2;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise formula
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain boost
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Low-pass filter for cozy muffled rain
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, this.audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();

    this.activeNodes.push(noise, filter);
  }

  // Fireplace Hearth with subtle crackle bursts
  createFireplaceSound() {
    // Low rumble
    const bufferSize = this.audioCtx.sampleRate * 2;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.015 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 4;
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();

    // Crackle interval generator
    const crackleInterval = setInterval(() => {
      if (!this.isPlaying || this.currentTrack !== 'fire') {
        clearInterval(crackleInterval);
        return;
      }
      if (Math.random() > 0.45) {
        this.playPopSound(0.04, 300 + Math.random() * 400);
      }
    }, 280);

    this.activeNodes.push(noise, filter);
  }

  // Zen Tibetan Harmonic Drone
  createZenDrone() {
    const freqs = [108, 216, 324, 432]; // Sacred healing harmonics
    freqs.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Gentle LFO vibrato
      const lfo = this.audioCtx.createOscillator();
      lfo.frequency.setValueAtTime(0.2 + (idx * 0.1), this.audioCtx.currentTime);
      const lfoGain = this.audioCtx.createGain();
      lfoGain.gain.setValueAtTime(1.5, this.audioCtx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.08 / (idx + 1), this.audioCtx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();

      this.activeNodes.push(osc, oscGain, lfo, lfoGain);
    });
  }

  // Warm Cafe Murmur
  createCafeAtmosphere() {
    const bufferSize = this.audioCtx.sampleRate * 2;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Bandpass filter centered on cafe room resonance
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(0.8, this.audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();

    this.activeNodes.push(noise, filter);
  }

  // Interactive UI Sound Effects
  playPopSound(duration = 0.05, freq = 600) {
    try {
      this.init();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  }

  playChime(freq = 528) {
    try {
      this.init();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 1.2);
    } catch (e) {}
  }
}

// Global engine instance
window.soundEngine = new AmbientSoundEngine();
