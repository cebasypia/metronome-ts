// import 文を使ってstyle.cssファイルを読み込む。
import "./styles/button.css";
import "./styles/form.css";
import "./styles/main.css";
import "./styles/metronome.css";
import "./styles/header.css";

import { addPlaybackEvent } from "./components/playback";
import { addTempoEvents } from "./components/tempo";

addPlaybackEvent();
addTempoEvents();
