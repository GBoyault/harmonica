// app.js

import soundPlayer from './components/sound-player';
import tunings from './components/tunings';

// soundPlayer.playNote(447, 'sine');
// soundPlayer.playNote(440, 'square');
// soundPlayer.playNote(1047, 'triangle');
// soundPlayer.playNote(1047, 'sawtooth');

// DOM elements
const harmo = document.getElementById('harmonica');
const mouth = document.querySelector('#mouth .hole');
const holes = document.querySelectorAll('#harmonica .hole')

// Computed values
let mouthRect = mouth.getBoundingClientRect();
const harmoCenterX = 240;
const harmoCenterY = 20;
const toleranceX = 5;
const toleranceY = 20;

let keyPressed = null;

let currentHole = 0;
let currentTuning = 'paddy'; // richter | paddy
let currentNoteCode = 'silence';
let releasedKey = false;

let bending = '';
let firstDrawTimestamp = Date.now();

if (harmo && holes.length) {

  const contactMouth = hole => {
    const holeRect = hole.getBoundingClientRect();

    return holeRect.x > mouthRect.x - toleranceX
      & holeRect.x + holeRect.width < mouthRect.x + mouthRect.width + toleranceX
      & holeRect.y > mouthRect.y - toleranceY
      & holeRect.y + holeRect.height < mouthRect.y + mouthRect.height + toleranceY
  }

  const setCurrentNote = air => {
    const lastNoteCode = currentNoteCode;

    if ('blowing' === air) {
      currentNoteCode = currentHole;
      bending = '';
    } else if ('drawing' === air) {
      currentNoteCode = currentHole * -1;

      if (currentNoteCode === -4) {

        if (releasedKey) {

          const timestamp = Date.now();
          const diff = timestamp - firstDrawTimestamp

          if (diff < 250) {
            bending = '-';
          }

          currentNoteCode = (currentHole * -1) + bending;
          console.log('diff ' + diff)
        } else {
          firstDrawTimestamp = Date.now();
        }
      }

      releasedKey = false;
    } else {
      currentNoteCode = 0
      bending = '';
      releasedKey = true;

      setTimeout(() => {
        releasedKey = false;
      }, 500)
    }

    console.log('relased ' + releasedKey)

    if (currentNoteCode === 0) {
      soundPlayer.stopNote();
    } else if (currentNoteCode !== lastNoteCode) {
      const noteArr = tunings[currentTuning][currentNoteCode].split('-')
      const note = noteArr[0];
      const range = noteArr[1];
      soundPlayer.playNote(note, range);
    }

    const statPlayedNote = document.getElementById('played-note');
    statPlayedNote.innerHTML = tunings[currentTuning][currentNoteCode];
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
      document.body.classList.remove('drawing');
    } else if (e.key === 'ArrowUp') {
      document.body.classList.remove('blowing')
    }

    if (keyPressed === e.key) {
      keyPressed = null;
      setCurrentNote('idle');
    }
  });


  window.addEventListener('resize', e => {
    mouthRect = mouth.getBoundingClientRect();
  });


}


// A FAIRE ::

// restructurer en classe


// regarder synthese sonore du site de bouche de yann