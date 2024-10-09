import BackgroundTimer from 'react-native-background-timer';
import {use}
let timer: number;
let isWorking = true;
let remainingTime = 0;
let workDuration = 0;
let napDuration = 0;
let isPaused = false;

export function startIntervalTimer(work: number, nap: number): void {
  workDuration = work*60;
  napDuration = nap*60;
  remainingTime = workDuration;
  isWorking = true;
  isPaused = false;

  if (timer) {
    BackgroundTimer.clearInterval(timer);
  }

  timer = BackgroundTimer.setInterval(() => {
    if (!isPaused) {
      if (remainingTime > 0) {
        remainingTime--;
      } else {
        if (isWorking) {
          console.log("Work period finished. Starting nap period.");
          isWorking = false;
          remainingTime = napDuration;
        } else {
          console.log("Nap period finished. Starting work period.");
          isWorking = true;
          remainingTime = workDuration;
        }
      }
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
  }
  timer = 0;
  remainingTime = 0;
  isPaused = false;
}

export function getTimerValue(): { remainingTime: number; isWorking: boolean } {
  return { remainingTime, isWorking };
}