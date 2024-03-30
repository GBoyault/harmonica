// SoundPlayer.js

import Note from "./Note";

export default class SoundPlayer {
  playing: boolean;
  ctx: null | AudioContext;
  currentNote: null | Note;

  constructor() {
    this.playing = false;

    // Main audio context
    this.ctx = null; // initialized after first user click
    this.currentNote = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.ctx.resume();
    }
  }

  play(freq: number) {
    if (this.playing) {
      this.currentNote?.setFreq(freq);
    } else {
      this.currentNote?.stop();

      if (this.ctx) {
        this.currentNote = new Note(this.ctx, freq);
        this.playing = true;
      }
    }
  }

  stop() {
    if (this.playing) {
      this.currentNote?.stop();
      this.playing = false;
      this.currentNote = null;
    }
  }
}
