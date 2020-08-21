// Constant definition
import { addLongTouchEvent } from "./touch_action";
// import { isMusicMode } from './music.js'

const DEFAULT_TEMPO = 100;
const MAX_TEMPO = 200;
const MIN_TEMPO = 1;
const TEMPO_STEP = 1;

// Get elements
// const tempoElement = document.getElementById('tempo')
const tempoUp = document.getElementById("tempo--up");
const tempoDown = document.getElementById("tempo--down");
const tempoRange: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("tempo--range")
);

// Initialize elements
// tempoElement.innerText = DEFAULT_TEMPO
tempoRange.value = String(DEFAULT_TEMPO);
tempoRange.max = String(MAX_TEMPO);
tempoRange.min = String(MIN_TEMPO);
tempoRange.step = String(TEMPO_STEP);

export let tempo = DEFAULT_TEMPO;
export function addTempoEvents() {
  // Tempo add touch events
  addLongTouchEvent(tempoUp, () => {
    // if (isMusicMode) return
    if (tempo < MAX_TEMPO) {
      tempo++;
      refreshTempoElements(tempo);
    }
  });

  addLongTouchEvent(tempoDown, () => {
    // if (isMusicMode) return
    if (tempo > MIN_TEMPO) {
      tempo--;
      refreshTempoElements(tempo);
    }
  });

  // Tempo add input event to range
  tempoRange.addEventListener("input", () => {
    // if (isMusicMode) return
    tempo = Number(tempoRange.value);
    // refreshTempoElements(tempo)
  });
}
// export function setTempo(getTempo) {
//   if (Number(getTempo)) tempo = getTempo
// }

const refreshTempoElements = (tempo) => {
  // tempoElement.innerText = tempo
  tempoRange.value = tempo;
};
