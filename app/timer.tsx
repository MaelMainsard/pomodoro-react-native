import React, { useEffect, useState } from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { ThemedView } from "@/components/ThemedView";

import { useRouter } from "expo-router";
import { useRouteInfo } from "expo-router/build/hooks";

import {
  startIntervalTimer,
  pauseIntervalTimer,
  resumeIntervalTimer,
  stopIntervalTimer,
  getTimerValue,
} from '../hooks/useTimer';

export default function Timer() {

    const router = useRouter();
    const route = useRouteInfo();

    const [timeLeft, setTimeLeft] = useState(0);
    const [isWorkingState, setIsWorkingState] = useState(true);

    const { work, nap } = route.params;

    useEffect(() => {

       startIntervalTimer(work, nap);

       const updateTimer = () => {
           const timerValue = getTimerValue();
           setTimeLeft(timerValue.remainingTime);
           setIsWorkingState(timerValue.isWorking);
       };

       const intervalId = setInterval(updateTimer, 1000);

       return () => {
          clearInterval(intervalId);
          stopIntervalTimer();
       };
      }, []);

      return (
        <ThemedView style={{ padding: 20 }}>
          <Text style={{ fontSize: 32 }}>
            {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}
          </Text>
          <Text style={{ fontSize: 20 }}>
            {isWorkingState ? 'Working' : 'Napping'}
          </Text>
          <Button title="Pause" onPress={pauseIntervalTimer} />
          <Button title="Resume" onPress={resumeIntervalTimer} />
          <Button title="Stop" onPress={() => router.push({ pathname: '/'})}/>
        </ThemedView>
      );

}
