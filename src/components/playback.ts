// Constant definition
const PLAY_ICON = '▶'
const STOP_ICON = '■'

// Get elements
const playbackElement = document.getElementById('playback')

// Initialize elements
playbackElement.innerText = PLAY_ICON

const switchPlayback = (isPlaying: boolean): void => {
  playbackElement.innerText = isPlaying ? STOP_ICON : PLAY_ICON
}

const isPlaying = (): boolean => {
  return playbackElement.innerHTML === PLAY_ICON
}

export const addPlaybackEvent = () => {
  playbackElement.addEventListener('click', () => {
    switchPlayback(isPlaying())
  })
}
