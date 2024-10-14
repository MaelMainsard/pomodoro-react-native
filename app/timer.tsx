import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { useRouter } from "expo-router";
import { useRouteInfo } from "expo-router/build/hooks";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedButton} from "@/components/ThemedButton";
import { useTimer, TimerPhase } from '../context/TimerContext';

export default function Timer() {

    const {
        startTimer,
        pauseTimer,
        resumeTimer,
        stopTimer,
        remainingTime,
        currentPhase,
        isTimerRunning,
    } = useTimer();

    const router = useRouter();
    const route = useRouteInfo();
    const { work, nap } = route.params;
    const work_duration:number = typeof work === 'string' ? parseInt(work) : 0;
    const nap_duration:number = typeof nap === 'string' ? parseInt(nap) : 0;

    useEffect(() => {
        if(!isTimerRunning){
            startTimer(work_duration,nap_duration);
        }
    }, []);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const redirect = async (): Promise<void> => {
        stopTimer();
        router.push({pathname: '/'});
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="enormous">
                {formatTime(remainingTime)}
            </ThemedText>
            <ThemedText type="title">{currentPhase === TimerPhase.IS_WORK ? 'En travail' : 'En repos'}</ThemedText>
            <ThemedView style={styles.buttonContainer}>
                <ThemedButton title="Pause" variant="stop" onPress={pauseTimer} />
                <ThemedButton title="Resume" variant="resume" onPress={resumeTimer} />
                <ThemedButton title="Stop" variant="danger"  onPress={redirect}/>
            </ThemedView>
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