const semitone = nb => ((2 ** (1 / 12)) ** nb);

const octave = nb => 2 ** nb;

export { semitone, octave };

