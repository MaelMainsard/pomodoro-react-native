import { useState, useRef, MutableRefObject } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import { scheduleNotification } from './useNotification';
import { Timestamp } from "@react-native-firebase/firestore";
import { addNewSession } from "@/database/session.repository";
import { SessionModel } from "@/database/session.model";
import duration, { Duration } from 'dayjs/plugin/duration';
import dayjs from 'dayjs';

dayjs.extend(duration);

export enum TimerPhase {
    IS_WORK = 'work',
    IS_NAP = 'nap',
}

export type TimerMode = {
    WORK: number;
    NAP: number;
}

export type UseTimerLogicType = {
    startTimer: (work: number, nap: number) => void;
    pauseTimer: () => void;
    resumeTimer: () => void;
    stopTimer: (userId: string) => void;
    isTimerRunning: boolean;
    startAt: Timestamp;
    endAt: Timestamp;
    remainingTime: Duration;
    currentPhase: TimerPhase;
    currentMode: TimerMode;
    isPaused: boolean;
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
    const pauseStartTime: MutableRefObject<number | null> = useRef(null);
    const totalPauseDuration: MutableRefObject<number> = useRef(0);
    const currentMode: MutableRefObject<TimerMode> = useRef<TimerMode>({
        WORK: 0,
        NAP: 0
    });

    const startTimer = (work: number, nap: number) => {
        workDuration.current = work * 60;
        napDuration.current = nap * 60;
        isTimerActive.current = true;
        setRemainingTime(workDuration.current);
        currentPhase.current = TimerPhase.IS_WORK;
        startedAt.current = Timestamp.now();
        isPaused.current = false;
        totalPauseDuration.current = 0;
        currentMode.current.WORK = work;
        currentMode.current.NAP = nap;
        runTimer();
    };

    const runTimer = () => {
        timerRef.current = BackgroundTimer.setInterval(() => {
            if (!isPaused.current) {
                setRemainingTime((prevRemainingTime) => {
                    const newTime = prevRemainingTime - 1;

                    if (newTime <= 0) {
                        const notificationMessage =
                            currentPhase.current === TimerPhase.IS_WORK
                                ? "Une pause s'impose !"
                                : "Au boulot !";

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
        pauseStartTime.current = Date.now();
    };

    const resumeTimer = () => {
        if (isPaused.current) {
            isPaused.current = false;
            if (pauseStartTime.current !== null) {
                totalPauseDuration.current += Date.now() - pauseStartTime.current;
                pauseStartTime.current = null;
            }
        }
    };

    const stopTimer = (userId: string) => {
        if (timerRef.current !== null) {
            BackgroundTimer.clearInterval(timerRef.current);
            timerRef.current = null;
        }
        isPaused.current = false;
        isTimerActive.current = false;
        setRemainingTime(0);

        if (startedAt.current) {
            let actualDuration;
            if (isPaused.current && pauseStartTime.current !== null) {
                actualDuration = pauseStartTime.current - startedAt.current.toMillis();
                endAt.current = Timestamp.fromMillis(pauseStartTime.current);
            } else {
                actualDuration = Date.now() - startedAt.current.toMillis() - totalPauseDuration.current;
                endAt.current = Timestamp.fromMillis(startedAt.current.toMillis() + actualDuration);
            }

            if (userId) {
                addNewSession(new SessionModel({
                    userId: userId,
                    startedAt: startedAt.current,
                    endedAt: endAt.current,
                    workMinutes: currentMode.current.WORK,
                    restMinutes: currentMode.current.NAP
                }));
            }
        }

        currentPhase.current = TimerPhase.IS_WORK;
        totalPauseDuration.current = 0;
    };

    return {
        startTimer,
        pauseTimer,
        resumeTimer,
        stopTimer,
        isTimerRunning: isTimerActive.current,
        remainingTime: dayjs.duration(remainingTime, 'seconds'),
        currentPhase: currentPhase.current,
        startAt: startedAt.current,
        endAt: endAt.current,
        currentMode: currentMode.current,
        isPaused: isPaused.current
    };
};