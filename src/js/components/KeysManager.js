// KeysManager.js

export default class KeysManager {
  constructor() {

    this.keys = [
      {
        key: 'r',
        fn: 'blow',
        pressed: false
      },
      {
        key: 'e',
        fn: 'blow_b1',
        pressed: false
      },
      {
        key: 'z',
        fn: 'blow_b2',
        pressed: false
      },
      {
        key: 'f',
        fn: 'draw',
        pressed: false
      },
      {
        key: 'd',
        fn: 'draw_b1',
        pressed: false
      },
      {
        key: 's',
        fn: 'draw_b2',
        pressed: false
      },
      {
        key: 'q',
        fn: 'draw_b3',
        pressed: false
      },
    ]
  }

  /**
   * 
   * @param {Object} event 
   * @returns {Object}
   */
  keyEvent(event) {
    const index = this.keys.findIndex(k => k.key === event.key);
    let lastPressed = null;
    
    if (-1 !== index) {
      this.keys[index].pressed = (event.type === 'keydown');

      if (event.type === 'keydown') {
        lastPressed = this.keys[index].fn;
      }
    }

    const keysPressed = this.keys.filter(k => k.pressed);
    
    return {
      keysPressed: keysPressed.map(k => k.key),
      airState: this.computeAirState(keysPressed.map(k => k.fn), lastPressed)
    }
  }



  /**
   * 
   * @param {Array} keys 
   * @param {boolean} lastPressed 
   * @returns {string}
   */
  computeAirState(keys, lastPressed) {
    let air = '-';
    if (keys.includes('blow')) {
      air = 'blow';

      if (keys.includes('blow_b1')) {
        air = 'blow_b1';

        if (keys.includes('blow_b2')) {
          air = 'blow_b2';
        }  
      }
    }

    if (keys.includes('draw') && !lastPressed?.includes('blow')) {
      air = 'draw';

      if (keys.includes('draw_b1')) {
        air = 'draw_b1';

        if (keys.includes('draw_b2')) {
          air = 'draw_b2';

          if (keys.includes('draw_b3')) {
            air = 'draw_b3';
          }
        }
      }
    }

    return air;
  }
}