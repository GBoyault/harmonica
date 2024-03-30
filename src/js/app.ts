// app.js
import { tuning, tone, airState } from "./definitions";

import { tunings, f } from "./components/tunings";
import { semitone } from "./components/utils";
import SoundPlayer from "./components/SoundPlayer";
import StatsManager from "./components/StatsManager";
import KeysManager from "./components/KeysManager";
import initIntro from "./components/IntroManager";

export default class App {
  player: SoundPlayer;
  stats: StatsManager;
  keys: KeysManager;
  harmo: HTMLElement;
  mouth: HTMLElement;
  holes: NodeListOf<HTMLElement>;
  mouthRect: DOMRect;
  harmoCenterX: number;
  harmoCenterY: number;
  toleranceX: number;
  toleranceY: number;
  currentHole: number;
  currentTuning: tuning;
  currentTone: tone;
  transposition: number;
  currentNoteCode: string;
  currentAirState: airState | null;

  constructor() {
    // Utilities
    this.player = new SoundPlayer();
    this.stats = new StatsManager();
    this.keys = new KeysManager();

    // DOM elements
    this.harmo = document.getElementById("harmonica")!;
    this.mouth = document.querySelector("#mouth .hole")!;
    this.holes = document.querySelectorAll("#harmonica .hole");

    // Params for mouth / harmonica collisions
    this.mouthRect = this.mouth.getBoundingClientRect();
    this.harmoCenterX = 240;
    this.harmoCenterY = 20;
    this.toleranceX = 5;
    this.toleranceY = 20;

    // Initial params for stats
    this.currentHole = 0;
    this.currentTuning = "richter";
    this.currentTone = "C";
    this.transposition = 0; // in semitone: C = 0, C# = 1, B = -1 etc
    this.currentNoteCode = "0";
    this.currentAirState = null;

    initIntro(this.player);

    this.initEventListeners();

    // First update stats
    this.stats.updateTuning(this.currentTuning);
    this.stats.updateTone(this.currentTone);

    // Request animation frame
    this.startLoop();
  }

  initEventListeners = () => {
    window.addEventListener("keydown", this.handleKeys);
    window.addEventListener("keyup", this.handleKeys);
    window.addEventListener("mousemove", this.handleMouse);

    window.addEventListener("resize", () => {
      this.mouthRect = this.mouth.getBoundingClientRect();
    });

    const tuning = document.getElementById("tuning")!;
    tuning.addEventListener("click", this.changeTuning);

    const tone = document.getElementById("tone")!;
    tone.addEventListener("click", this.changeTone);
  };

  changeTuning = () => {
    if ("richter" === this.currentTuning) {
      this.currentTuning = "paddy";
    } else if ("paddy" === this.currentTuning) {
      this.currentTuning = "morti";
    } else {
      this.currentTuning = "richter";
    }

    this.stats.updateTuning(this.currentTuning);
  };

  changeTone = () => {
    const index = Object.keys(f).findIndex((tone) => tone === this.currentTone);

    if (index === -1) {
      return;
    }

    const newIndex = index < 11 ? index + 1 : 0;
    this.currentTone = Object.keys(f)[newIndex] as tone;
    this.transposition = newIndex < 7 ? newIndex : newIndex - 12;
    this.stats.updateTone(this.currentTone);
  };

  /**
   *
   * @param {MouseEvent} event
   */
  handleMouse = (event: MouseEvent) => {
    // Move harmonica
    this.harmo.style.left = event.clientX - this.harmoCenterX + "px";
    this.harmo.style.top = event.clientY - this.harmoCenterY + "px";

    document.body.classList.remove("contact");

    // Check hole/mouth collisions
    let found = false;
    this.holes.forEach((hole) => {
      if (this.contactMouth(hole)) {
        hole.classList.add("contact");
        document.body.classList.add("contact");
        this.currentHole = +hole.dataset.hole!;
        found = true;
      } else if (!found) {
        hole.classList.remove("contact");
        this.currentHole = 0;
      }
    });

    // Update stats
    this.stats.updateHole(this.currentHole);
  };

  /**
   *
   * @param {KeyEvent} event
   */
  handleKeys = (event: KeyboardEvent) => {
    const { keysPressed, airState } = this.keys.keyEvent(event);

    // Store air state
    this.currentAirState = airState;

    // Update stats
    this.stats.updateKeys(keysPressed);
    this.stats.updateAir(airState);

    // Update DOM
    document.body.classList.remove("blow", "draw");
    if (airState && airState.includes("blow")) {
      document.body.classList.add("blow");
    } else if (airState && airState.includes("draw")) {
      document.body.classList.add("draw");
    }
  };

  setCurrentNote = () => {
    const lastNoteCode = this.currentNoteCode;

    switch (this.currentAirState) {
      case "blow":
        this.currentNoteCode = this.currentHole.toString();
        break;
      case "blow_b1":
        this.currentNoteCode = this.currentHole + "-";
        break;
      case "blow_b2":
        this.currentNoteCode = this.currentHole + "--";
        break;
      case "draw":
        this.currentNoteCode = (this.currentHole * -1).toString();
        break;
      case "draw_b1":
        this.currentNoteCode = this.currentHole * -1 + "-";
        break;
      case "draw_b2":
        this.currentNoteCode = this.currentHole * -1 + "--";
        break;
      case "draw_b3":
        this.currentNoteCode = this.currentHole * -1 + "---";
        break;
      default:
        this.currentNoteCode = "0";
        break;
    }

    if ([-0, "-0", "0-", "0--", "0---"].includes(this.currentNoteCode)) {
      this.currentNoteCode = "0";
    }

    const tuningObject = tunings[this.currentTuning];
    const noteCode = this.currentNoteCode as keyof typeof tuningObject;
    const freq = tuningObject[noteCode];

    const transposedFreq =
      this.transposition !== 0
        ? freq && Math.trunc(freq * semitone(this.transposition) * 100) / 100
        : freq;

    if (this.currentNoteCode === lastNoteCode) {
      return;
    }
    
    if (this.currentNoteCode === "0") {
      this.player.stop();

      this.stats.updateFreq(transposedFreq);
      this.stats.updateNote(freq, this.transposition);
    } else {
      if (transposedFreq) {
        this.player.play(transposedFreq);

        this.stats.updateFreq(transposedFreq);
        this.stats.updateNote(freq, this.transposition);
      }
    }
  };

  /**
   *
   * @param {HTMLElement} hole
   * @returns {boolean}
   */
  contactMouth = (hole: HTMLElement) => {
    const holeRect = hole.getBoundingClientRect();

    return (
      holeRect.x > this.mouthRect.x - this.toleranceX &&
      holeRect.x + holeRect.width <
        this.mouthRect.x + this.mouthRect.width + this.toleranceX &&
      holeRect.y > this.mouthRect.y - this.toleranceY &&
      holeRect.y + holeRect.height <
        this.mouthRect.y + this.mouthRect.height + this.toleranceY
    );
  };

  startLoop = () => {
    const raf = window.requestAnimationFrame;

    const loop = () => {
      this.setCurrentNote();
      raf(loop);
    };

    loop();
  };
}
