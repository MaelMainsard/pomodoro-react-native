import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import {router, useRouter} from "expo-router";
import { useTimer, TimerPhase } from '../context/TimerContext';

import { ChooseTimer } from "@/components/ChooseTimer";
import {ThemedView} from "@/components/ThemedView";
import { TimerInfo } from "@/components/TimerInfo";

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


    const redirect = async (): Promise<void> => {
        stopTimer();
        router.push({pathname: '/'});
    }

    return (
        <>
            {!isTimerRunning ? (
                <ChooseTimer />
            ) : (
                <TimerInfo/>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'space-around',
    },
    button_group: {
        width: '90%',
        justifyContent: 'space-around',
        height: 300,
    }
});