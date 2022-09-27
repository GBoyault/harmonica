// app.js

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

if (harmo && holes.length) {

  const contactMouth = hole => {
    const holeRect = hole.getBoundingClientRect();

    return holeRect.x > mouthRect.x - toleranceX
      & holeRect.x + holeRect.width < mouthRect.x + mouthRect.width + toleranceX
      & holeRect.y > mouthRect.y - toleranceY
      & holeRect.y + holeRect.height < mouthRect.y + mouthRect.height + toleranceY
  }


  window.addEventListener('mousemove', e => {
    // Move harmonica
    harmo.style.left = (e.clientX - harmoCenterX) + 'px'
    harmo.style.top = (e.clientY - harmoCenterY) + 'px'

    document.body.classList.remove('contact');

    // Check hole/mouth collisions
    holes.forEach(hole => {
      if (contactMouth(hole)) {
        hole.classList.add('contact');
        document.body.classList.add('contact');
      } else {
        hole.classList.remove('contact');
      }
    });
  });


  window.addEventListener('keydown', e => {

    if (e.key === 'ArrowDown') {
      document.body.classList.remove('blowing')
      document.body.classList.add('drawing')
    } else if (e.key === 'ArrowUp') {
      document.body.classList.remove('drawing')
      document.body.classList.add('blowing')
    }
  });


  window.addEventListener('keyup', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      document.body.classList.remove('blowing', 'drawing')
    }
  });

}