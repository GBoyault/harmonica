// SoundPlayer.js

export default class SoundPlayer {
  constructor() {

    this.playing = false;

    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.out = this.ctx.destination;
    this.carrier = null;
    this.mod1 = null;
    this.mod2 = null;
    
    this.gain1 = this.ctx.createGain();
    this.gain1.gain.value = 3000;
    this.gain2 = this.ctx.createGain();
    this.gain2.gain.value = 3000;
    // this.filter = this.ctx.createBiquadFilter();

    // this.filter.type = "lowpass";
    // this.filter.frequency.setTargetAtTime(1000, this.ctx.currentTime, 0);

    // this.gain1.gain.exponentialRampToValueAtTime(
    //   0.00001, this.ctx.currentTime + 0.04
    // )
  }


  playNote(freq) {
    if (typeof freq !== 'number') {
      return;
    }

    if (this.playing) {
      this.carrier.frequency.value = freq;
      this.setFrequency(freq);
    } else { 
      this.initcarrierillator(freq);
      this.carrier.start();
      this.mod1.start();
      this.mod2.start();
      this.playing = true;
    }
  }

  stopNote() {
    if (this.playing) {
      this.carrier.stop();
      this.mod1.stop();
      this.mod2.stop();
      this.playing = false;
    }
  }

  initcarrierillator(freq) {
    this.stopNote();
    
    this.carrier = this.ctx.createOscillator();
    this.carrier.type = 'sine'; // sine | sawtooth | triangle | square;
    this.mod1 = this.ctx.createOscillator();
    this.mod1.type = 'sine'; // sine | sawtooth | triangle | square;
    this.mod2 = this.ctx.createOscillator();
    this.mod2.type = 'sine'; // sine | sawtooth | triangle | square;
    this.setFrequency(freq);

    // this.mod1.connect(this.gain1);
    // this.gain1.connect(this.carrier)
    // this.carrier.connect(this.gain2);
    // this.gain2.connect(this.mod2)
    
    // this.carrier.connect(this.gain1);
    // this.gain1.connect(this.filter);
    // this.filter.connect(this.out);
    
    this.mod1.connect(this.out);
    this.carrier.connect(this.out);
    this.mod2.connect(this.out);
    
  }
  
  setFrequency(freq) {
    const semitone = 1;
    this.mod1.frequency.value = freq * this.octave(3) * this.semitone(4);
    this.carrier.frequency.value = freq;
    this.mod2.frequency.value = freq * this.octave(1);
  }

  semitone(nb) {
    return ((2 ** (1/12)) ** nb);
  }

  octave(nb) {
    return 2 ** nb;
  }
}
