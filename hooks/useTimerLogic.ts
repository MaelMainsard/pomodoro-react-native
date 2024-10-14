import { useState, useRef, MutableRefObject } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import { scheduleNotification } from './useNotification';
import { Timestamp } from "@react-native-firebase/firestore";
import { Session } from "@/hooks/useFirestore";

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
    startAt: Timestamp;
    endAt: Timestamp;
    remainingTime: number;
    globalNapSeconds: number;
    globalWorkSeconds: number;
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
    const startedAt: MutableRefObject<Timestamp | null> = useRef(null);
    const endAt: MutableRefObject<Timestamp | null> = useRef(null);
    const globalNapSeconds: MutableRefObject<number> = useRef<number>(0);
    const globalWorkSeconds: MutableRefObject<number> = useRef<number>(0);

    const startTimer = (work: number, nap: number) => {
        workDuration.current = work;
        napDuration.current = nap;
        isTimerActive.current = true;
        setRemainingTime(work);
        currentPhase.current = TimerPhase.IS_WORK;
        startedAt.current = Timestamp.now();
        isPaused.current = false;
        runTimer();
    };

    const runTimer = () => {
        timerRef.current = BackgroundTimer.setInterval(() => {
            if (!isPaused.current) {
                setRemainingTime((prevRemainingTime) => {
                    const newTime = prevRemainingTime - 1;

                    if(currentPhase.current === TimerPhase.IS_WORK){
                        globalWorkSeconds.current += 1;
                    }
                    else{
                        globalNapSeconds.current -= 1;
                    }

                    if (newTime <= -1) {
                        const notificationMessage =
                            currentPhase.current === TimerPhase.IS_WORK
                                ? "Work period finished. Starting nap period."
                                : "Nap period finished. Starting work period.";

                        scheduleNotification(notificationMessage);

                        currentPhase.current =
                            currentPhase.current === TimerPhase.IS_WORK
                                ? TimerPhase.IS_NAP
                                : TimerPhase.IS_WORK;

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

        const session: Session = {
            startedAt: startedAt.current,
            endedAt: endAt.current,
            restMinutes: globalNapSeconds.current * 60,
            workMinutes: globalWorkSeconds.current * 60
        };

        setRemainingTime(0);
        endAt.current = Timestamp.now();
        globalWorkSeconds.current = 0;
        globalNapSeconds.current = 0;
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
        startAt: startedAt.current,
        endAt: endAt.current,
        globalNapSeconds: globalNapSeconds.current,
        globalWorkSeconds: globalWorkSeconds.current,
    };
};
