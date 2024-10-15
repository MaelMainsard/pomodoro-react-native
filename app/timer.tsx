import React from 'react';
import { useTimer } from '../context/TimerContext';

import { ChooseTimer } from "@/components/ChooseTimer";
import { TimerInfo } from "@/components/TimerInfo";

export default function Timer() {

    const {isTimerRunning} = useTimer();

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