import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKGROUND_FETCH_TASK = 'background-timer-task';
const TIMER_START_KEY = 'timerStartTime';
const TIMER_DURATION_KEY = 'timerDuration';
const TIMER_PAUSED_AT_KEY = 'timerPausedAt';
const TIMER_MODE_KEY = 'timerMode';
const TIMER_WORK_DURATION_KEY = 'timerWorkDuration';
const TIMER_NAP_DURATION_KEY = 'timerNapDuration';
const TIMER_IS_INTERVAL_KEY = 'timerIsInterval';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
        const startTime = await AsyncStorage.getItem(TIMER_START_KEY);
        const duration = await AsyncStorage.getItem(TIMER_DURATION_KEY);
        const pausedAt = await AsyncStorage.getItem(TIMER_PAUSED_AT_KEY);
        const mode = await AsyncStorage.getItem(TIMER_MODE_KEY);
        const isInterval = await AsyncStorage.getItem(TIMER_IS_INTERVAL_KEY);

        if (startTime && duration) {
            if (pausedAt) {
                return BackgroundFetch.BackgroundFetchResult.NoData;
            }

            const elapsedTime = Date.now() - parseInt(startTime);
            const remainingTime = parseInt(duration) - elapsedTime;

            if (remainingTime <= 0) {
                if (isInterval === 'true') {
                    const workDuration = await AsyncStorage.getItem(TIMER_WORK_DURATION_KEY);
                    const napDuration = await AsyncStorage.getItem(TIMER_NAP_DURATION_KEY);

                    const newDuration = mode === 'work' ? napDuration : workDuration;
                    const newMode = mode === 'work' ? 'nap' : 'work';

                    await startTimer(parseInt(newDuration!) / 1000, newMode, true);
                    console.log(`Switched to ${newMode} mode for ${parseInt(newDuration!) / 1000} seconds`);
                    return BackgroundFetch.BackgroundFetchResult.NewData;
                } else {
                    await AsyncStorage.multiRemove([TIMER_START_KEY, TIMER_DURATION_KEY, TIMER_PAUSED_AT_KEY, TIMER_MODE_KEY, TIMER_IS_INTERVAL_KEY]);
                    console.log('Timer finished!');
                    return BackgroundFetch.BackgroundFetchResult.NewData;
                }
            } else {
                console.log(`Timer still running. ${Math.round(remainingTime / 1000)} seconds remaining.`);
                return BackgroundFetch.BackgroundFetchResult.NoData;
            }
        }

        return BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (error) {
        console.error('Background timer task failed:', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

export async function startTimer(durationInSeconds: number, mode: string = 'single', isInterval: boolean = false): Promise<void> {
    try {
        await AsyncStorage.multiSet([
            [TIMER_START_KEY, Date.now().toString()],
            [TIMER_DURATION_KEY, (durationInSeconds * 1000).toString()],
            [TIMER_MODE_KEY, mode],
            [TIMER_IS_INTERVAL_KEY, isInterval.toString()],
        ]);

        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
            minimumInterval: 1,
            stopOnTerminate: false,
            startOnBoot: true,
        });

        console.log(`Timer started for ${durationInSeconds} seconds in ${mode} mode`);
    } catch (error) {
        console.error('Failed to start timer:', error);
    }
}

export async function startIntervalTimer(workDurationInSeconds: number, napDurationInSeconds: number): Promise<void> {
    try {
        await AsyncStorage.multiSet([
            [TIMER_WORK_DURATION_KEY, (workDurationInSeconds * 1000).toString()],
            [TIMER_NAP_DURATION_KEY, (napDurationInSeconds * 1000).toString()],
        ]);

        await startTimer(workDurationInSeconds, 'work', true);

        console.log(`Interval timer started: ${workDurationInSeconds}s work, ${napDurationInSeconds}s nap`);
    } catch (error) {
        console.error('Failed to start interval timer:', error);
    }
}

export async function pauseTimer(): Promise<void> {
    try {
        const startTime = await AsyncStorage.getItem(TIMER_START_KEY);
        const duration = await AsyncStorage.getItem(TIMER_DURATION_KEY);

        if (startTime && duration) {
            const elapsedTime = Date.now() - parseInt(startTime);
            const remainingTime = parseInt(duration) - elapsedTime;

            await AsyncStorage.setItem(TIMER_PAUSED_AT_KEY, remainingTime.toString());
            console.log('Timer paused');
        }
    } catch (error) {
        console.error('Failed to pause timer:', error);
    }
}

export async function resumeTimer(): Promise<void> {
    try {
        const pausedAt = await AsyncStorage.getItem(TIMER_PAUSED_AT_KEY);

        if (pausedAt) {
            await AsyncStorage.multiSet([
                [TIMER_START_KEY, Date.now().toString()],
                [TIMER_DURATION_KEY, pausedAt]
            ]);
            await AsyncStorage.removeItem(TIMER_PAUSED_AT_KEY);
            console.log('Timer resumed');
        }
    } catch (error) {
        console.error('Failed to resume timer:', error);
    }
}

export async function stopTimer(): Promise<void> {
    try {
        await AsyncStorage.multiRemove([
            TIMER_START_KEY,
            TIMER_DURATION_KEY,
            TIMER_PAUSED_AT_KEY,
            TIMER_MODE_KEY,
            TIMER_WORK_DURATION_KEY,
            TIMER_NAP_DURATION_KEY,
            TIMER_IS_INTERVAL_KEY
        ]);
        await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
        console.log('Timer stopped');
    } catch (error) {
        console.error('Failed to stop timer:', error);
    }
}

export async function getTimerStatus(): Promise<{ remainingTime: number | null; isPaused: boolean; mode: string | null; isInterval: boolean }> {
    try {
        const startTime = await AsyncStorage.getItem(TIMER_START_KEY);
        const duration = await AsyncStorage.getItem(TIMER_DURATION_KEY);
        const pausedAt = await AsyncStorage.getItem(TIMER_PAUSED_AT_KEY);
        const mode = await AsyncStorage.getItem(TIMER_MODE_KEY);
        const isInterval = await AsyncStorage.getItem(TIMER_IS_INTERVAL_KEY);

        if (pausedAt) {
            return { remainingTime: parseInt(pausedAt) / 1000, isPaused: true, mode, isInterval: isInterval === 'true' };
        }

        if (startTime && duration) {
            const elapsedTime = Date.now() - parseInt(startTime);
            const remainingTime = parseInt(duration) - elapsedTime;
            return { remainingTime: Math.max(Math.round(remainingTime / 1000), 0), isPaused: false, mode, isInterval: isInterval === 'true' };
        }

        return { remainingTime: null, isPaused: false, mode: null, isInterval: false };
    } catch (error) {
        console.error('Failed to get timer status:', error);
        return { remainingTime: null, isPaused: false, mode: null, isInterval: false };
    }
}
