// SoundPlayer.js

import Note from './Note';

export default class SoundPlayer {
  constructor() {
    this.playing = false;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.currentNote = null;
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

}
