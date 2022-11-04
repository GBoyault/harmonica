// Note.js

import { octave, semitone } from './utils';

export default class Note {
  constructor(ctx, freq) {

    this.ctx = ctx;
    this.out = this.ctx.destination;

    this.attackTime = 0.1;
    this.releaseTime = 0.1;

    this.initGains();
    this.initOscillators(freq);
    this.play();
  }

  initGains() {
    this.gain1 = this.ctx.createGain();
    this.gain1.gain.setValueAtTime(0, this.ctx.currentTime);

    this.gain2 = this.ctx.createGain();
    this.gain2.gain.setValueAtTime(0, this.ctx.currentTime);

    // Main enveloppe
    this.env = this.ctx.createGain();
    this.env.gain.setValueAtTime(0, this.ctx.currentTime);

    this.env.connect(this.out);
  }


  initOscillators(freq) {
    const type = 'sine'; // sine | sawtooth | triangle | square

    this.mod1 = this.ctx.createOscillator();
    this.mod1.type = type;
    this.mod2 = this.ctx.createOscillator();
    this.mod2.type = type;
    this.mod3 = this.ctx.createOscillator();
    this.mod3.type = type;

    this.setFreq(freq);

    // Osc 1 modulates osc 2
    this.mod1.connect(this.gain1);
    this.gain1.connect(this.mod2.detune);

    // Osc 2 modulates osc 3
    this.mod2.connect(this.gain2);
    this.gain2.connect(this.mod3.detune);

    // Osc 3 connects to main enveloppe
    this.mod3.connect(this.env);
  }


  setFreq(freq) {
    this.mod1.frequency.value = freq * octave(3) * semitone(4);
    this.mod2.frequency.value = freq;
    this.mod3.frequency.value = freq * octave(1);
  }


  play() {
    const now = this.ctx.currentTime;
    this.env.gain.linearRampToValueAtTime(1, now + this.attackTime);

    this.gain1.gain.linearRampToValueAtTime(1000, now + this.attackTime);
    // this.gain1.gain.setValueAtTime(1000, now);

    this.gain2.gain.linearRampToValueAtTime(1000, now + this.attackTime);
    // this.gain2.gain.setValueAtTime(1000, now);

    this.mod1.start();
    this.mod2.start();
    this.mod3.start();
  }


  stop() {
    const now = this.ctx.currentTime;

    this.gain1.gain.linearRampToValueAtTime(0, now + this.releaseTime);
    this.gain2.gain.linearRampToValueAtTime(0, now + this.releaseTime);
    this.env.gain.linearRampToValueAtTime(0, now + this.releaseTime);
    // setTimeout(() => {
    this.mod1.stop(now + this.releaseTime + 0.1);
    this.mod2.stop(now + this.releaseTime + 0.1);
    this.mod3.stop(now + this.releaseTime + 0.1);
    // }, 500);
  }

}