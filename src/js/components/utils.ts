// utils.js

/**
 *
 * @param {number} nb
 * @returns
 */
export const semitone = (nb: number) => (2 ** (1 / 12)) ** nb;

/**
 *
 * @param {number} nb
 * @returns
 */
export const octave = (nb: number) => 2 ** nb;
