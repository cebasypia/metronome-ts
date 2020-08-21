export class Metronome {
  gainValue: number;
  highTone: number;
  lowTone: number;
  rhythm: object;
  lastClickTimeStamp: number;
  clickSchedulerTimerID: NodeJS.Timeout;
  beatCountTimeOutIDs: number[];
  context: AudioContext;
  osc: OscillatorNode;
  gain: GainNode;

  constructor(rhythm = {}, gainValue = 0.1, highTone = 1500, lowTone = 1200) {
    this.gainValue = gainValue;
    this.highTone = highTone;
    this.lowTone = lowTone;
    this.rhythm = rhythm;

    this.clickSchedulerTimerID = null;
    this.beatCountTimeOutIDs = [];

    // Web audio api settings
    this.context = new AudioContext();
    this.osc = this.context.createOscillator();
    this.gain = this.context.createGain();

    this.gain.gain.value = 0;
    this.osc.connect(this.gain).connect(this.context.destination);
    this.osc.frequency.value = this.highTone;
    this.osc.start();
  }

  start() {
    // setIsPlayingTo(true);
    // Define
    // let nBeat = 1;
    // if (isMusicMode) {
    //   setTempo(this.rhythm[count].tempo);
    //   setBeats(this.rhythm[count].beats);
    // }

    // First note
    this.gain.gain.setValueAtTime(this.gainValue, 0);
    this.gain.gain.linearRampToValueAtTime(0, 0.05);
    this.lastClickTimeStamp = this.context.currentTime * 1000;
    // startAnimation(tempo, beats.value, nBeat);

    // Loop start
    clickScheduler(this);
    this.clickSchedulerTimerID = setInterval(() => {
      clickScheduler(this);
    }, 700);
  }

  stop() {
    // setIsPlayingTo(false);

    this.context.close();

    // Cancel reservation
    clearInterval(this.clickSchedulerTimerID);

    // this.beatCountTimeOutIDs.forEach((timeOutID) => {
    //   clearTimeout(timeOutID);
    // });
  }
}

// Loop function
const clickScheduler = (mtr: Metronome) => {
  const now = mtr.context.currentTime * 1000;
  let tick = (1000 * 60) / 60;
  // let tick = (1000 * 60) / tempo;

  for (
    let nextClickTimeStamp = mtr.lastClickTimeStamp + tick;
    nextClickTimeStamp < now + 1000;
    nextClickTimeStamp += tick
  ) {
    if (nextClickTimeStamp - now < 0) {
      continue;
    }

    // nBeat++;
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
    //   if (nBeat > beats.value) {
    //     nBeat = 1;
    //   }
    // }

    // 予約時間をループで使っていたDOMHighResTimeStampからAudioContext向けに変換
    const nextClickTime = nextClickTimeStamp / 1000;

    // Hi & Low tone
    // if (nBeat === 1) {
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
    mtr.gain.gain.setValueAtTime(mtr.gainValue, nextClickTime);
    mtr.gain.gain.linearRampToValueAtTime(0, nextClickTime + 0.05);

    // Update lastClickTimeStamp
    mtr.lastClickTimeStamp = nextClickTimeStamp;
  }
};
