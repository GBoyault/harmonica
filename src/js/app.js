// app.js

import soundPlayer from './components/sound-player';

// soundPlayer.playNote(447, 'sine');
// soundPlayer.playNote(440, 'square');
// soundPlayer.playNote(1047, 'triangle');
// soundPlayer.playNote(1047, 'sawtooth');

// DOM elements
const harmo = document.getElementById('harmonica');
const mouth = document.querySelector('#mouth .hole');
const holes = document.querySelectorAll('#harmonica .hole')

// Computed values
const mouthRect = mouth.getBoundingClientRect();
const harmoCenterX = 240;
const harmoCenterY = 20;
const mouthWidth = 40;
const toleranceX = 5;
const toleranceY = 20;

const tunings = {
  richter: {
    '0': 'silence',
    '1': 'do',
    '-1': 'ré',
    '2': 'mi',
    '-2': 'sol',
    '3': 'sol',
    '-3': 'si',
    '4': 'do',
    '-4': 'ré',
    '5': 'mi',
    '-5': 'fa',
    '6': 'sol',
    '-6': 'la',
    '-7': 'si',
    '7': 'do',
    '-8': 'ré',
    '8': 'mi',
    '-9': 'fa',
    '9': 'sol',
    '-10': 'la',
    '10': 'do',
  }
}

let keyPressed = null;

let currentHole = 0;
let currentNoteCode = 'silence';

if (harmo && holes.length) {

  const contactMouth = hole => {
    const holeRect = hole.getBoundingClientRect();

    return holeRect.x > mouthRect.x - toleranceX
      & holeRect.x + holeRect.width < mouthRect.x + mouthRect.width + toleranceX
      & holeRect.y > mouthRect.y - toleranceY
      & holeRect.y + holeRect.height < mouthRect.y + mouthRect.height + toleranceY
  }

  const setCurrentNote = air => {
    if ('blowing' === air) {
      currentNoteCode = currentHole;
    } else if ('drawing' === air) {
      currentNoteCode = currentHole * -1;
    } else {
      currentNoteCode = 0
    }

    const statPlayedNote = document.getElementById('played-note');
    statPlayedNote.innerHTML = tunings.richter[currentNoteCode];
  }


  window.addEventListener('mousemove', e => {
    // Move harmonica
    harmo.style.left = (e.clientX - harmoCenterX) + 'px'
    harmo.style.top = (e.clientY - harmoCenterY) + 'px'

    document.body.classList.remove('contact');

    // Check hole/mouth collisions
    let found = false;
    holes.forEach(hole => {
      if (contactMouth(hole)) {
        hole.classList.add('contact');
        document.body.classList.add('contact');
        currentHole = hole.dataset.hole;
        found = true;
      } else if (!found) {
        hole.classList.remove('contact');
        currentHole = 0;
      }
    });
  });


  window.addEventListener('keydown', e => {

    if (e.key === 'ArrowDown') {
      document.body.classList.remove('blowing');
      document.body.classList.add('drawing');
      keyPressed = e.key;
      setCurrentNote('drawing');
    } else if (e.key === 'ArrowUp') {
      document.body.classList.remove('drawing')
      document.body.classList.add('blowing')
      keyPressed = e.key;
      setCurrentNote('blowing');
    }
  });


  window.addEventListener('keyup', e => {
    if (e.key === 'ArrowDown') {
      document.body.classList.remove('drawing')
    } else if (e.key === 'ArrowUp') {
      document.body.classList.remove('blowing')
    }

    if (keyPressed === e.key) {
      keyPressed = null;
      setCurrentNote('idle');
    }
  });

}


// A FAIRE ::

// fn onResize() : réajuster les centres