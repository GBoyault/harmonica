export type tuning = "richter" | "paddy" | "morti";

export type tone =
  | "C"
  | "C#"
  | "D"
  | "Eb"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "Ab"
  | "A"
  | "Bb"
  | "B";

export type airState =
  | "blow"
  | "blow_b1"
  | "blow_b2"
  | "draw"
  | "draw_b1"
  | "draw_b2"
  | "draw_b3";

export type key = {
  key: "r" | "e" | "z" | "f" | "d" | "s" | "q";
  fn: airState;
  pressed: boolean;
};
