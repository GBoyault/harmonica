// StatsManager.js

import { f } from './tunings';

export default class StatsManager {
  constructor() {
    this.keys = document.getElementById('keys');
    this.hole = document.getElementById('hole');
    this.air = document.getElementById('air');
    this.note = document.getElementById('note');
    this.freq = document.getElementById('freq');
    this.tone = document.getElementById('tone');
    this.tuning = document.getElementById('tuning');
  }

  updateKeys(keys = '-') {
    this.keys.innerHTML = keys.length ? keys : '-';
  }

  updateHole(hole = 0) {
    this.hole.innerHTML = hole != 0 ? hole : '-';
  }

  updateAir(air = '-') {
    this.air.innerHTML = air;
  }

  updateNote(freq = '-', transpostion = 0) {
    let playedNote = '-';

    for (const [note, frequencies] of Object.entries(f)) {
      const index = frequencies.findIndex(fr => fr === freq);

      if (-1 === index) {
        continue;
      }

      playedNote = note;

      if (transpostion) {
        const noteIndex = Object.keys(f).findIndex(n => n === note);
        let transposedIndex = noteIndex + transpostion;
        
        if (transposedIndex > 11) {
          transposedIndex -= 12;
        } else if (transposedIndex < 0) {
          transposedIndex += 12;
        }

        playedNote = Object.keys(f)[transposedIndex];
      }
    }

    this.note.innerHTML = playedNote;
  }

  updateFreq(freq = '-') {
    this.freq.innerHTML = freq !== 0 ? freq : '-';
  }


  updateTone(tone = '-') {
    this.tone.innerHTML = tone;
  }


  updateTuning(tuning = '-') {
    this.tuning.innerHTML = tuning;
  }
}