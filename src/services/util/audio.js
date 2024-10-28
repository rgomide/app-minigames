import { Audio } from 'expo-av'
import { Vibration } from 'react-native'
import correctAnswerSound from '../../assets/audio/correct.mp3'
import wrongAnswerSound from '../../assets/audio/wrong.mp3'
import loseGameSound from '../../assets/audio/lose.mp3'
import winGameSound from '../../assets/audio/win.mp3'

const playSound = async (soundResource, vibrate = true) => {
  const { sound } = await Audio.Sound.createAsync(soundResource)
  if (vibrate) {
    Vibration.vibrate(100)
  }
  await sound.playAsync()
}

export function playCorrectAnswerSound(vibrate = true) {
  playSound(correctAnswerSound, vibrate)
}

export function playWrongAnswerSound(vibrate = true) {
  playSound(wrongAnswerSound, vibrate)
}

export function playLoseGameSound(vibrate = true) {
  playSound(loseGameSound, vibrate)
}

export function playWinGameSound(vibrate = true) {
  playSound(winGameSound, vibrate)
}
