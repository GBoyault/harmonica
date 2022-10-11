// sound-player.js

import frequencies from './frequencies';

class SoundPlayer {
  constructor() {

    this.playing = false;

    this.context = null;
    this.oscillator = null;
    this.gain = null;
  }


  playNote(note, range) {

    this.initOscillator();
    const frequency = frequencies[note][range];
    this.oscillator.frequency.value = frequency;
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



export default new SoundPlayer();
