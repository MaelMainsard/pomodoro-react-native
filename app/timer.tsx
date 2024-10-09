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

export default function Timer() {

    const router = useRouter();
    const route = useRouteInfo();
    const { work, nap } = route.params;
    const work_duration:number = typeof work === 'string' ? parseInt(work) : 0;
    const nap_duration:number = typeof nap === 'string' ? parseInt(nap) : 0;


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
        <View style={styles.container}>
            <Text style={styles.timerText}>{formatTime(timerValue.remainingTime)}</Text>
            <Text style={styles.statusText}>{timerValue.isWorking ? 'Working' : 'Resting'}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Pause" onPress={pauseIntervalTimer} />
                <Button title="Resume" onPress={resumeIntervalTimer} />
                <Button title="Stop"  onPress={redirect}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    statusText: {
        fontSize: 24,
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
});