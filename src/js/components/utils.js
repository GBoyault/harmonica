// utils.js

/**
 * 
 * @param {number} nb 
 * @returns 
 */
const semitone = nb => ((2 ** (1 / 12)) ** nb);

/**
 * 
 * @param {number} nb 
 * @returns 
 */
const octave = nb => 2 ** nb;

export { semitone, octave };

