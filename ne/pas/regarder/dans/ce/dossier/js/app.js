/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_tunings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/tunings */ "./src/js/components/tunings.js");
/* harmony import */ var _components_SoundPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/SoundPlayer */ "./src/js/components/SoundPlayer.js");
/* harmony import */ var _components_StatsManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/StatsManager */ "./src/js/components/StatsManager.js");
/* harmony import */ var _components_KeysManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/KeysManager */ "./src/js/components/KeysManager.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// app.js





var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    // Utilities
    this.stats = new _components_StatsManager__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.player = new _components_SoundPlayer__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.keys = new _components_KeysManager__WEBPACK_IMPORTED_MODULE_3__["default"](); // DOM elements

    this.harmo = document.getElementById('harmonica');
    this.mouth = document.querySelector('#mouth .hole');
    this.holes = document.querySelectorAll('#harmonica .hole'); // Computed values

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
    this.stats.updateTuning(this.currentTuning); // Request animation frame

    this.startLoop();
  }

  _createClass(App, [{
    key: "initEventListeners",
    value: function initEventListeners() {
      var _this = this;

      window.addEventListener('keydown', this.handleKeys);
      window.addEventListener('keyup', this.handleKeys);
      window.addEventListener('mousemove', this.handleMouse);
      window.addEventListener('resize', function (e) {
        _this.mouthRect = _this.mouth.getBoundingClientRect();
      });
    }
  }, {
    key: "handleMouse",
    value: function handleMouse(event) {
      var _this2 = this;

      // Move harmonica
      this.harmo.style.left = event.clientX - this.harmoCenterX + 'px';
      this.harmo.style.top = event.clientY - this.harmoCenterY + 'px';
      document.body.classList.remove('contact'); // Check hole/mouth collisions

      var found = false;
      this.holes.forEach(function (hole) {
        if (_this2.contactMouth(hole)) {
          hole.classList.add('contact');
          document.body.classList.add('contact');
          _this2.currentHole = hole.dataset.hole;
          found = true;
        } else if (!found) {
          hole.classList.remove('contact');
          _this2.currentHole = 0;
        }
      }); // Update stats

      this.stats.updateHole(this.currentHole);
    }
  }, {
    key: "handleKeys",
    value: function handleKeys(event) {
      var keyState = this.keys.keyEvent(event); // Store air state

      this.currentAirState = keyState.airState; // Update stats

      this.stats.updateKeys(keyState.keysPressed);
      this.stats.updateAir(keyState.airState); // Update DOM

      document.body.classList.remove('blow', 'draw');

      if (keyState.airState.includes('blow')) {
        document.body.classList.add('blow');
      } else if (keyState.airState.includes('draw')) {
        document.body.classList.add('draw');
      }
    }
  }, {
    key: "setCurrentNote",
    value: function setCurrentNote() {
      var lastNoteCode = this.currentNoteCode;

      if ('blow' === this.currentAirState) {
        this.currentNoteCode = this.currentHole;
      } else if ('blow_b1' === this.currentAirState) {
        this.currentNoteCode = this.currentHole + '-';
      } else if ('blow_b2' === this.currentAirState) {
        this.currentNoteCode = this.currentHole + '--';
      } else if ('draw' === this.currentAirState) {
        this.currentNoteCode = this.currentHole * -1;
      } else if ('draw_b1' === this.currentAirState) {
        this.currentNoteCode = this.currentHole * -1 + '-';
      } else if ('draw_b2' === this.currentAirState) {
        this.currentNoteCode = this.currentHole * -1 + '--';
      } else if ('draw_b3' === this.currentAirState) {
        this.currentNoteCode = this.currentHole * -1 + '---';
      } else {
        this.currentNoteCode = 0;
      }

      if ([-0, '-0', '0-', '0--', '0---'].includes(this.currentNoteCode)) {
        this.currentNoteCode = 0;
      }

      if (this.currentNoteCode === 0) {
        this.player.stop();
      } else if (this.currentNoteCode !== lastNoteCode) {
        var freq = _components_tunings__WEBPACK_IMPORTED_MODULE_0__["tunings"][this.currentTuning][this.currentNoteCode];
        this.player.play(freq);
      }

      this.stats.updateFreq(_components_tunings__WEBPACK_IMPORTED_MODULE_0__["tunings"][this.currentTuning][this.currentNoteCode]);
      this.stats.updateNote(_components_tunings__WEBPACK_IMPORTED_MODULE_0__["tunings"][this.currentTuning][this.currentNoteCode]);
    }
  }, {
    key: "contactMouth",
    value: function contactMouth(hole) {
      var holeRect = hole.getBoundingClientRect();
      return holeRect.x > this.mouthRect.x - this.toleranceX & holeRect.x + holeRect.width < this.mouthRect.x + this.mouthRect.width + this.toleranceX & holeRect.y > this.mouthRect.y - this.toleranceY & holeRect.y + holeRect.height < this.mouthRect.y + this.mouthRect.height + this.toleranceY;
    }
  }, {
    key: "startLoop",
    value: function startLoop() {
      var _this3 = this;

      var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

      var loop = function loop() {
        _this3.setCurrentNote();

        raf(loop);
      };

      if (raf) {
        loop();
      }
    }
  }]);

  return App;
}();

new App();

/***/ }),

/***/ "./src/js/components/KeysManager.js":
/*!******************************************!*\
  !*** ./src/js/components/KeysManager.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KeysManager; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// KeysManager.js
var KeysManager = /*#__PURE__*/function () {
  function KeysManager() {
    _classCallCheck(this, KeysManager);

    this.keys = [{
      key: 'r',
      fn: 'blow',
      pressed: false
    }, {
      key: 'e',
      fn: 'blow_b1',
      pressed: false
    }, {
      key: 'z',
      fn: 'blow_b2',
      pressed: false
    }, {
      key: 'f',
      fn: 'draw',
      pressed: false
    }, {
      key: 'd',
      fn: 'draw_b1',
      pressed: false
    }, {
      key: 's',
      fn: 'draw_b2',
      pressed: false
    }, {
      key: 'q',
      fn: 'draw_b3',
      pressed: false
    }];
  }

  _createClass(KeysManager, [{
    key: "keyEvent",
    value: function keyEvent(event) {
      var index = this.keys.findIndex(function (k) {
        return k.key === event.key;
      });
      var lastPressed = null;

      if (-1 !== index) {
        this.keys[index].pressed = event.type === 'keydown';

        if (event.type === 'keydown') {
          lastPressed = this.keys[index].fn;
        }
      }

      var keysPressed = this.keys.filter(function (k) {
        return k.pressed;
      });
      return {
        keysPressed: keysPressed.map(function (k) {
          return k.key;
        }),
        airState: this.computeAirState(keysPressed.map(function (k) {
          return k.fn;
        }), lastPressed)
      };
    }
  }, {
    key: "computeAirState",
    value: function computeAirState(keys, lastPressed) {
      var air = '-';

      if (keys.includes('blow')) {
        air = 'blow';

        if (keys.includes('blow_b1')) {
          air = 'blow_b1';

          if (keys.includes('blow_b2')) {
            air = 'blow_b2';
          }
        }
      }

      if (keys.includes('draw') && !(lastPressed !== null && lastPressed !== void 0 && lastPressed.includes('blow'))) {
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
  }]);

  return KeysManager;
}();



/***/ }),

