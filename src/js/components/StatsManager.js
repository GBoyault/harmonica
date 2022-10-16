// StatsManager.js

import { f } from './tunings';

export default class StatsManager {
  constructor() {

    this.keys = document.getElementById('keys');
    this.hole = document.getElementById('hole');
    this.air = document.getElementById('air');
    this.note = document.getElementById('note');
    this.freq = document.getElementById('freq');
    this.tuning = document.getElementById('tuning');
  }

  updateKeys(keys = '-') {
    this.keys.innerHTML = keys ?? '-';
  }

  updateHole(hole = 0) {
    this.hole.innerHTML = hole != 0 ? hole : '-';
  }

  updateAir(air = '-') {
    this.air.innerHTML = air;
  }

  updateNote(freq = '-') {
    let playedNote = '-';

    for (const [note, frequencies] of Object.entries(f)) {
      const index = frequencies.findIndex(fr => fr === freq);

      if (-1 !== index) {
        playedNote = note + index;
      }
    }

    this.note.innerHTML = playedNote;
  }
  
  updateFreq(freq = '-') {
    this.freq.innerHTML = freq ?? '-';
  }


  updateTuning(tuning = '-') {
    this.tuning.innerHTML = tuning;
  }
}