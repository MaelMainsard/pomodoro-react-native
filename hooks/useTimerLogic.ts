import { useState, useRef, MutableRefObject } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import { scheduleNotification } from './useNotification';

export enum TimerPhase {
    IS_WORK = 'work',
    IS_NAP = 'nap',
}

export type UseTimerLogicType = {
    startTimer: (work: number, nap: number) => void;
    pauseTimer: () => void;
    resumeTimer: () => void;
    stopTimer: () => void;
    isTimerRunning: boolean;
    remainingTime: number;
    currentPhase: TimerPhase;
};

export const useTimerLogic = (): UseTimerLogicType => {

    const [remainingTime, setRemainingTime] = useState(0);
    const currentPhase: MutableRefObject<TimerPhase> = useRef(TimerPhase.IS_WORK);
    const isTimerActive: MutableRefObject<boolean> = useRef(false);
    const isPaused: MutableRefObject<boolean> = useRef(false);
    const workDuration: MutableRefObject<number> = useRef<number>(0);
    const napDuration: MutableRefObject<number> = useRef<number>(0);
    const timerRef: MutableRefObject<number | null> = useRef<number | null>(null);

    const startTimer = (work: number, nap: number) => {
        workDuration.current = work;
        napDuration.current = nap;
        isTimerActive.current = true;
        setRemainingTime(work);
        currentPhase.current = TimerPhase.IS_WORK;
        isPaused.current = false;
        runTimer();
    };

    const runTimer = () => {
        timerRef.current = BackgroundTimer.setInterval(() => {
            if (!isPaused.current) {
                setRemainingTime((prevRemainingTime) => {
                    // On décrémente le temps restant
                    const newTime = prevRemainingTime - 1;

                    // Si le temps est écoulé
                    if (newTime <= -1) {
                        const notificationMessage =
                            currentPhase.current === TimerPhase.IS_WORK
                                ? "Work period finished. Starting nap period."
                                : "Nap period finished. Starting work period.";

                        // Envoyer une notification
                        // scheduleNotification(notificationMessage);

                        // Changer de phase
                        currentPhase.current =
                            currentPhase.current === TimerPhase.IS_WORK
                                ? TimerPhase.IS_NAP
                                : TimerPhase.IS_WORK;

                        // Réinitialiser le temps pour la nouvelle phase
                        return currentPhase.current === TimerPhase.IS_WORK
                            ? workDuration.current
                            : napDuration.current;
                    }

                    return newTime;
                });
            }
        }, 1000);
    };

    const pauseTimer = () => {
        isPaused.current = true;
    };

    const resumeTimer = () => {
        if (isPaused.current) {
            isPaused.current = false;
        }
    };

    const stopTimer = () => {
        if (timerRef.current !== null) {
            BackgroundTimer.clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setRemainingTime(0);
        isPaused.current = false;
        currentPhase.current = TimerPhase.IS_WORK;
        isTimerActive.current = false;
    };

    return {
        startTimer,
        pauseTimer,
        resumeTimer,
        stopTimer,
        isTimerRunning: isTimerActive.current,
        remainingTime: remainingTime,
        currentPhase: currentPhase.current,
    };
};
