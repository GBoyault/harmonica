// KeysManager.js
import { airState, key } from "../definitions";

export default class KeysManager {
  keys: key[];

  constructor() {
    this.keys = [
      {
        key: "r",
        fn: "blow",
        pressed: false,
      },
      {
        key: "e",
        fn: "blow_b1",
        pressed: false,
      },
      {
        key: "z",
        fn: "blow_b2",
        pressed: false,
      },
      {
        key: "f",
        fn: "draw",
        pressed: false,
      },
      {
        key: "d",
        fn: "draw_b1",
        pressed: false,
      },
      {
        key: "s",
        fn: "draw_b2",
        pressed: false,
      },
      {
        key: "q",
        fn: "draw_b3",
        pressed: false,
      },
    ];
  }

  /**
   * @param event
   * @returns
   */
  keyEvent(event: KeyboardEvent) {
    const index = this.keys.findIndex((k) => k.key === event.key);
    let lastAirState: airState | null = null;

    if (-1 !== index) {
      this.keys[index].pressed = event.type === "keydown";

      if (event.type === "keydown") {
        lastAirState = this.keys[index].fn;
      }
    }

    const keysPressed = this.keys.filter((k) => k.pressed);

    return {
      keysPressed: keysPressed.map((k) => k.key),
      airState: this.computeAirState(
        keysPressed.map((k) => k.fn),
        lastAirState
      ),
    };
  }

  /**
   * @param airStates
   * @param lastAirState
   * @returns
   */
  computeAirState(airStates: airState[], lastAirState: airState | null) {
    let air: airState | null = null;

    if (airStates.includes("blow")) {
      air = "blow";

      if (airStates.includes("blow_b1")) {
        air = "blow_b1";

        if (airStates.includes("blow_b2")) {
          air = "blow_b2";
        }
      }
    }

    if (airStates.includes("draw") && !lastAirState?.includes("blow")) {
      air = "draw";

      if (airStates.includes("draw_b1")) {
        air = "draw_b1";

        if (airStates.includes("draw_b2")) {
          air = "draw_b2";

          if (airStates.includes("draw_b3")) {
            air = "draw_b3";
          }
        }
      }
    }

    return air;
  }
}
