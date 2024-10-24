import { Audio } from 'expo-av';
import correctAnswerSound from '../../assets/audio/correct.mp3';
import wrongAnswerSound from '../../assets/audio/wrong.mp3';
import loseGameSound from '../../assets/audio/lose.mp3';
import winGameSound from '../../assets/audio/win.mp3';

const playSound = async (soundResource) => {
  const { sound } = await Audio.Sound.createAsync(soundResource);
  await sound.playAsync();
}

export function playCorrectAnswerSound() {
  playSound(correctAnswerSound);
}

export function playWrongAnswerSound() {
  playSound(wrongAnswerSound);
}

export function playLoseGameSound() {
  playSound(loseGameSound);
}

export function playWinGameSound() {
  playSound(winGameSound);
}