// SoundPlayer.js

import Note from './Note';

export default class SoundPlayer {
  constructor() {
    this.playing = false;

    // Main audio context
    this.ctx = null; // initialized after first user click
    this.currentNote = null;

    this.audience = new Audio('dist/audio/audience.mp3');
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }


  play(freq) {
    if (typeof freq !== 'number') {
      return;
    }

    if (this.playing) {
      this.currentNote.setFreq(freq);
    } else {

      if (this.currentNote) {
        this.currentNote.stop();
      }

      this.currentNote = new Note(this.ctx, freq);
      this.playing = true;
    }
  }

  stop() {
    if (this.playing) {
      if (this.currentNote) {
        this.currentNote.stop();
      }

      this.playing = false;
      this.currentNote = null;
    }
  }

  playAudience() {
    this.audience.play();
  }
  
  stopAudience() {
    this.audience.pause();
  }
}
