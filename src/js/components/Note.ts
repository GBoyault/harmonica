// Note.js

import { octave, semitone } from "./utils";

export default class Note {
  attackTime = 0.055;
  releaseTime = 0.1;
  maxGain1 = 500;
  maxGain2 = 1500;

  ctx: AudioContext;
  out: AudioDestinationNode;
  gain1!: GainNode;
  gain2!: GainNode;
  env!: GainNode;
  mod1!: OscillatorNode;
  mod2!: OscillatorNode;
  mod3!: OscillatorNode;

  constructor(ctx: AudioContext, freq: number) {
    this.ctx = ctx;
    this.out = this.ctx.destination;

    this.initGains();
    this.initOscillators(freq);
    this.play();
  }

  initGains() {
    this.gain1 = this.ctx.createGain();
    this.gain1.gain.value = 0;

    this.gain2 = this.ctx.createGain();
    this.gain2.gain.value = 0;

    // Main enveloppe
    this.env = this.ctx.createGain();
    this.env.gain.value = 0;

    this.env.connect(this.out);
  }

  initOscillators(freq: number) {
    const type = "triangle"; // sine | sawtooth | triangle | square

    this.mod1 = this.ctx.createOscillator();
    this.mod1.type = type;
    this.mod2 = this.ctx.createOscillator();
    this.mod2.type = type;
    this.mod3 = this.ctx.createOscillator();
    this.mod3.type = type;

    this.setFreq(freq);

    // Osc 1 modulates osc 2
    this.mod1.connect(this.gain1);
    this.gain1.connect(this.mod2.frequency);

    // Osc 2 modulates osc 3
    this.mod2.connect(this.gain2);
    this.gain2.connect(this.mod3.frequency);

    // Osc 3 connects to main enveloppe
    this.mod3.connect(this.env);
  }

  setFreq(freq: number) {
    this.mod1.frequency.value = freq * octave(3) * semitone(4);
    this.mod2.frequency.value = freq;
    this.mod3.frequency.value = freq * octave(1);
  }

  play() {
    const now = this.ctx.currentTime;

    this.env.gain.setValueAtTime(0, now);
    this.env.gain.linearRampToValueAtTime(1, now + this.attackTime);

    this.gain1.gain.setValueAtTime(0, now);
    this.gain1.gain.linearRampToValueAtTime(
      this.maxGain1,
      now + this.attackTime + 0.05
    );

    this.gain2.gain.setValueAtTime(0, now);
    this.gain2.gain.linearRampToValueAtTime(
      this.maxGain2,
      now + this.attackTime + 0.01
    );

    this.mod1.start();
    this.mod2.start();
    this.mod3.start();
  }

  stop() {
    const now = this.ctx.currentTime;

    this.gain1.gain.setValueAtTime(this.maxGain1, now);
    this.gain1.gain.linearRampToValueAtTime(0, now + this.releaseTime);

    this.gain2.gain.setValueAtTime(this.maxGain2, now);
    this.gain2.gain.linearRampToValueAtTime(0, now + this.releaseTime);

    this.env.gain.setValueAtTime(1, now);
    this.env.gain.linearRampToValueAtTime(0, now + this.releaseTime);

    this.mod1.stop(now + this.releaseTime);
    this.mod2.stop(now + this.releaseTime);
    this.mod3.stop(now + this.releaseTime);
  }
}