/***/ "./src/js/components/Note.js":
/*!***********************************!*\
  !*** ./src/js/components/Note.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Note; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/components/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// Note.js


var Note = /*#__PURE__*/function () {
  function Note(ctx, freq) {
    _classCallCheck(this, Note);

    this.ctx = ctx;
    this.out = this.ctx.destination;
    this.attackTime = 0.1;
    this.releaseTime = 0.1;
    this.initGains();
    this.initOscillators(freq);
    this.play();
  }

  _createClass(Note, [{
    key: "initGains",
    value: function initGains() {
      this.gain1 = this.ctx.createGain();
      this.gain1.gain.setValueAtTime(0, this.ctx.currentTime);
      this.gain2 = this.ctx.createGain();
      this.gain2.gain.setValueAtTime(0, this.ctx.currentTime); // Main enveloppe

      this.env = this.ctx.createGain();
      this.env.gain.setValueAtTime(0, this.ctx.currentTime);
      this.env.connect(this.out);
    }
  }, {
    key: "initOscillators",
    value: function initOscillators(freq) {
      var type = 'sine'; // sine | sawtooth | triangle | square

      this.mod1 = this.ctx.createOscillator();
      this.mod1.type = type;
      this.mod2 = this.ctx.createOscillator();
      this.mod2.type = type;
      this.mod3 = this.ctx.createOscillator();
      this.mod3.type = type;
      this.setFreq(freq); // Osc 1 modulates osc 2

      this.mod1.connect(this.gain1);
      this.gain1.connect(this.mod2.detune); // Osc 2 modulates osc 3

      this.mod2.connect(this.gain2);
      this.gain2.connect(this.mod3.detune); // Osc 3 connects to main enveloppe

      this.mod3.connect(this.env);
    }
  }, {
    key: "setFreq",
    value: function setFreq(freq) {
      this.mod1.frequency.value = freq * Object(_utils__WEBPACK_IMPORTED_MODULE_0__["octave"])(3) * Object(_utils__WEBPACK_IMPORTED_MODULE_0__["semitone"])(4);
      this.mod2.frequency.value = freq;
      this.mod3.frequency.value = freq * Object(_utils__WEBPACK_IMPORTED_MODULE_0__["octave"])(1);
    }
  }, {
    key: "play",
    value: function play() {
      var now = this.ctx.currentTime;
      this.env.gain.linearRampToValueAtTime(1, now + this.attackTime);
      this.gain1.gain.linearRampToValueAtTime(1000, now + this.attackTime); // this.gain1.gain.setValueAtTime(1000, now);

      this.gain2.gain.linearRampToValueAtTime(1000, now + this.attackTime); // this.gain2.gain.setValueAtTime(1000, now);

      this.mod1.start();
      this.mod2.start();
      this.mod3.start();
    }
  }, {
    key: "stop",
    value: function stop() {
      var now = this.ctx.currentTime;
      this.gain1.gain.linearRampToValueAtTime(0, now + this.releaseTime);
      this.gain2.gain.linearRampToValueAtTime(0, now + this.releaseTime);
      this.env.gain.linearRampToValueAtTime(0, now + this.releaseTime); // setTimeout(() => {

      this.mod1.stop(now + this.releaseTime + 0.1);
      this.mod2.stop(now + this.releaseTime + 0.1);
      this.mod3.stop(now + this.releaseTime + 0.1); // }, 500);
    }
  }]);

  return Note;
}();



/***/ }),

/***/ "./src/js/components/SoundPlayer.js":
/*!******************************************!*\
  !*** ./src/js/components/SoundPlayer.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SoundPlayer; });
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Note */ "./src/js/components/Note.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// SoundPlayer.js


var SoundPlayer = /*#__PURE__*/function () {
  function SoundPlayer() {
    _classCallCheck(this, SoundPlayer);

    this.playing = false;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.notes = [];
  }

  _createClass(SoundPlayer, [{
    key: "play",
    value: function play(freq) {
      if (typeof freq !== 'number') {
        return;
      }

      if (this.playing) {
        this.notes[0].setFreq(freq);
      } else {
        if (this.notes.length) {
          // const lastNote = this.notes.shift();
          // lastNote.stop();
          this.notes[0].stop();
        }

        this.notes.unshift(new _Note__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx, freq));
        this.playing = true;
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.playing) {
        if (this.notes.length) {
          // const lastNote = this.notes.shift();
          // lastNote.stop();
          this.notes[0].stop();
        }

        this.playing = false;
      }
    }
  }]);

  return SoundPlayer;
}();



/***/ }),

/***/ "./src/js/components/StatsManager.js":
/*!*******************************************!*\
  !*** ./src/js/components/StatsManager.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StatsManager; });
/* harmony import */ var _tunings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tunings */ "./src/js/components/tunings.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// StatsManager.js


var StatsManager = /*#__PURE__*/function () {
  function StatsManager() {
    _classCallCheck(this, StatsManager);

    this.keys = document.getElementById('keys');
    this.hole = document.getElementById('hole');
    this.air = document.getElementById('air');
    this.note = document.getElementById('note');
    this.freq = document.getElementById('freq');
    this.tuning = document.getElementById('tuning');
  }

  _createClass(StatsManager, [{
    key: "updateKeys",
    value: function updateKeys() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-';
      this.keys.innerHTML = keys !== null && keys !== void 0 ? keys : '-';
    }
  }, {
    key: "updateHole",
    value: function updateHole() {
      var hole = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.hole.innerHTML = hole != 0 ? hole : '-';
    }
  }, {
    key: "updateAir",
    value: function updateAir() {
      var air = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-';
      this.air.innerHTML = air;
    }
  }, {
    key: "updateNote",
    value: function updateNote() {
      var freq = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-';
      var playedNote = '-';

      for (var _i = 0, _Object$entries = Object.entries(_tunings__WEBPACK_IMPORTED_MODULE_0__["f"]); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            note = _Object$entries$_i[0],
            frequencies = _Object$entries$_i[1];

        var index = frequencies.findIndex(function (fr) {
          return fr === freq;
        });

        if (-1 !== index) {
          playedNote = note + index;
        }
      }

      this.note.innerHTML = playedNote;
    }
  }, {
    key: "updateFreq",
    value: function updateFreq() {
      var freq = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-';
      this.freq.innerHTML = freq !== null && freq !== void 0 ? freq : '-';
    }
  }, {
    key: "updateTuning",
    value: function updateTuning() {
      var tuning = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-';
      this.tuning.innerHTML = tuning;
    }
  }]);

  return StatsManager;
}();



/***/ }),

/***/ "./src/js/components/tunings.js":
/*!**************************************!*\
  !*** ./src/js/components/tunings.js ***!
  \**************************************/
/*! exports provided: tunings, f */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tunings", function() { return tunings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return f; });
// tunings.js
// Frequencies
var f = {
  'C': [16.35, 32.70, 65.41, 130.8, 261.6, 523.3, 1047, 2093, 4186],
  'C#': [17.32, 34.65, 69.30, 138.6, 277.2, 554.4, 1109, 2217, 4435],
  'D': [18.35, 36.71, 73.42, 146.8, 293.7, 587.3, 1175, 2349, 4699],
  'Eb': [19.45, 38.89, 77.78, 155.6, 311.1, 622.3, 1245, 2489, 4978],
  'E': [20.60, 41.20, 82.41, 164.8, 329.6, 659.3, 1319, 2637, 5274],
  'F': [21.83, 43.65, 87.31, 174.6, 349.2, 698.5, 1397, 2794, 5588],
  'F#': [23.12, 46.25, 92.50, 185.0, 370.0, 740.0, 1480, 2960, 5920],
  'G': [24.50, 49.00, 98.00, 196.0, 392.0, 784.0, 1568, 3136, 6272],
  'Ab': [25.96, 51.91, 103.8, 207.7, 415.3, 830.6, 1661, 3322, 6645],
  'A': [27.50, 55.00, 110.0, 220.0, 440.0, 880.0, 1760, 3520, 7040],
  'Bb': [29.14, 58.27, 116.5, 233.1, 466.2, 932.3, 1865, 3729, 7459],
  'B': [30.87, 61.74, 123.5, 246.9, 493.9, 987.8, 1976, 3951, 7902]
}; // Tunings

