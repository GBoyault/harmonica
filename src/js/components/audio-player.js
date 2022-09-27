// audio-player.js


class AudioPlayer {
  constructor() {

    this.sounds = {
      main1: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/1.mp3'),
      main2: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/2.mp3'),
      main3: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/3.mp3'),
      main4: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/4.mp3'),
      main5: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/5.mp3'),
      main6: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/6.mp3'),
      main7: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/7.mp3'),
      main8: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/8.mp3'),
      main9: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/9.mp3'),
      mainNantes: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/nantes.mp3'),
      mainSax: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/sax.mp3'),
      mainSax2: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/sax.mp3'),
      lol: new Audio('ne/pas/regarder/dans/ce/dossier/audio/main/lol.mp3'),

      tim: {
        instru: new Audio('ne/pas/regarder/dans/ce/dossier/audio/tim/instru.mp3'),
        prenom: new Audio('ne/pas/regarder/dans/ce/dossier/audio/tim/prenom.mp3'),
        prenom2: new Audio('ne/pas/regarder/dans/ce/dossier/audio/tim/prenom.mp3'),
        ville: new Audio('ne/pas/regarder/dans/ce/dossier/audio/tim/ville.mp3'),
      },

      victor: {
        instru: new Audio('ne/pas/regarder/dans/ce/dossier/audio/victor/instru.mp3'),
        prenom: new Audio('ne/pas/regarder/dans/ce/dossier/audio/victor/prenom.mp3'),
        prenom2: new Audio('ne/pas/regarder/dans/ce/dossier/audio/victor/prenom.mp3'),
        ville: new Audio('ne/pas/regarder/dans/ce/dossier/audio/victor/ville.mp3'),
        perso: new Audio('ne/pas/regarder/dans/ce/dossier/audio/victor/perso.mp3'),
      },
      loic: {
        instru: new Audio('ne/pas/regarder/dans/ce/dossier/audio/loic/instru.mp3'),
        prenom: new Audio('ne/pas/regarder/dans/ce/dossier/audio/loic/prenom.mp3'),
        prenom2: new Audio('ne/pas/regarder/dans/ce/dossier/audio/loic/prenom.mp3'),
        ville: new Audio('ne/pas/regarder/dans/ce/dossier/audio/loic/ville.mp3'),
      },
      quentin: {
        instru: new Audio('ne/pas/regarder/dans/ce/dossier/audio/quentin/instru.mp3'),
        prenom: new Audio('ne/pas/regarder/dans/ce/dossier/audio/quentin/prenom.mp3'),
        prenom2: new Audio('ne/pas/regarder/dans/ce/dossier/audio/quentin/prenom.mp3'),
        ville: new Audio('ne/pas/regarder/dans/ce/dossier/audio/quentin/ville.mp3'),
      },
      xaviere: {
        instru: new Audio('ne/pas/regarder/dans/ce/dossier/audio/xaviere/instru.mp3'),
        prenom: new Audio('ne/pas/regarder/dans/ce/dossier/audio/xaviere/prenom.mp3'),
        prenom2: new Audio('ne/pas/regarder/dans/ce/dossier/audio/xaviere/prenom.mp3'),
        ville: new Audio('ne/pas/regarder/dans/ce/dossier/audio/xaviere/ville.mp3'),
      },
      pierrej: {
        instru: new Audio('ne/pas/regarder/dans/ce/dossier/audio/pierrej/instru.mp3'),
        prenom: new Audio('ne/pas/regarder/dans/ce/dossier/audio/pierrej/prenom.mp3'),
        prenom2: new Audio('ne/pas/regarder/dans/ce/dossier/audio/pierrej/prenom.mp3'),
        ville: new Audio('ne/pas/regarder/dans/ce/dossier/audio/pierrej/ville.mp3'),
      }
    };
  }


  playSequence(friend, error = false) {

    const wrapper = document.getElementById('main-wrapper');

    if (error) {
      wrapper.classList.add('playing');
      this.sounds.lol.play();
      this.sounds.lol.addEventListener('ended', () => {
        wrapper.classList.remove('playing');
        this.sounds.lol.currentTime = 0;
      });
      return;
    }

    let playing = 0;

    const sequence = [
      this.sounds.main1,
      this.sounds[friend].prenom,
      this.sounds.main2,
      this.sounds[friend].ville,
      this.sounds.main3,
      this.sounds[friend].instru,
      this.sounds.main4,
      this.sounds.mainNantes,
      this.sounds.main5,
      this.sounds.mainSax,
      this.sounds.main6,
      this.sounds.mainSax2,
      this.sounds.main7,
      this.sounds.main8,
      this.sounds[friend].prenom2,
      this.sounds.main9,
    ];

    if (friend === 'victor') {
      sequence.push(this.sounds[friend].perso);
    }

    const lastIndex = sequence.length - 1;

    sequence.forEach(sound => {

      sound.onended = () => {

        if (playing < lastIndex) {
          sequence[playing].currentTime = 0;
          playing++;
          sequence[playing].play();
          sound.onended = null;
          
        } else {
          wrapper.classList.remove('playing');
        }

      }
    });



    // Start playing
    wrapper.classList.add('playing');
    sequence[0].play();

  }
}



export default new AudioPlayer();
