// IntroManager.js

export default class IntroManager {
  /**
   * 
   * @param {SoundPlayer} player 
   */
  constructor(player) {
    this.player = player;
  }

  /**
   * 
   * @param {'pro'|'morti'} introType 
   */
  initIntro = (introType = 'pro') => {
    if (introType === 'morti') {
      this.initIntroMorti();
    }
    else {
      this.initIntroPro();
    }
  }

  initIntroPro = () => {
    const about = document.getElementById('about');
    const aboutBtn = document.getElementById('btn-about');

    if (about.classList.contains('deactivated')) {
      return;
    }

    const btn = document.querySelector('#about .play');

    btn.addEventListener('click', e => {
      about.classList.add('hidden');
      aboutBtn.classList.add('visible');
      this.player.init();
    });

    aboutBtn.addEventListener('click', e => {
      about.classList.remove('hidden');
      aboutBtn.classList.remove('visible');
    });
  }



  /**
   * 
   * The project was initially designed for my friend Morti,
   * hence this alternative introduction, currently deactivated
   */
  initIntroMorti = () => {
    const curtains = document.getElementById('curtains');

    if (curtains.classList.contains('deactivated')) {
      return;
    }

    const msg1 = document.getElementById('message-1');
    const msg2 = document.getElementById('message-2');
    const msg3 = document.getElementById('message-3');

    const btns1 = document.querySelectorAll('#message-1 .btn');
    const btns2 = document.querySelectorAll('#message-2 .btn');
    const btnsNo = document.querySelectorAll('.message .btn.no');

    msg1.classList.add('visible');

    btnsNo.forEach(btn => {
      btn.addEventListener('mouseenter', e => {
        let newFlexDir = 'row';
        if (getComputedStyle(btn.parentElement).flexDirection === 'row'
          || btn.parentElement.style.flexDirection === 'row') {
          newFlexDir = 'row-reverse'
        }
        btn.parentElement.style.flexDirection = newFlexDir;
      });
    });

    btns1.forEach(btn => {
      btn.addEventListener('click', e => {
        // Init audio context
        this.player.init();

        msg1.classList.remove('visible');

        setTimeout(() => {
          msg2.classList.add('visible');
        }, 500);
      });
    });


    btns2.forEach(btn => {
      btn.addEventListener('click', e => {
        msg2.classList.remove('visible');
        // curtains.classList.add('opening');
        this.player.playAudience();

        setTimeout(() => {
          curtains.classList.add('opening');
          msg3.classList.add('visible');
        }, 500);

        setTimeout(() => {
          curtains.classList.remove('opening');
          curtains.classList.add('open');
        }, 1000);

        setTimeout(() => {
          msg3.classList.remove('visible');
          this.player.stopAudience();
        }, 2500);
      });
    });
  }
}
