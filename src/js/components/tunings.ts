// tunings.js

// Frequencies
export const f = {
  C: [16.35, 32.7, 65.41, 130.8, 261.6, 523.3, 1047, 2093, 4186],
  "C#": [17.32, 34.65, 69.3, 138.6, 277.2, 554.4, 1109, 2217, 4435],
  D: [18.35, 36.71, 73.42, 146.8, 293.7, 587.3, 1175, 2349, 4699],
  Eb: [19.45, 38.89, 77.78, 155.6, 311.1, 622.3, 1245, 2489, 4978],
  E: [20.6, 41.2, 82.41, 164.8, 329.6, 659.3, 1319, 2637, 5274],
  F: [21.83, 43.65, 87.31, 174.6, 349.2, 698.5, 1397, 2794, 5588],
  "F#": [23.12, 46.25, 92.5, 185.0, 370.0, 740.0, 1480, 2960, 5920],
  G: [24.5, 49.0, 98.0, 196.0, 392.0, 784.0, 1568, 3136, 6272],
  Ab: [25.96, 51.91, 103.8, 207.7, 415.3, 830.6, 1661, 3322, 6645],
  A: [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760, 3520, 7040],
  Bb: [29.14, 58.27, 116.5, 233.1, 466.2, 932.3, 1865, 3729, 7459],
  B: [30.87, 61.74, 123.5, 246.9, 493.9, 987.8, 1976, 3951, 7902],
} as const;

// Tunings
export const tunings = {
  richter: {
    "0": null,
    "1": f["C"][4],
    "-1": f["D"][4],
    "-1-": f["C#"][4],
    "2": f["E"][4],
    "-2": f["G"][4],
    "-2-": f["F#"][4],
    "-2--": f["F"][4],
    "3": f["G"][4],
    "-3": f["B"][4],
    "-3-": f["Bb"][4],
    "-3--": f["A"][4],
    "-3---": f["Ab"][4],
    "4": f["C"][5],
    "-4": f["D"][5],
    "-4-": f["C#"][5],
    "5": f["E"][5],
    "-5": f["F"][5],
    "6": f["G"][5],
    "-6": f["A"][5],
    "-6-": f["Ab"][5],
    "-7": f["B"][5],
    "7": f["C"][6],
    "-8": f["D"][6],
    "8-": f["Eb"][6],
    "8": f["E"][6],
    "-9": f["F"][6],
    "9-": f["F#"][6],
    "9": f["G"][6],
    "-10": f["A"][6],
    "10-": f["B"][6],
    "10--": f["Bb"][6],
    "10": f["C"][7],
  },
  paddy: {
    "0": null,
    "1": f["C"][4],
    "-1": f["D"][4],
    "-1-": f["C#"][4],
    "2": f["E"][4],
    "-2": f["G"][4],
    "-2-": f["F#"][4],
    "-2--": f["F"][4],
    "3": f["A"][4],
    "-3": f["B"][4],
    "-3-": f["Bb"][4],
    "4": f["C"][5],
    "-4": f["D"][5],
    "-4-": f["C#"][5],
    "5": f["E"][5],
    "-5": f["F"][5],
    "6": f["G"][5],
    "-6": f["A"][5],
    "-6-": f["Ab"][5],
    "-7": f["B"][5],
    "7": f["C"][6],
    "-8": f["D"][6],
    "8-": f["Eb"][6],
    "8": f["E"][6],
    "-9": f["F"][6],
    "9-": f["F#"][6],
    "9": f["G"][6],
    "-10": f["A"][6],
    "10-": f["B"][6],
    "10--": f["Bb"][6],
    "10": f["C"][7],
  },
  morti: {
    "0": null,
    "1": f["A"][3],
    "-1": f["C"][4],
    "-1-": f["B"][3],
    "-1--": f["Bb"][3],
    "2": f["D"][4],
    "2-": f["C#"][4],
    "-2": f["F"][4],
    "-2-": f["E"][4],
    "-2--": f["Eb"][4],
    "3": f["G"][4],
    "3-": f["F#"][4],
    "-3": f["A"][4],
    "-3-": f["Ab"][4],
    "4": f["Bb"][4],
    "-4": f["C"][5],
    "-4-": f["B"][4],
    "5": f["D"][5],
    "5-": f["C#"][5],
    "-5": f["E"][5],
    "-5-": f["Eb"][5],
    "6": f["F"][5],
    "-6": f["G"][5],
    "-6-": f["F#"][5],
    "7": f["A"][5],
    "7-": f["Ab"][5],
    "-7": f["B"][5],
    "-7-": f["Bb"][5],
    "8": f["C"][6],
    "-8": f["D"][6],
    "-8-": f["C#"][6],
    "9": f["E"][6],
    "9-": f["Eb"][6],
    "-9": f["F"][6],
    "10": f["G"][6],
    "10-": f["F#"][6],
    "-10": f["Bb"][6],
    "-10-": f["A"][6],
    "-10--": f["Ab"][6],
  },
} as const;
