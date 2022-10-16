// SoundPlayer.js

export default class SoundPlayer {
  constructor() {

    this.playing = false;

    this.context = null;
    this.oscillator = null;
    this.gain = null;
  }


  playNote(freq) {
    if (typeof freq !== 'number') {
      return;
    }

    this.initOscillator();
    this.oscillator.frequency.value = freq;
    this.oscillator.start(0);
    this.playing = true;
  }

  stopNote() {
    if (this.playing) {
      this.oscillator.stop();
      this.playing = false;
    }
  }

  initOscillator() {
    this.stopNote();
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = 'sawtooth'; // sawtooth sine triangle square;
    this.gain = this.context.createGain();
    this.oscillator.connect(this.gain);
    this.oscillator.connect(this.context.destination);

    this.gain.gain.exponentialRampToValueAtTime(
      0.00001, this.context.currentTime + 0.04
    )
  }
}
