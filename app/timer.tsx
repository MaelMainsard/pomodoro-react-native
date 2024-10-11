import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
    startIntervalTimer,
    pauseIntervalTimer,
    resumeIntervalTimer,
    stopIntervalTimer,
    getTimerValue
} from '../hooks/useTimer';

import { useRouter } from "expo-router";
import { useRouteInfo } from "expo-router/build/hooks";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedButton} from "@/components/ThemedButton";

export default function Timer() {

    const router = useRouter();
    const route = useRouteInfo();
    const { work, nap } = route.params;
    const work_duration:number = typeof work === 'string' ? parseInt(work)*60 : 0;
    const nap_duration:number = typeof nap === 'string' ? parseInt(nap)*60 : 0;


    const [timerValue, setTimerValue] = useState({ remainingTime: work_duration, isWorking: true });

    useEffect(() => {
        const updateTimer = () => {
            setTimerValue(getTimerValue());
        };

        startIntervalTimer(work_duration, nap_duration, updateTimer); // 30 minutes de travail, 5 minutes de pause

        return () => {
            stopIntervalTimer();
        };
    }, []);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const redirect = async (): Promise<void> => {
        await stopIntervalTimer();
        router.push({pathname: '/'});
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="enormous">
                {formatTime(timerValue.remainingTime)}
            </ThemedText>
            <ThemedText type="title">{timerValue.isWorking ? 'En travail' : 'En repos'}</ThemedText>
            <View style={styles.buttonContainer}>
                <ThemedButton title="Pause" variant="stop" onPress={pauseIntervalTimer} />
                <ThemedButton title="Resume" variant="resume" onPress={resumeIntervalTimer} />
                <ThemedButton title="Stop" variant="danger"  onPress={redirect}/>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginVertical: 50,
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '80%',
    },
});