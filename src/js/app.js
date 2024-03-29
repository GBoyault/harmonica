// app.js

import { tunings, f } from './components/tunings';
import { semitone } from './components/utils';
import SoundPlayer from './components/SoundPlayer';
import StatsManager from './components/StatsManager';
import KeysManager from './components/KeysManager';
import IntroManager from './components/IntroManager';

class App {
  constructor() {
    // Utilities
    this.stats = new StatsManager();
    this.player = new SoundPlayer();
    this.keys = new KeysManager();
    this.intros = new IntroManager(this.player);

    // DOM elements
    this.harmo = document.getElementById('harmonica');
    this.mouth = document.querySelector('#mouth .hole');
    this.holes = document.querySelectorAll('#harmonica .hole');

    // Params for mouth / harmonica collisions
    this.mouthRect = this.mouth.getBoundingClientRect();
    this.harmoCenterX = 240;
    this.harmoCenterY = 20;
    this.toleranceX = 5;
    this.toleranceY = 20;

    // Initial params for stats
    this.currentHole = 0;
    this.currentTuning = 'richter'; // richter | paddy
    this.currentTone = 'C'; // C, C#, D etc
    this.transposition = 0; // in semitone: C = 0, C# = 1, B = -1 etc
    this.currentNoteCode = 0;
    this.currentAirState = '-';

    this.intros.initIntro();

    this.initEventListeners();

    // First update stats
    this.stats.updateTuning(this.currentTuning);
    this.stats.updateTone(this.currentTone);

    // Request animation frame
    this.startLoop();
  }


  initEventListeners = () => {
    window.addEventListener('keydown', this.handleKeys);
    window.addEventListener('keyup', this.handleKeys);
    window.addEventListener('mousemove', this.handleMouse);

    window.addEventListener('resize', e => {
      this.mouthRect = this.mouth.getBoundingClientRect();
    });

    const tuning = document.getElementById('tuning');
    tuning.addEventListener('click', this.changeTuning);

    const tone = document.getElementById('tone');
    tone.addEventListener('click', this.changeTone);
  }


  changeTuning = () => {
    if ('richter' === this.currentTuning) {
      this.currentTuning = 'paddy';
    } else if ('paddy' === this.currentTuning) {
      this.currentTuning = 'morti';
    } else {
      this.currentTuning = 'richter';
    }

    this.stats.updateTuning(this.currentTuning);
  }


  changeTone = () => {
    const index = Object.keys(f).findIndex(tone => tone === this.currentTone);

    if (index !== -1) {
      const newIndex = index < 11 ? index + 1 : 0;
      this.currentTone = Object.keys(f)[newIndex];
      this.transposition = newIndex < 7 ? newIndex : newIndex - 12;
      this.stats.updateTone(this.currentTone);
    }
  }


  /**
   * 
   * @param {MouseEvent} event 
   */
  handleMouse = (event) => {
    // Move harmonica
    this.harmo.style.left = (event.clientX - this.harmoCenterX) + 'px'
    this.harmo.style.top = (event.clientY - this.harmoCenterY) + 'px'

    document.body.classList.remove('contact');

    // Check hole/mouth collisions
    let found = false;
    this.holes.forEach(hole => {
      if (this.contactMouth(hole)) {
        hole.classList.add('contact');
        document.body.classList.add('contact');
        this.currentHole = hole.dataset.hole;
        found = true;
      } else if (!found) {
        hole.classList.remove('contact');
        this.currentHole = 0;
      }
    });

    // Update stats
    this.stats.updateHole(this.currentHole);
  }

  /**
   * 
   * @param {KeyEvent} event 
   */
  handleKeys = (event) => {
    const keyState = this.keys.keyEvent(event);

    // Store air state
    this.currentAirState = keyState.airState;

    // Update stats
    this.stats.updateKeys(keyState.keysPressed)
    this.stats.updateAir(keyState.airState)

    // Update DOM
    document.body.classList.remove('blow', 'draw');
    if (keyState.airState.includes('blow')) {
      document.body.classList.add('blow')
    } else if (keyState.airState.includes('draw')) {
      document.body.classList.add('draw');
    }
  }


  setCurrentNote = () => {
    const lastNoteCode = this.currentNoteCode;

    if ('blow' === this.currentAirState) {
      this.currentNoteCode = this.currentHole;
    } else if ('blow_b1' === this.currentAirState) {
      this.currentNoteCode = (this.currentHole) + '-';
    } else if ('blow_b2' === this.currentAirState) {
      this.currentNoteCode = (this.currentHole) + '--';
    } else if ('draw' === this.currentAirState) {
      this.currentNoteCode = this.currentHole * -1;
    } else if ('draw_b1' === this.currentAirState) {
      this.currentNoteCode = (this.currentHole * -1) + '-';
    } else if ('draw_b2' === this.currentAirState) {
      this.currentNoteCode = (this.currentHole * -1) + '--';
    } else if ('draw_b3' === this.currentAirState) {
      this.currentNoteCode = (this.currentHole * -1) + '---';
    } else {
      this.currentNoteCode = 0;
    }

    if ([-0, '-0', '0-', '0--', '0---'].includes(this.currentNoteCode)) {
      this.currentNoteCode = 0;
    }

    const freq = tunings[this.currentTuning][this.currentNoteCode];
    const transposedFreq = this.transposition !== 0
      ? Math.trunc(freq * semitone(this.transposition) * 100) / 100
      : freq

    if (this.currentNoteCode !== lastNoteCode) {
      if (this.currentNoteCode === 0) {
        this.player.stop();

        this.stats.updateFreq(transposedFreq);
        this.stats.updateNote(freq, this.transposition);
      } else {

        if (!isNaN(transposedFreq)) {
          this.player.play(transposedFreq);

          this.stats.updateFreq(transposedFreq);
          this.stats.updateNote(freq, this.transposition);
        }
      }
    }
  }


  /**
   * 
   * @param {HTMLElement} hole 
   * @returns {boolean}
   */
  contactMouth = (hole) => {
    const holeRect = hole.getBoundingClientRect();

    return holeRect.x > this.mouthRect.x - this.toleranceX
      & holeRect.x + holeRect.width < this.mouthRect.x + this.mouthRect.width + this.toleranceX
      & holeRect.y > this.mouthRect.y - this.toleranceY
      & holeRect.y + holeRect.height < this.mouthRect.y + this.mouthRect.height + this.toleranceY;
  }


  startLoop = () => {
    const raf = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    const loop = () => {
      this.setCurrentNote();
      raf(loop);
    }

    if (raf) {
      loop();
    }
  }
}


new App;
