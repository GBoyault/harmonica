// sound-player.js


class SoundPlayer {
  constructor() {

    this.sounds = {
    };

    this.context = new AudioContext();
    this.oscillator = null;
    this.gain = null;
  }


  playNote(frequency, type) {
      this.oscillator = this.context.createOscillator();
      this.oscillator.connect(this.context.destination);
      // this.gain = this.context.createGain();
      // this.oscillator.type = type;
      // this.oscillator.connect(this.gain);
      this.oscillator.frequency.value = frequency;
      // this.gain.connect(this.context.destination);
      this.oscillator.start(0);
      // this.gain.exponentialRampToValueAtTime(0.00001, this.context.currentTime + 1);
  }
}



export default new SoundPlayer();
