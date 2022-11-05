// SoundPlayer.js

import Note from './Note';

export default class SoundPlayer {
  constructor() {
    this.playing = false;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.currentNote = null;
    this.stoppedNotes = [];
  }


  play(freq) {
    if (typeof freq !== 'number') {
      return;
    }

    if (this.playing) {
      // this.notes[0].setFreq(freq);
      this.currentNote.note.setFreq(freq);
    } else {

      if (this.currentNote?.note) {
        // const lastNote = this.notes.shift();
        // lastNote.stop();
        this.stoppedNotes.unshift(this.currentNote)
        this.stoppedNotes[0].note.stop();
      }

      // this.notes.unshift(new Note(this.ctx, freq));
      this.currentNote = { note: new Note(this.ctx, freq), timestamp: Date.now() };
      this.playing = true;
    }

  }

  stop() {
    if (this.playing) {
      if (this.currentNote?.note) {
        // const lastNote = this.notes.shift();
        // lastNote.stop();

        this.stoppedNotes.unshift(this.currentNote)
        this.stoppedNotes[0].note.stop();
      }
      this.playing = false;
      this.currentNote = null;
    }
  }

}
