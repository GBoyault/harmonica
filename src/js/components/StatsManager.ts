// StatsManager.js

import { tone, tuning, key, airState } from "../definitions";
import { f } from "./tunings";

export default class StatsManager {
  keys: HTMLElement;
  hole: HTMLElement;
  air: HTMLElement;
  note: HTMLElement;
  freq: HTMLElement;
  tone: HTMLElement;
  tuning: HTMLElement;

  constructor() {
    this.keys = document.getElementById("keys")!;
    this.hole = document.getElementById("hole")!;
    this.air = document.getElementById("air")!;
    this.note = document.getElementById("note")!;
    this.freq = document.getElementById("freq")!;
    this.tone = document.getElementById("tone")!;
    this.tuning = document.getElementById("tuning")!;
  }

  updateKeys(keys: key["key"][] | null) {
    this.keys.innerHTML = keys && keys.length ? keys.join("") : "-";
  }

  updateHole(hole = 0) {
    this.hole.innerHTML = hole != 0 ? hole.toString() : "-";
  }

  updateAir(air: airState | null) {
    this.air.innerHTML = air ? air : "-";
  }

  updateNote(freq: number | null = null, transpostion = 0) {
    let playedNote = "-";

    for (const [note, frequencies] of Object.entries(f)) {
      const index = frequencies.findIndex((fr) => fr === freq);

      if (-1 === index) {
        continue;
      }

      playedNote = note;

      if (transpostion) {
        const noteIndex = Object.keys(f).findIndex((n) => n === note);
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

  updateFreq(freq: number | null) {
    this.freq.innerHTML = freq && freq !== 0 ? freq.toString() : "-";
  }

  updateTone(tone: tone) {
    this.tone.innerHTML = tone;
  }

  updateTuning(tuning: tuning) {
    this.tuning.innerHTML = tuning;
  }
}
