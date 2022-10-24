// Note.js

export default class Note {
  constructor(ctx, freq) {

    this.ctx = ctx;
    this.out = this.ctx.destination;

    this.gain1 = this.ctx.createGain();
    this.gain1.gain.value = 3000;

    this.gain2 = this.ctx.createGain();
    this.gain2.gain.value = 3000;

    this.env = this.ctx.createGain();
    this.attackTime = 0.05;
    this.releaseTime = 0.2;

    this.env.connect(this.out);

    this.initOscillators(freq);
    this.setFreq(freq)
    this.play();
  }


  initOscillators(freq) {
    const type = 'sine'; // sine | sawtooth | triangle | square

    this.mod1 = this.ctx.createOscillator();
    this.mod1.type = type;
    this.mod2 = this.ctx.createOscillator();
    this.mod2.type = type;
    this.mod3 = this.ctx.createOscillator();
    this.mod3.type = type;


    this.env.gain.cancelScheduledValues(this.ctx.currentTime);
    this.env.gain.setValueAtTime(0, this.ctx.currentTime);
    this.env.gain.linearRampToValueAtTime(1, this.ctx.currentTime + this.attackTime);

    this.mod1.connect(this.gain1);
    this.gain1.connect(this.mod2.frequency);

    this.mod2.connect(this.gain2);
    this.gain2.connect(this.mod3.frequency);

    this.mod3.connect(this.env);

    // this.mod2.connect(this.gain2);
    // this.gain2.connect(this.mod3);
    // this.mod3.connect(this.out);
  }


  setFreq(freq) {
    this.mod1.frequency.value = freq * this.octave(3) * this.semitone(4);
    this.mod2.frequency.value = freq;
    this.mod3.frequency.value = freq * this.octave(1);
  }


  play() {
    this.mod1.start();
    this.mod2.start();
    this.mod3.start();
  }


  stop() {
    const delay = this.ctx.currentTime + this.releaseTime;

    this.env.gain.linearRampToValueAtTime(0, delay);

    this.mod1.stop(delay);
    this.mod2.stop(delay);
    this.mod3.stop(delay);
  }

  semitone(nb) {
    return ((2 ** (1 / 12)) ** nb);
  }

  octave(nb) {
    return 2 ** nb;
  }
}