var tunings = {
  richter: {
    '0': null,
    '1': f['C'][4],
    '-1': f['D'][4],
    '-1-': f['C#'][4],
    '2': f['E'][4],
    '-2': f['G'][4],
    '-2-': f['F#'][4],
    '-2--': f['F'][4],
    '3': f['G'][4],
    '-3': f['B'][4],
    '-3-': f['Bb'][4],
    '-3--': f['A'][4],
    '-3---': f['Ab'][4],
    '4': f['C'][5],
    '-4': f['D'][5],
    '-4-': f['C#'][5],
    '5': f['E'][5],
    '-5': f['F'][5],
    '6': f['G'][5],
    '-6': f['A'][5],
    '-6-': f['Ab'][5],
    '-7': f['B'][5],
    '7': f['C'][6],
    '-8': f['D'][6],
    '8-': f['Eb'][6],
    '8': f['E'][6],
    '-9': f['F'][6],
    '9-': f['F#'][6],
    '9': f['G'][6],
    '-10': f['A'][6],
    '10-': f['B'][6],
    '10--': f['Bb'][6],
    '10': f['C'][7]
  },
  paddy: {
    '0': null,
    '1': f['C'][4],
    '-1': f['D'][4],
    '-1-': f['C#'][4],
    '2': f['E'][4],
    '-2': f['G'][4],
    '-2-': f['F#'][4],
    '-2--': f['F'][4],
    '3': f['A'][4],
    '-3': f['B'][4],
    '-3-': f['Bb'][4],
    '4': f['C'][5],
    '-4': f['D'][5],
    '-4-': f['C#'][5],
    '5': f['E'][5],
    '-5': f['F'][5],
    '6': f['G'][5],
    '-6': f['A'][5],
    '-6-': f['Ab'][5],
    '-7': f['B'][5],
    '7': f['C'][6],
    '-8': f['D'][6],
    '8-': f['Eb'][6],
    '8': f['E'][6],
    '-9': f['F'][6],
    '9-': f['F#'][6],
    '9': f['G'][6],
    '-10': f['A'][6],
    '10-': f['B'][6],
    '10--': f['Bb'][6],
    '10': f['C'][7]
  }
};


/***/ }),

/***/ "./src/js/components/utils.js":
/*!************************************!*\
  !*** ./src/js/components/utils.js ***!
  \************************************/
