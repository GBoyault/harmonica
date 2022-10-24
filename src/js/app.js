// app.js

import { tunings } from './components/tunings';
import SoundPlayer from './components/SoundPlayer';
import StatsManager from './components/StatsManager';
import KeysManager from './components/KeysManager';


class App {
  constructor() {
    // Utilities
    this.stats = new StatsManager();
    this.player = new SoundPlayer();
    this.keys = new KeysManager();

    // DOM elements
    this.harmo = document.getElementById('harmonica');
    this.mouth = document.querySelector('#mouth .hole');
    this.holes = document.querySelectorAll('#harmonica .hole');

    // Computed values
    this.mouthRect = this.mouth.getBoundingClientRect();
    this.harmoCenterX = 240;
    this.harmoCenterY = 20;
    this.toleranceX = 5;
    this.toleranceY = 20;

    this.currentHole = 0;
    this.currentTuning = 'richter'; // richter | paddy
    this.currentNoteCode = 0;
    this.currentAirState = '-';

    this.handleMouse = this.handleMouse.bind(this);
    this.handleKeys = this.handleKeys.bind(this);

    this.initEventListeners();
    this.stats.updateTuning(this.currentTuning);

    // Request animation frame
    this.startLoop();

  }

  initEventListeners() {
    window.addEventListener('keydown', this.handleKeys);
    window.addEventListener('keyup', this.handleKeys);
    window.addEventListener('mousemove', this.handleMouse);

    window.addEventListener('resize', e => {
      this.mouthRect = this.mouth.getBoundingClientRect();
    });
  }

  handleMouse(event) {
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


  handleKeys(event) {
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

  setCurrentNote() {
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

    if (this.currentNoteCode === 0) {
      this.player.stop();
    } else if (this.currentNoteCode !== lastNoteCode) {
      const freq = tunings[this.currentTuning][this.currentNoteCode]
      this.player.play(freq);
    }

    this.stats.updateFreq(tunings[this.currentTuning][this.currentNoteCode]);
    this.stats.updateNote(tunings[this.currentTuning][this.currentNoteCode]);
  }

  contactMouth(hole) {
    const holeRect = hole.getBoundingClientRect();

    return holeRect.x > this.mouthRect.x - this.toleranceX
      & holeRect.x + holeRect.width < this.mouthRect.x + this.mouthRect.width + this.toleranceX
      & holeRect.y > this.mouthRect.y - this.toleranceY
      & holeRect.y + holeRect.height < this.mouthRect.y + this.mouthRect.height + this.toleranceY
  }


  startLoop() {
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
