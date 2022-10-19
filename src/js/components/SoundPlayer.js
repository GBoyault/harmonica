// SoundPlayer.js

export default class SoundPlayer {
  constructor() {

    this.playing = false;

    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.out = this.ctx.destination;
    this.osc = null;
    
    this.gain = this.ctx.createGain();
    this.filter = this.ctx.createBiquadFilter();

    this.filter.type = "lowpass";
    // this.filter.frequency.setTargetAtTime(1000, this.ctx.currentTime, 0);

    this.gain.gain.exponentialRampToValueAtTime(
      0.00001, this.ctx.currentTime + 0.04
    )
  }


  playNote(freq) {
    if (typeof freq !== 'number') {
      return;
    }

    if (this.playing) {
      this.osc.frequency.value = freq;
      this.setFrequency(freq);
    } else { 
      this.initOscillator(freq);
      this.osc.start(0);
      this.playing = true;
    }
  }

  stopNote() {
    if (this.playing) {
      this.osc.stop();
      this.playing = false;
    }
  }

  initOscillator(freq) {
    this.stopNote();
    
    this.osc = this.ctx.createOscillator();
    this.osc.type = 'sawtooth'; // sine | sawtooth | triangle | square;
    this.setFrequency(freq);
    
    // this.osc.connect(this.gain);
    // this.gain.connect(this.filter);
    // this.filter.connect(this.out);
    
    this.osc.connect(this.out);
    
  }
  
  setFrequency(freq) {
    this.osc.frequency.value = freq;
  }
}