/*! exports provided: semitone, octave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "semitone", function() { return semitone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "octave", function() { return octave; });
var semitone = function semitone(nb) {
  return Math.pow(Math.pow(2, 1 / 12), nb);
};

var octave = function octave(nb) {
  return Math.pow(2, nb);
};



/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/harmonica/src/js/app.js */"./src/js/app.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9LZXlzTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9Ob3RlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL1NvdW5kUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL1N0YXRzTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90dW5pbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3V0aWxzLmpzIl0sIm5hbWVzIjpbIkFwcCIsInN0YXRzIiwiU3RhdHNNYW5hZ2VyIiwicGxheWVyIiwiU291bmRQbGF5ZXIiLCJrZXlzIiwiS2V5c01hbmFnZXIiLCJoYXJtbyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJtb3V0aCIsInF1ZXJ5U2VsZWN0b3IiLCJob2xlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJtb3V0aFJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoYXJtb0NlbnRlclgiLCJoYXJtb0NlbnRlclkiLCJ0b2xlcmFuY2VYIiwidG9sZXJhbmNlWSIsImN1cnJlbnRIb2xlIiwiY3VycmVudFR1bmluZyIsImN1cnJlbnROb3RlQ29kZSIsImN1cnJlbnRBaXJTdGF0ZSIsImhhbmRsZU1vdXNlIiwiYmluZCIsImhhbmRsZUtleXMiLCJpbml0RXZlbnRMaXN0ZW5lcnMiLCJ1cGRhdGVUdW5pbmciLCJzdGFydExvb3AiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImV2ZW50Iiwic3R5bGUiLCJsZWZ0IiwiY2xpZW50WCIsInRvcCIsImNsaWVudFkiLCJib2R5IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZm91bmQiLCJmb3JFYWNoIiwiaG9sZSIsImNvbnRhY3RNb3V0aCIsImFkZCIsImRhdGFzZXQiLCJ1cGRhdGVIb2xlIiwia2V5U3RhdGUiLCJrZXlFdmVudCIsImFpclN0YXRlIiwidXBkYXRlS2V5cyIsImtleXNQcmVzc2VkIiwidXBkYXRlQWlyIiwiaW5jbHVkZXMiLCJsYXN0Tm90ZUNvZGUiLCJzdG9wIiwiZnJlcSIsInR1bmluZ3MiLCJwbGF5IiwidXBkYXRlRnJlcSIsInVwZGF0ZU5vdGUiLCJob2xlUmVjdCIsIngiLCJ3aWR0aCIsInkiLCJoZWlnaHQiLCJyYWYiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtc1JlcXVlc3RBbmltYXRpb25GcmFtZSIsImxvb3AiLCJzZXRDdXJyZW50Tm90ZSIsImtleSIsImZuIiwicHJlc3NlZCIsImluZGV4IiwiZmluZEluZGV4IiwiayIsImxhc3RQcmVzc2VkIiwidHlwZSIsImZpbHRlciIsIm1hcCIsImNvbXB1dGVBaXJTdGF0ZSIsImFpciIsIk5vdGUiLCJjdHgiLCJvdXQiLCJkZXN0aW5hdGlvbiIsImF0dGFja1RpbWUiLCJyZWxlYXNlVGltZSIsImluaXRHYWlucyIsImluaXRPc2NpbGxhdG9ycyIsImdhaW4xIiwiY3JlYXRlR2FpbiIsImdhaW4iLCJzZXRWYWx1ZUF0VGltZSIsImN1cnJlbnRUaW1lIiwiZ2FpbjIiLCJlbnYiLCJjb25uZWN0IiwibW9kMSIsImNyZWF0ZU9zY2lsbGF0b3IiLCJtb2QyIiwibW9kMyIsInNldEZyZXEiLCJkZXR1bmUiLCJmcmVxdWVuY3kiLCJ2YWx1ZSIsIm9jdGF2ZSIsInNlbWl0b25lIiwibm93IiwibGluZWFyUmFtcFRvVmFsdWVBdFRpbWUiLCJzdGFydCIsInBsYXlpbmciLCJBdWRpb0NvbnRleHQiLCJ3ZWJraXRBdWRpb0NvbnRleHQiLCJub3RlcyIsImxlbmd0aCIsInVuc2hpZnQiLCJub3RlIiwidHVuaW5nIiwiaW5uZXJIVE1MIiwicGxheWVkTm90ZSIsIk9iamVjdCIsImVudHJpZXMiLCJmIiwiZnJlcXVlbmNpZXMiLCJmciIsInJpY2h0ZXIiLCJwYWRkeSIsIm5iIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7SUFHTUEsRztFQUNKLGVBQWM7SUFBQTs7SUFDWjtJQUNBLEtBQUtDLEtBQUwsR0FBYSxJQUFJQyxnRUFBSixFQUFiO0lBQ0EsS0FBS0MsTUFBTCxHQUFjLElBQUlDLCtEQUFKLEVBQWQ7SUFDQSxLQUFLQyxJQUFMLEdBQVksSUFBSUMsK0RBQUosRUFBWixDQUpZLENBTVo7O0lBQ0EsS0FBS0MsS0FBTCxHQUFhQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBYjtJQUNBLEtBQUtDLEtBQUwsR0FBYUYsUUFBUSxDQUFDRyxhQUFULENBQXVCLGNBQXZCLENBQWI7SUFDQSxLQUFLQyxLQUFMLEdBQWFKLFFBQVEs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Q0FIRztFQUlSLE1BQU0sQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsSUFBM0MsRUFBaUQsSUFBakQsRUFBdUQsSUFBdkQsQ0FKRTtFQUtSLEtBQUssQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsSUFBM0MsRUFBaUQsSUFBakQsRUFBdUQsSUFBdkQsQ0FMRztFQU1SLEtBQUssQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsSUFBM0MsRUFBaUQsSUFBakQsRUFBdUQsSUFBdkQsQ0FORztFQU9SLE1BQU0sQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsSUFBM0MsRUFBaUQsSUFBakQsRUFBdUQsSUFBdkQsQ0FQRTtFQVFSLEtBQUssQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsSUFBM0MsRUFBaUQsSUFBakQsRUFBdUQsSUFBdkQsQ0FSRztFQVNSLE1BQU0sQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsSUFBM0MsRUFBaUQsSUFBakQsRUFBdUQsSUFBdkQsQ0FURTtFQVVSLEtBQUssQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsSUFBM0MsRUFBaUQsSUFBakQsRUFBdUQsSUFBdkQsQ0FWRztFQVdSLE1BQU0sQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMs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QkE7SUFzQkwsTUFBTUEsQ0FBQyxDQUFDLEdBQUQsQ0FBRCxDQUFPLENBQVAsQ0F0QkQ7SUF1QkwsTUFBTUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRLENBQVIsQ0F2QkQ7SUF3QkwsS0FBS0EsQ0FBQyxDQUFDLEdBQUQsQ0FBRCxDQUFPLENBQVAsQ0F4QkE7SUF5QkwsTUFBTUEsQ0FBQyxDQUFDLEdBQUQsQ0FBRCxDQUFPLENBQVAsQ0F6QkQ7SUEwQkwsTUFBTUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRLENBQVIsQ0ExQkQ7SUEyQkwsS0FBS0EsQ0FBQyxDQUFDLEdBQUQsQ0FBRCxDQUFPLENBQVAsQ0EzQkE7SUE0QkwsT0FBT0EsQ0FBQyxDQUFDLEdBQUQsQ0FBRCxDQUFPLENBQVAsQ0E1QkY7SUE2QkwsT0FBT0EsQ0FBQyxDQUFDLEdBQUQsQ0FBRCxDQUFPLENBQVAsQ0E3QkY7SUE4QkwsUUFBUUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRLENBQVIsQ0E5Qkg7SUErQkwsTUFBTUEsQ0FBQyxDQUFDLEdBQUQsQ0FBRCxDQUFPLENBQVA7RUEvQkQ7QUFwQ08sQ0FBaEI7Ozs7Ozs7Ozs7Ozs7QUNwQkE7QUFBQTtBQUFBO0FBQUEsSUFBTWhCLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUFxQixFQUFFO0VBQUEseUJBQU0sQ0FBTixFQUFZLElBQUksRUFBaEIsR0FBd0JBLEVBQXhCO0FBQUEsQ0FBbkI7O0FBRUEsSUFBTXRCLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUFzQixFQUFFO0VBQUEsZ0JBQUksQ0FBSixFQUFTQSxFQUFUO0FBQUEsQ0FBakIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLy8gYXBwLmpzXG5cbmltcG9ydCB7IHR1bmluZ3MgfSBmcm9tICcuL2NvbXBvbmVudHMvdHVuaW5ncyc7XG5pbXBvcnQgU291bmRQbGF5ZXIgZnJvbSAnLi9jb21wb25lbnRzL1NvdW5kUGxheWVyJztcbmltcG9ydCBTdGF0c01hbmFnZXIgZnJvbSAnLi9jb21wb25lbnRzL1N0YXRzTWFuYWdlcic7XG5pbXBvcnQgS2V5c01hbmFnZXIgZnJvbSAnLi9jb21wb25lbnRzL0tleXNNYW5hZ2VyJztcblxuXG5jbGFzcyBBcHAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBVdGlsaXRpZXNcbiAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzTWFuYWdlcigpO1xuICAgIHRoaXMucGxheWVyID0gbmV3IFNvdW5kUGxheWVyKCk7XG4gICAgdGhpcy5rZXlzID0gbmV3IEtleXNNYW5hZ2VyKCk7XG5cbiAgICAvLyBET00gZWxlbWVudHNcbiAgICB0aGlzLmhhcm1vID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hhcm1vbmljYScpO1xuICAgIHRoaXMubW91dGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW91dGggLmhvbGUnKTtcbiAgICB0aGlzLmhvbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2hhcm1vbmljYSAuaG9sZScpO1xuXG4gICAgLy8gQ29tcHV0ZWQgdmFsdWVzXG4gICAgdGhpcy5tb3V0aFJlY3QgPSB0aGlzLm1vdXRoLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuaGFybW9DZW50ZXJYID0gMjQwO1xuICAgIHRoaXMuaGFybW9DZW50ZXJZID0gMjA7XG4gICAgdGhpcy50b2xlcmFuY2VYID0gNTtcbiAgICB0aGlzLnRvbGVyYW5jZVkgPSAyMDtcblxuICAgIHRoaXMuY3VycmVudEhvbGUgPSAwO1xuICAgIHRoaXMuY3VycmVudFR1bmluZyA9ICdyaWNodGVyJzsgLy8gcmljaHRlciB8IHBhZGR5XG4gICAgdGhpcy5jdXJyZW50Tm90ZUNvZGUgPSAwO1xuICAgIHRoaXMuY3VycmVudEFpclN0YXRlID0gJy0nO1xuXG4gICAgdGhpcy5oYW5kbGVNb3VzZSA9IHRoaXMuaGFuZGxlTW91c2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUtleXMgPSB0aGlzLmhhbmRsZUtleXMuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuaW5pdEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5zdGF0cy51cGRhdGVUdW5pbmcodGhpcy5jdXJyZW50VHVuaW5nKTtcblxuICAgIC8vIFJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lXG4gICAgdGhpcy5zdGFydExvb3AoKTtcblxuICB9XG5cbiAgaW5pdEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZUtleXMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBlID0+IHtcbiAgICAgIHRoaXMubW91dGhSZWN0ID0gdGhpcy5tb3V0aC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlKGV2ZW50KSB7XG4gICAgLy8gTW92ZSBoYXJtb25pY2FcbiAgICB0aGlzLmhhcm1vLnN0eWxlLmxlZnQgPSAoZXZlbnQuY2xpZW50WCAtIHRoaXMuaGFybW9DZW50ZXJYKSArICdweCdcbiAgICB0aGlzLmhhcm1vLnN0eWxlLnRvcCA9IChldmVudC5jbGllbnRZIC0gdGhpcy5oYXJtb0NlbnRlclkpICsgJ3B4J1xuXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdjb250YWN0Jyk7XG5cbiAgICAvLyBDaGVjayBob2xlL21vdXRoIGNvbGxpc2lvbnNcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLmhvbGVzLmZvckVhY2goaG9sZSA9PiB7XG4gICAgICBpZiAodGhpcy5jb250YWN0TW91dGgoaG9sZSkpIHtcbiAgICAgICAgaG9sZS5jbGFzc0xpc3QuYWRkKCdjb250YWN0Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnY29udGFjdCcpO1xuICAgICAgICB0aGlzLmN1cnJlbnRIb2xlID0gaG9sZS5kYXRhc2V0LmhvbGU7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoIWZvdW5kKSB7XG4gICAgICAgIGhvbGUuY2xhc3NMaXN0LnJlbW92ZSgnY29udGFjdCcpO1xuICAgICAgICB0aGlzLmN1cnJlbnRIb2xlID0gMDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvLyBVcGRhdGUgc3RhdHNcbiAgICB0aGlzLnN0YXRzLnVwZGF0ZUhvbGUodGhpcy5jdXJyZW50SG9sZSk7XG4gIH1cblxuXG4gIGhhbmRsZUtleXMoZXZlbnQpIHtcbiAgICBjb25zdCBrZXlTdGF0ZSA9IHRoaXMua2V5cy5rZXlFdmVudChldmVudCk7XG5cbiAgICAvLyBTdG9yZSBhaXIgc3RhdGVcbiAgICB0aGlzLmN1cnJlbnRBaXJTdGF0ZSA9IGtleVN0YXRlLmFpclN0YXRlO1xuXG4gICAgLy8gVXBkYXRlIHN0YXRzXG4gICAgdGhpcy5zdGF0cy51cGRhdGVLZXlzKGtleVN0YXRlLmtleXNQcmVzc2VkKVxuICAgIHRoaXMuc3RhdHMudXBkYXRlQWlyKGtleVN0YXRlLmFpclN0YXRlKVxuXG4gICAgLy8gVXBkYXRlIERPTVxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnYmxvdycsICdkcmF3Jyk7XG4gICAgaWYgKGtleVN0YXRlLmFpclN0YXRlLmluY2x1ZGVzKCdibG93JykpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnYmxvdycpXG4gICAgfSBlbHNlIGlmIChrZXlTdGF0ZS5haXJTdGF0ZS5pbmNsdWRlcygnZHJhdycpKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RyYXcnKTtcbiAgICB9XG4gIH1cblxuICBzZXRDdXJyZW50Tm90ZSgpIHtcbiAgICBjb25zdCBsYXN0Tm90ZUNvZGUgPSB0aGlzLmN1cnJlbnROb3RlQ29kZTtcblxuICAgIGlmICgnYmxvdycgPT09IHRoaXMuY3VycmVudEFpclN0YXRlKSB7XG4gICAgICB0aGlzLmN1cnJlbnROb3RlQ29kZSA9IHRoaXMuY3VycmVudEhvbGU7XG4gICAgfSBlbHNlIGlmICgnYmxvd19iMScgPT09IHRoaXMuY3VycmVudEFpclN0YXRlKSB7XG4gICAgICB0aGlzLmN1cnJlbnROb3RlQ29kZSA9ICh0aGlzLmN1cnJlbnRIb2xlKSArICctJztcbiAgICB9IGVsc2UgaWYgKCdibG93X2IyJyA9PT0gdGhpcy5jdXJyZW50QWlyU3RhdGUpIHtcbiAgICAgIHRoaXMuY3VycmVudE5vdGVDb2RlID0gKHRoaXMuY3VycmVudEhvbGUpICsgJy0tJztcbiAgICB9IGVsc2UgaWYgKCdkcmF3JyA9PT0gdGhpcy5jdXJyZW50QWlyU3RhdGUpIHtcbiAgICAgIHRoaXMuY3VycmVudE5vdGVDb2RlID0gdGhpcy5jdXJyZW50SG9sZSAqIC0xO1xuICAgIH0gZWxzZSBpZiAoJ2RyYXdfYjEnID09PSB0aGlzLmN1cnJlbnRBaXJTdGF0ZSkge1xuICAgICAgdGhpcy5jdXJyZW50Tm90ZUNvZGUgPSAodGhpcy5jdXJyZW50SG9sZSAqIC0xKSArICctJztcbiAgICB9IGVsc2UgaWYgKCdkcmF3X2IyJyA9PT0gdGhpcy5jdXJyZW50QWlyU3RhdGUpIHtcbiAgICAgIHRoaXMuY3VycmVudE5vdGVDb2RlID0gKHRoaXMuY3VycmVudEhvbGUgKiAtMSkgKyAnLS0nO1xuICAgIH0gZWxzZSBpZiAoJ2RyYXdfYjMnID09PSB0aGlzLmN1cnJlbnRBaXJTdGF0ZSkge1xuICAgICAgdGhpcy5jdXJyZW50Tm90ZUNvZGUgPSAodGhpcy5jdXJyZW50SG9sZSAqIC0xKSArICctLS0nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnROb3RlQ29kZSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKFstMCwgJy0wJywgJzAtJywgJzAtLScsICcwLS0tJ10uaW5jbHVkZXModGhpcy5jdXJyZW50Tm90ZUNvZGUpKSB7XG4gICAgICB0aGlzLmN1cnJlbnROb3RlQ29kZSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY3VycmVudE5vdGVDb2RlID09PSAwKSB7XG4gICAgICB0aGlzLnBsYXllci5zdG9wKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnROb3RlQ29kZSAhPT0gbGFzdE5vdGVDb2RlKSB7XG4gICAgICBjb25zdCBmcmVxID0gdHVuaW5nc1t0aGlzLmN1cnJlbnRUdW5pbmddW3RoaXMuY3VycmVudE5vdGVDb2RlXVxuICAgICAgdGhpcy5wbGF5ZXIucGxheShmcmVxKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRzLnVwZGF0ZUZyZXEodHVuaW5nc1t0aGlzLmN1cnJlbnRUdW5pbmddW3RoaXMuY3VycmVudE5vdGVDb2RlXSk7XG4gICAgdGhpcy5zdGF0cy51cGRhdGVOb3RlKHR1bmluZ3NbdGhpcy5jdXJyZW50VHVuaW5nXVt0aGlzLmN1cnJlbnROb3RlQ29kZV0pO1xuICB9XG5cbiAgY29udGFjdE1vdXRoKGhvbGUpIHtcbiAgICBjb25zdCBob2xlUmVjdCA9IGhvbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICByZXR1cm4gaG9sZVJlY3QueCA+IHRoaXMubW91dGhSZWN0LnggLSB0aGlzLnRvbGVyYW5jZVhcbiAgICAgICYgaG9sZVJlY3QueCArIGhvbGVSZWN0LndpZHRoIDwgdGhpcy5tb3V0aFJlY3QueCArIHRoaXMubW91dGhSZWN0LndpZHRoICsgdGhpcy50b2xlcmFuY2VYXG4gICAgICAmIGhvbGVSZWN0LnkgPiB0aGlzLm1vdXRoUmVjdC55IC0gdGhpcy50b2xlcmFuY2VZXG4gICAgICAmIGhvbGVSZWN0LnkgKyBob2xlUmVjdC5oZWlnaHQgPCB0aGlzLm1vdXRoUmVjdC55ICsgdGhpcy5tb3V0aFJlY3QuaGVpZ2h0ICsgdGhpcy50b2xlcmFuY2VZXG4gIH1cblxuXG4gIHN0YXJ0TG9vcCgpIHtcbiAgICBjb25zdCByYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbiAgICBjb25zdCBsb29wID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRDdXJyZW50Tm90ZSgpO1xuICAgICAgcmFmKGxvb3ApO1xuICAgIH1cblxuICAgIGlmIChyYWYpIHtcbiAgICAgIGxvb3AoKTtcbiAgICB9XG4gIH1cbn1cblxuXG5uZXcgQXBwO1xuIiwiLy8gS2V5c01hbmFnZXIuanNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5c01hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMua2V5cyA9IFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAncicsXG4gICAgICAgIGZuOiAnYmxvdycsXG4gICAgICAgIHByZXNzZWQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdlJyxcbiAgICAgICAgZm46ICdibG93X2IxJyxcbiAgICAgICAgcHJlc3NlZDogZmFsc2VcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3onLFxuICAgICAgICBmbjogJ2Jsb3dfYjInLFxuICAgICAgICBwcmVzc2VkOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnZicsXG4gICAgICAgIGZuOiAnZHJhdycsXG4gICAgICAgIHByZXNzZWQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdkJyxcbiAgICAgICAgZm46ICdkcmF3X2IxJyxcbiAgICAgICAgcHJlc3NlZDogZmFsc2VcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3MnLFxuICAgICAgICBmbjogJ2RyYXdfYjInLFxuICAgICAgICBwcmVzc2VkOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAncScsXG4gICAgICAgIGZuOiAnZHJhd19iMycsXG4gICAgICAgIHByZXNzZWQ6IGZhbHNlXG4gICAgICB9LFxuICAgIF1cbiAgfVxuXG4gIGtleUV2ZW50KGV2ZW50KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmtleXMuZmluZEluZGV4KGsgPT4gay5rZXkgPT09IGV2ZW50LmtleSk7XG4gICAgbGV0IGxhc3RQcmVzc2VkID0gbnVsbDtcbiAgICBcbiAgICBpZiAoLTEgIT09IGluZGV4KSB7XG4gICAgICB0aGlzLmtleXNbaW5kZXhdLnByZXNzZWQgPSAoZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKTtcblxuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgICBsYXN0UHJlc3NlZCA9IHRoaXMua2V5c1tpbmRleF0uZm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qga2V5c1ByZXNzZWQgPSB0aGlzLmtleXMuZmlsdGVyKGsgPT4gay5wcmVzc2VkKTtcbiAgICByZXR1cm4ge1xuICAgICAga2V5c1ByZXNzZWQ6IGtleXNQcmVzc2VkLm1hcChrID0+IGsua2V5KSxcbiAgICAgIGFpclN0YXRlOiB0aGlzLmNvbXB1dGVBaXJTdGF0ZShrZXlzUHJlc3NlZC5tYXAoayA9PiBrLmZuKSwgbGFzdFByZXNzZWQpXG4gICAgfVxuICB9XG5cblxuXG4gIGNvbXB1dGVBaXJTdGF0ZShrZXlzLCBsYXN0UHJlc3NlZCkge1xuICAgIGxldCBhaXIgPSAnLSc7XG4gICAgaWYgKGtleXMuaW5jbHVkZXMoJ2Jsb3cnKSkge1xuICAgICAgYWlyID0gJ2Jsb3cnO1xuXG4gICAgICBpZiAoa2V5cy5pbmNsdWRlcygnYmxvd19iMScpKSB7XG4gICAgICAgIGFpciA9ICdibG93X2IxJztcblxuICAgICAgICBpZiAoa2V5cy5pbmNsdWRlcygnYmxvd19iMicpKSB7XG4gICAgICAgICAgYWlyID0gJ2Jsb3dfYjInO1xuICAgICAgICB9ICBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoa2V5cy5pbmNsdWRlcygnZHJhdycpICYmICFsYXN0UHJlc3NlZD8uaW5jbHVkZXMoJ2Jsb3cnKSkge1xuICAgICAgYWlyID0gJ2RyYXcnO1xuXG4gICAgICBpZiAoa2V5cy5pbmNsdWRlcygnZHJhd19iMScpKSB7XG4gICAgICAgIGFpciA9ICdkcmF3X2IxJztcblxuICAgICAgICBpZiAoa2V5cy5pbmNsdWRlcygnZHJhd19iMicpKSB7XG4gICAgICAgICAgYWlyID0gJ2RyYXdfYjInO1xuXG4gICAgICAgICAgaWYgKGtleXMuaW5jbHVkZXMoJ2RyYXdfYjMnKSkge1xuICAgICAgICAgICAgYWlyID0gJ2RyYXdfYjMnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhaXI7XG4gIH1cbn0iLCIvLyBOb3RlLmpzXG5cbmltcG9ydCB7IG9jdGF2ZSwgc2VtaXRvbmUgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90ZSB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgZnJlcSkge1xuXG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5vdXQgPSB0aGlzLmN0eC5kZXN0aW5hdGlvbjtcblxuICAgIHRoaXMuYXR0YWNrVGltZSA9IDAuMTtcbiAgICB0aGlzLnJlbGVhc2VUaW1lID0gMC4xO1xuXG4gICAgdGhpcy5pbml0R2FpbnMoKTtcbiAgICB0aGlzLmluaXRPc2NpbGxhdG9ycyhmcmVxKTtcbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxuXG4gIGluaXRHYWlucygpIHtcbiAgICB0aGlzLmdhaW4xID0gdGhpcy5jdHguY3JlYXRlR2FpbigpO1xuICAgIHRoaXMuZ2FpbjEuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLCB0aGlzLmN0eC5jdXJyZW50VGltZSk7XG5cbiAgICB0aGlzLmdhaW4yID0gdGhpcy5jdHguY3JlYXRlR2FpbigpO1xuICAgIHRoaXMuZ2FpbjIuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLCB0aGlzLmN0eC5jdXJyZW50VGltZSk7XG5cbiAgICAvLyBNYWluIGVudmVsb3BwZVxuICAgIHRoaXMuZW52ID0gdGhpcy5jdHguY3JlYXRlR2FpbigpO1xuICAgIHRoaXMuZW52LmdhaW4uc2V0VmFsdWVBdFRpbWUoMCwgdGhpcy5jdHguY3VycmVudFRpbWUpO1xuXG4gICAgdGhpcy5lbnYuY29ubmVjdCh0aGlzLm91dCk7XG4gIH1cblxuXG4gIGluaXRPc2NpbGxhdG9ycyhmcmVxKSB7XG4gICAgY29uc3QgdHlwZSA9ICdzaW5lJzsgLy8gc2luZSB8IHNhd3Rvb3RoIHwgdHJpYW5nbGUgfCBzcXVhcmVcblxuICAgIHRoaXMubW9kMSA9IHRoaXMuY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICB0aGlzLm1vZDEudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5tb2QyID0gdGhpcy5jdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgIHRoaXMubW9kMi50eXBlID0gdHlwZTtcbiAgICB0aGlzLm1vZDMgPSB0aGlzLmN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgdGhpcy5tb2QzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy5zZXRGcmVxKGZyZXEpO1xuXG4gICAgLy8gT3NjIDEgbW9kdWxhdGVzIG9zYyAyXG4gICAgdGhpcy5tb2QxLmNvbm5lY3QodGhpcy5nYWluMSk7XG4gICAgdGhpcy5nYWluMS5jb25uZWN0KHRoaXMubW9kMi5kZXR1bmUpO1xuXG4gICAgLy8gT3NjIDIgbW9kdWxhdGVzIG9zYyAzXG4gICAgdGhpcy5tb2QyLmNvbm5lY3QodGhpcy5nYWluMik7XG4gICAgdGhpcy5nYWluMi5jb25uZWN0KHRoaXMubW9kMy5kZXR1bmUpO1xuXG4gICAgLy8gT3NjIDMgY29ubmVjdHMgdG8gbWFpbiBlbnZlbG9wcGVcbiAgICB0aGlzLm1vZDMuY29ubmVjdCh0aGlzLmVudik7XG4gIH1cblxuXG4gIHNldEZyZXEoZnJlcSkge1xuICAgIHRoaXMubW9kMS5mcmVxdWVuY3kudmFsdWUgPSBmcmVxICogb2N0YXZlKDMpICogc2VtaXRvbmUoNCk7XG4gICAgdGhpcy5tb2QyLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXE7XG4gICAgdGhpcy5tb2QzLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXEgKiBvY3RhdmUoMSk7XG4gIH1cblxuXG4gIHBsYXkoKSB7XG4gICAgY29uc3Qgbm93ID0gdGhpcy5jdHguY3VycmVudFRpbWU7XG4gICAgdGhpcy5lbnYuZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgxLCBub3cgKyB0aGlzLmF0dGFja1RpbWUpO1xuXG4gICAgdGhpcy5nYWluMS5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDEwMDAsIG5vdyArIHRoaXMuYXR0YWNrVGltZSk7XG4gICAgLy8gdGhpcy5nYWluMS5nYWluLnNldFZhbHVlQXRUaW1lKDEwMDAsIG5vdyk7XG5cbiAgICB0aGlzLmdhaW4yLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMTAwMCwgbm93ICsgdGhpcy5hdHRhY2tUaW1lKTtcbiAgICAvLyB0aGlzLmdhaW4yLmdhaW4uc2V0VmFsdWVBdFRpbWUoMTAwMCwgbm93KTtcblxuICAgIHRoaXMubW9kMS5zdGFydCgpO1xuICAgIHRoaXMubW9kMi5zdGFydCgpO1xuICAgIHRoaXMubW9kMy5zdGFydCgpO1xuICB9XG5cblxuICBzdG9wKCkge1xuICAgIGNvbnN0IG5vdyA9IHRoaXMuY3R4LmN1cnJlbnRUaW1lO1xuXG4gICAgdGhpcy5nYWluMS5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIG5vdyArIHRoaXMucmVsZWFzZVRpbWUpO1xuICAgIHRoaXMuZ2FpbjIuZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLCBub3cgKyB0aGlzLnJlbGVhc2VUaW1lKTtcbiAgICB0aGlzLmVudi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIG5vdyArIHRoaXMucmVsZWFzZVRpbWUpO1xuICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRoaXMubW9kMS5zdG9wKG5vdyArIHRoaXMucmVsZWFzZVRpbWUgKyAwLjEpO1xuICAgIHRoaXMubW9kMi5zdG9wKG5vdyArIHRoaXMucmVsZWFzZVRpbWUgKyAwLjEpO1xuICAgIHRoaXMubW9kMy5zdG9wKG5vdyArIHRoaXMucmVsZWFzZVRpbWUgKyAwLjEpO1xuICAgIC8vIH0sIDUwMCk7XG4gIH1cblxufSIsIi8vIFNvdW5kUGxheWVyLmpzXG5cbmltcG9ydCBOb3RlIGZyb20gJy4vTm90ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvdW5kUGxheWVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XG4gICAgdGhpcy5jdHggPSBuZXcgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkoKTtcbiAgICB0aGlzLm5vdGVzID0gW107XG4gIH1cblxuXG4gIHBsYXkoZnJlcSkge1xuICAgIGlmICh0eXBlb2YgZnJlcSAhPT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wbGF5aW5nKSB7XG4gICAgICB0aGlzLm5vdGVzWzBdLnNldEZyZXEoZnJlcSk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgaWYgKHRoaXMubm90ZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIGNvbnN0IGxhc3ROb3RlID0gdGhpcy5ub3Rlcy5zaGlmdCgpO1xuICAgICAgICAvLyBsYXN0Tm90ZS5zdG9wKCk7XG5cbiAgICAgICAgdGhpcy5ub3Rlc1swXS5zdG9wKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubm90ZXMudW5zaGlmdChuZXcgTm90ZSh0aGlzLmN0eCwgZnJlcSkpO1xuICAgICAgdGhpcy5wbGF5aW5nID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLnBsYXlpbmcpIHtcbiAgICAgIGlmICh0aGlzLm5vdGVzLmxlbmd0aCkge1xuICAgICAgICAvLyBjb25zdCBsYXN0Tm90ZSA9IHRoaXMubm90ZXMuc2hpZnQoKTtcbiAgICAgICAgLy8gbGFzdE5vdGUuc3RvcCgpO1xuXG4gICAgICAgIHRoaXMubm90ZXNbMF0uc3RvcCgpO1xuXG4gICAgICB9XG4gICAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxufVxuIiwiLy8gU3RhdHNNYW5hZ2VyLmpzXG5cbmltcG9ydCB7IGYgfSBmcm9tICcuL3R1bmluZ3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c01hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMua2V5cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrZXlzJyk7XG4gICAgdGhpcy5ob2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbGUnKTtcbiAgICB0aGlzLmFpciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaXInKTtcbiAgICB0aGlzLm5vdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm90ZScpO1xuICAgIHRoaXMuZnJlcSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcmVxJyk7XG4gICAgdGhpcy50dW5pbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVuaW5nJyk7XG4gIH1cblxuICB1cGRhdGVLZXlzKGtleXMgPSAnLScpIHtcbiAgICB0aGlzLmtleXMuaW5uZXJIVE1MID0ga2V5cyA/PyAnLSc7XG4gIH1cblxuICB1cGRhdGVIb2xlKGhvbGUgPSAwKSB7XG4gICAgdGhpcy5ob2xlLmlubmVySFRNTCA9IGhvbGUgIT0gMCA/IGhvbGUgOiAnLSc7XG4gIH1cblxuICB1cGRhdGVBaXIoYWlyID0gJy0nKSB7XG4gICAgdGhpcy5haXIuaW5uZXJIVE1MID0gYWlyO1xuICB9XG5cbiAgdXBkYXRlTm90ZShmcmVxID0gJy0nKSB7XG4gICAgbGV0IHBsYXllZE5vdGUgPSAnLSc7XG5cbiAgICBmb3IgKGNvbnN0IFtub3RlLCBmcmVxdWVuY2llc10gb2YgT2JqZWN0LmVudHJpZXMoZikpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gZnJlcXVlbmNpZXMuZmluZEluZGV4KGZyID0+IGZyID09PSBmcmVxKTtcblxuICAgICAgaWYgKC0xICE9PSBpbmRleCkge1xuICAgICAgICBwbGF5ZWROb3RlID0gbm90ZSArIGluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubm90ZS5pbm5lckhUTUwgPSBwbGF5ZWROb3RlO1xuICB9XG4gIFxuICB1cGRhdGVGcmVxKGZyZXEgPSAnLScpIHtcbiAgICB0aGlzLmZyZXEuaW5uZXJIVE1MID0gZnJlcSA/PyAnLSc7XG4gIH1cblxuXG4gIHVwZGF0ZVR1bmluZyh0dW5pbmcgPSAnLScpIHtcbiAgICB0aGlzLnR1bmluZy5pbm5lckhUTUwgPSB0dW5pbmc7XG4gIH1cbn0iLCIvLyB0dW5pbmdzLmpzXG5cbi8vIEZyZXF1ZW5jaWVzXG5jb25zdCBmID0ge1xuICAnQyc6IFsxNi4zNSwgMzIuNzAsIDY1LjQxLCAxMzAuOCwgMjYxLjYsIDUyMy4zLCAxMDQ3LCAyMDkzLCA0MTg2XSxcbiAgJ0MjJzogWzE3LjMyLCAzNC42NSwgNjkuMzAsIDEzOC42LCAyNzcuMiwgNTU0LjQsIDExMDksIDIyMTcsIDQ0MzVdLFxuICAnRCc6IFsxOC4zNSwgMzYuNzEsIDczLjQyLCAxNDYuOCwgMjkzLjcsIDU4Ny4zLCAxMTc1LCAyMzQ5LCA0Njk5XSxcbiAgJ0ViJzogWzE5LjQ1LCAzOC44OSwgNzcuNzgsIDE1NS42LCAzMTEuMSwgNjIyLjMsIDEyNDUsIDI0ODksIDQ5NzhdLFxuICAnRSc6IFsyMC42MCwgNDEuMjAsIDgyLjQxLCAxNjQuOCwgMzI5LjYsIDY1OS4zLCAxMzE5LCAyNjM3LCA1Mjc0XSxcbiAgJ0YnOiBbMjEuODMsIDQzLjY1LCA4Ny4zMSwgMTc0LjYsIDM0OS4yLCA2OTguNSwgMTM5NywgMjc5NCwgNTU4OF0sXG4gICdGIyc6IFsyMy4xMiwgNDYuMjUsIDkyLjUwLCAxODUuMCwgMzcwLjAsIDc0MC4wLCAxNDgwLCAyOTYwLCA1OTIwXSxcbiAgJ0cnOiBbMjQuNTAsIDQ5LjAwLCA5OC4wMCwgMTk2LjAsIDM5Mi4wLCA3ODQuMCwgMTU2OCwgMzEzNiwgNjI3Ml0sXG4gICdBYic6IFsyNS45NiwgNTEuOTEsIDEwMy44LCAyMDcuNywgNDE1LjMsIDgzMC42LCAxNjYxLCAzMzIyLCA2NjQ1XSxcbiAgJ0EnOiBbMjcuNTAsIDU1LjAwLCAxMTAuMCwgMjIwLjAsIDQ0MC4wLCA4ODAuMCwgMTc2MCwgMzUyMCwgNzA0MF0sXG4gICdCYic6IFsyOS4xNCwgNTguMjcsIDExNi41LCAyMzMuMSwgNDY2LjIsIDkzMi4zLCAxODY1LCAzNzI5LCA3NDU5XSxcbiAgJ0InOiBbMzAuODcsIDYxLjc0LCAxMjMuNSwgMjQ2LjksIDQ5My45LCA5ODcuOCwgMTk3NiwgMzk1MSwgNzkwMl1cbn07XG5cblxuLy8gVHVuaW5nc1xuY29uc3QgdHVuaW5ncyA9IHtcbiAgcmljaHRlcjoge1xuICAgICcwJzogbnVsbCxcbiAgICAnMSc6IGZbJ0MnXVs0XSxcbiAgICAnLTEnOiBmWydEJ11bNF0sXG4gICAgJy0xLSc6IGZbJ0MjJ11bNF0sXG4gICAgJzInOiBmWydFJ11bNF0sXG4gICAgJy0yJzogZlsnRyddWzRdLFxuICAgICctMi0nOiBmWydGIyddWzRdLFxuICAgICctMi0tJzogZlsnRiddWzRdLFxuICAgICczJzogZlsnRyddWzRdLFxuICAgICctMyc6IGZbJ0InXVs0XSxcbiAgICAnLTMtJzogZlsnQmInXVs0XSxcbiAgICAnLTMtLSc6IGZbJ0EnXVs0XSxcbiAgICAnLTMtLS0nOiBmWydBYiddWzRdLFxuICAgICc0JzogZlsnQyddWzVdLFxuICAgICctNCc6IGZbJ0QnXVs1XSxcbiAgICAnLTQtJzogZlsnQyMnXVs1XSxcbiAgICAnNSc6IGZbJ0UnXVs1XSxcbiAgICAnLTUnOiBmWydGJ11bNV0sXG4gICAgJzYnOiBmWydHJ11bNV0sXG4gICAgJy02JzogZlsnQSddWzVdLFxuICAgICctNi0nOiBmWydBYiddWzVdLFxuICAgICctNyc6IGZbJ0InXVs1XSxcbiAgICAnNyc6IGZbJ0MnXVs2XSxcbiAgICAnLTgnOiBmWydEJ11bNl0sXG4gICAgJzgtJzogZlsnRWInXVs2XSxcbiAgICAnOCc6IGZbJ0UnXVs2XSxcbiAgICAnLTknOiBmWydGJ11bNl0sXG4gICAgJzktJzogZlsnRiMnXVs2XSxcbiAgICAnOSc6IGZbJ0cnXVs2XSxcbiAgICAnLTEwJzogZlsnQSddWzZdLFxuICAgICcxMC0nOiBmWydCJ11bNl0sXG4gICAgJzEwLS0nOiBmWydCYiddWzZdLFxuICAgICcxMCc6IGZbJ0MnXVs3XSxcbiAgfSxcbiAgcGFkZHk6IHtcbiAgICAnMCc6IG51bGwsXG4gICAgJzEnOiBmWydDJ11bNF0sXG4gICAgJy0xJzogZlsnRCddWzRdLFxuICAgICctMS0nOiBmWydDIyddWzRdLFxuICAgICcyJzogZlsnRSddWzRdLFxuICAgICctMic6IGZbJ0cnXVs0XSxcbiAgICAnLTItJzogZlsnRiMnXVs0XSxcbiAgICAnLTItLSc6IGZbJ0YnXVs0XSxcbiAgICAnMyc6IGZbJ0EnXVs0XSxcbiAgICAnLTMnOiBmWydCJ11bNF0sXG4gICAgJy0zLSc6IGZbJ0JiJ11bNF0sXG4gICAgJzQnOiBmWydDJ11bNV0sXG4gICAgJy00JzogZlsnRCddWzVdLFxuICAgICctNC0nOiBmWydDIyddWzVdLFxuICAgICc1JzogZlsnRSddWzVdLFxuICAgICctNSc6IGZbJ0YnXVs1XSxcbiAgICAnNic6IGZbJ0cnXVs1XSxcbiAgICAnLTYnOiBmWydBJ11bNV0sXG4gICAgJy02LSc6IGZbJ0FiJ11bNV0sXG4gICAgJy03JzogZlsnQiddWzVdLFxuICAgICc3JzogZlsnQyddWzZdLFxuICAgICctOCc6IGZbJ0QnXVs2XSxcbiAgICAnOC0nOiBmWydFYiddWzZdLFxuICAgICc4JzogZlsnRSddWzZdLFxuICAgICctOSc6IGZbJ0YnXVs2XSxcbiAgICAnOS0nOiBmWydGIyddWzZdLFxuICAgICc5JzogZlsnRyddWzZdLFxuICAgICctMTAnOiBmWydBJ11bNl0sXG4gICAgJzEwLSc6IGZbJ0InXVs2XSxcbiAgICAnMTAtLSc6IGZbJ0JiJ11bNl0sXG4gICAgJzEwJzogZlsnQyddWzddLFxuICB9XG59O1xuXG5leHBvcnQge3R1bmluZ3MsIGZ9O1xuIiwiY29uc3Qgc2VtaXRvbmUgPSBuYiA9PiAoKDIgKiogKDEgLyAxMikpICoqIG5iKTtcblxuY29uc3Qgb2N0YXZlID0gbmIgPT4gMiAqKiBuYjtcblxuZXhwb3J0IHsgc2VtaXRvbmUsIG9jdGF2ZSB9O1xuXG4iXSwic291cmNlUm9vdCI6IiJ9