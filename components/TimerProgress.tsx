import { View} from "react-native";
import {TimerPhase} from "@/hooks/useTimerLogic";
import React, {useState} from "react";
import {useTimer} from "@/context/TimerContext";
import {Icon, Text, useTheme} from "@ui-kitten/components";
import CircularProgress from "react-native-circular-progress-indicator";

export function TimerProgress() {

    const theme = useTheme();
    const {
        pauseTimer,
        resumeTimer,
        remainingTime,
        currentPhase,
        currentMode,
        isPaused
    } = useTimer();


    const totalTime = currentPhase === TimerPhase.IS_WORK ? currentMode.WORK*60 : currentMode.NAP*60;
    const [localIsPaused, setLocalIsPaused] = useState(isPaused);

    return(
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 100}}>
            <CircularProgress
                value={(remainingTime.asSeconds() / totalTime) * 100}
                radius={100} showProgressValue={false}
                circleBackgroundColor={'white'}
                activeStrokeColor={currentPhase === TimerPhase.IS_WORK ? theme['color-primary-400'] : theme['color-primary-500']}
                inActiveStrokeColor={'white'}
            />
            <View style={{alignItems: 'center', position: "absolute", justifyContent: "space-between"}}>
                <Text style={{marginBottom: 10, fontSize: 40}}>{remainingTime.format("mm:ss")}</Text>
                {localIsPaused ? (
                    <Icon name='play-circle-outline'
                          fill={currentPhase === TimerPhase.IS_WORK ? theme['color-primary-400'] : theme['color-primary-500']}
                          style={{width: 50, height: 50}}
                          onPress={() => {
                              setLocalIsPaused(false);
                              resumeTimer();
                          }}
                    />
                ) : (
                    <Icon name='pause-circle-outline'
                          fill={currentPhase === TimerPhase.IS_WORK ? theme['color-primary-400'] : theme['color-primary-500']}
                          style={{width: 50, height: 50}}
                          onPress={() => {
                              setLocalIsPaused(true);
                              pauseTimer();
                          }}
                    />
                )}
            </View>
        </View>
    );
}