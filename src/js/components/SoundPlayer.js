// SoundPlayer.js

import Note from './Note';

export default class SoundPlayer {
  constructor() {
    this.playing = false;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.notes = [];
  }


  play(freq) {
    if (typeof freq !== 'number') {
      return;
    }

    if (this.playing) {
      this.notes[0].setFreq(freq);
    } else {

      if (this.notes.length) {
        // const lastNote = this.notes.shift();
        // lastNote.stop();

        this.notes[0].stop();
      }

      this.notes.unshift(new Note(this.ctx, freq));
      this.playing = true;
    }
  }

  stop() {
    if (this.playing) {
      if (this.notes.length) {
        // const lastNote = this.notes.shift();
        // lastNote.stop();

        this.notes[0].stop();

      }
      this.playing = false;
    }
  }

}
