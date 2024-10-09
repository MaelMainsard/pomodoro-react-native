import React, { useEffect, useState } from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { startIntervalTimer, pauseTimer, resumeTimer, stopTimer, getTimerStatus } from '../hooks/useTimer';

import { useRouter} from "expo-router";
import { useRouteInfo } from "expo-router/build/hooks";

export default function Timer() {

    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const router = useRouter();
    const route = useRouteInfo();

    const { work,nap } = route.params;

    useEffect(() => {

        if (typeof work === "string" && typeof nap === "string") {
            startIntervalTimer(parseInt(work), parseInt(nap));
        }

        const checkTimer = async (): Promise<void> => {
            const status = await getTimerStatus();
            setRemainingTime(status.remainingTime);
            setIsPaused(status.isPaused);
        };

        checkTimer();
        const interval = setInterval(checkTimer, 1000);
        return () => clearInterval(interval);
    }, []);


    const handlePauseResumeTimer = (): void => {
        if (isPaused) {
            resumeTimer();
            setIsPaused(false);
        } else {
            pauseTimer();
            setIsPaused(true);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <Text>
                {remainingTime !== null
                    ? `Time remaining: ${remainingTime} seconds`
                    : 'No active timer'}
            </Text>
            {remainingTime !== null && (
                <Button
                    title={isPaused ? "Resume Timer" : "Pause Timer"}
                    onPress={handlePauseResumeTimer}
                />
            )}
            <Button title="Stop Timer" onPress={stopTimer} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});