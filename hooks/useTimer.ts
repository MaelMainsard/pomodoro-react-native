import BackgroundTimer from 'react-native-background-timer';
import { scheduleNotification } from './useNotification';

let timer: number;
let isWorking = true;
let remainingTime = 0;
let workDuration = 0;
let napDuration = 0;
let isPaused = false;
let onTickCallback: (() => void) | null = null;
let isTimerActive = false;

export function startIntervalTimer(work: number, nap: number, onTick: () => void): void {
  workDuration = work;
  napDuration = nap;
  remainingTime = workDuration;
  isWorking = true;
  isPaused = false;
  onTickCallback = onTick;
  isTimerActive = true; // Le timer est maintenant actif

  if (timer) {
    BackgroundTimer.clearInterval(timer);
  }

  timer = BackgroundTimer.setInterval(async () => {
    if (!isPaused && isTimerActive) {
        if (remainingTime > 0) {
            remainingTime--;
        } else {
            const notificationMessage = isWorking
                ? "Work period finished. Starting nap period."
                : "Nap period finished. Starting work period.";

            scheduleNotification(notificationMessage);

            isWorking = !isWorking;
            remainingTime = isWorking ? workDuration : napDuration;
        }
        if (onTickCallback) onTickCallback();
    }
}, 1000);
}

export function pauseIntervalTimer(): void {
  isPaused = true;
}

export function resumeIntervalTimer(): void {
  isPaused = false;
}

export function stopIntervalTimer(): void {
  if (timer) {
    BackgroundTimer.clearInterval(timer);
    timer = 0;
  }
  remainingTime = 0;
  isPaused = false;
  isWorking = true;
  isTimerActive = false;
  if (onTickCallback) onTickCallback();
}

export function getTimerValue(): { remainingTime: number; isWorking: boolean } {
  return { remainingTime, isWorking };
}
