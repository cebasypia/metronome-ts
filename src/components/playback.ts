import { Metronome } from "./metronome";

// Constant definition
const PLAY_ICON = "▶";
const STOP_ICON = "■";

let metronome;

const play = () => {
  metronome = new Metronome();
  metronome.start();
};

const stop = () => {
  metronome.stop();
};

// Get elements
const playbackElement = document.getElementById("playback");

// Initialize elements
playbackElement.innerText = PLAY_ICON;

const switchPlayback = (isPlaying: boolean): void => {
  playbackElement.innerText = isPlaying ? PLAY_ICON : STOP_ICON;
};

const isPlaying = (): boolean => {
  return playbackElement.innerHTML === STOP_ICON;
};

export const addPlaybackEvent = () => {
  playbackElement.addEventListener("click", () => {
    switchPlayback(isPlaying());
    isPlaying() ? play() : stop();
  });
};
