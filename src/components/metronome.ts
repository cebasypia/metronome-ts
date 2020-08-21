import { tempo } from "./tempo";

const HIGH = 1500;
const LOW = 1200;
export class Metronome {
  rhythm: object;
  nBeat: number;
  lastClickTimeStamp: number;
  clickSchedulerTimerID: NodeJS.Timeout;
  beatCountTimeOutIDs: number[];
  audio: Audio;

  constructor(rhythm = {}) {
    this.rhythm = rhythm;
    this.nBeat = 1;
    this.clickSchedulerTimerID = null;
    this.beatCountTimeOutIDs = [];
    this.audio = new Audio();
  }

  start() {
    // setIsPlayingTo(true);
    // Define
    // if (isMusicMode) {
    //   setTempo(this.rhythm[count].tempo);
    //   setBeats(this.rhythm[count].beats);
    // }

    this.audio.clickAt({ frequency: HIGH });
    this.lastClickTimeStamp = this.audio.context.currentTime * 1000;

    // Loop start
    this.clickScheduler();
    this.clickSchedulerTimerID = setInterval(() => {
      this.clickScheduler();
    }, 700);
  }

  stop() {
    // setIsPlayingTo(false);

    this.audio.context.close();

    // Cancel reservation
    clearInterval(this.clickSchedulerTimerID);

    // this.beatCountTimeOutIDs.forEach((timeOutID) => {
    //   clearTimeout(timeOutID);
    // });
  }

  // Loop function
  clickScheduler() {
    const now = this.audio.context.currentTime * 1000;
    let tick = (1000 * 60) / tempo;

    for (
      let nextClickTimeStamp = this.lastClickTimeStamp + tick;
      nextClickTimeStamp < now + 1000;
      nextClickTimeStamp += tick
    ) {
      if (nextClickTimeStamp - now < 0) {
        continue;
      }

      this.nBeat++;
      // if (isMusicMode) {
      //   if (nBeat > beats.value) {
      //     setCount(count + 1);
      //     nBeat = 1;
      //     if (count >= this.rhythm.length) {
      //       clearInterval(this.clickSchedulerTimerID);
      //       setTimeout(() => {
      //         this.stop();
      //         setCount(0);
      //         refreshBarElements(count);
      //       }, nextClickTimeStamp - now);
      //       break;
      //     }
      //     setBeats(this.rhythm[count].beats);
      //     setTempo(this.rhythm[count].tempo);
      //     tick = (1000 * 60) / tempo;
      //   }
      // } else {
      if (this.nBeat > 4) {
        // if (this.nBeat > beats.value) {
        this.nBeat = 1;
      }
      // }

      // 予約時間をループで使っていたDOMHighResTimeStampからAudioContext向けに変換
      const nextClickTime = nextClickTimeStamp / 1000;

      // Hi & Low tone
      const frequency = this.nBeat === 1 ? HIGH : LOW;
      //   this.osc.frequency.setValueAtTime(this.highTone, nextClickTime);
      // } else {
      //   this.osc.frequency.setValueAtTime(this.lowTone, nextClickTime);
      // }

      // // Elements update
      // const createElementsUpdater = (nBeat, count, tempo, beats) => {
      //   return setTimeout(() => {
      //     if (isPlaying) {
      //       startAnimation(tempo, beats.value, nBeat);
      //       if (isMusicMode) {
      //         refreshTempoElements(tempo);
      //         refreshBarElements(count);
      //         refreshBeatsElements(beats);
      //         console.log(`${this.rhythm[count].bar}小節目`);
      //       }
      //     }
      //   }, nextClickTimeStamp - now);
      // };
      // this.beatCountTimeOutIDs.push(
      //   createElementsUpdater(nBeat, count, tempo, beats)
      // );

      // Reserve next click
      this.audio.clickAt({ startTime: nextClickTime, frequency: frequency });

      // Update lastClickTimeStamp
      this.lastClickTimeStamp = nextClickTimeStamp;
    }
  }
}

class Audio {
  context: AudioContext;
  osc: OscillatorNode;
  gain: GainNode;

  constructor(gainValue = 0.1, highTone = 1500, lowTone = 1200) {
    // Web audio api settings
    this.context = new AudioContext();
    this.osc = this.context.createOscillator();
    this.gain = this.context.createGain();

    this.gain.gain.value = 0;
    this.osc.connect(this.gain).connect(this.context.destination);
    this.osc.start();
  }
  // Reserve click
  clickAt({
    startTime = 0,
    frequency = 1200,
    gainValue = 0.1,
  }: {
    startTime?: number;
    frequency?: number;
    gainValue?: number;
  }) {
    this.osc.frequency.setValueAtTime(frequency, startTime);
    this.gain.gain.setValueAtTime(gainValue, startTime);
    this.gain.gain.linearRampToValueAtTime(0, startTime + 0.05);
  }
}
