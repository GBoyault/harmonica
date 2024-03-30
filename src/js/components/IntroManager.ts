// IntroManager.js

import SoundPlayer from "./SoundPlayer";

export default function initIntro(player: SoundPlayer) {
  const about = document.getElementById("about");
  const aboutBtn = document.getElementById("btn-about");
  const btn = document.querySelector("#about .play");

  if (!about || !aboutBtn || !btn) {
    throw new Error("IntroManager missed html elements.");
  }
  
  btn.addEventListener("click", () => {
    about.classList.add("hidden");
    aboutBtn.classList.add("visible");
    player.init();
  });

  aboutBtn.addEventListener("click", () => {
    about.classList.remove("hidden");
    aboutBtn.classList.remove("visible");
  });
}
