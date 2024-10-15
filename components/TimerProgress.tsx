import {ThemedText} from "@/components/themed/ThemedText";
import {StyleSheet, View} from "react-native";
import {TimerPhase} from "@/hooks/useTimerLogic";
import {useState} from "react";
import {useTimer} from "@/context/TimerContext";
import {ThemedIcon} from "@/components/themed/ThemedIcon";
import {ThemedProgress} from "@/components/themed/ThemedProgress";

export function TimerProgress() {

    const {
        pauseTimer,
        resumeTimer,
        remainingTime,
        currentPhase,
        currentMode,
        isPaused
    } = useTimer();


    const totalTime = currentPhase === TimerPhase.IS_WORK ? currentMode.WORK : currentMode.NAP;
    const [localIsPaused, setLocalIsPaused] = useState(isPaused);

    const formatTime = (timeInSeconds:number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


    return(
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 100}}>
            <ThemedProgress remainingTime={remainingTime} totalTime={totalTime} type={currentPhase === TimerPhase.IS_WORK ? "work" : "nap"}/>
            <View style={styles.group}>
                <ThemedText style={{marginBottom: 10}} type={"timer"}>{formatTime(remainingTime)}</ThemedText>
                {localIsPaused ? (
                    <ThemedIcon
                        name={"play"}
                        color={currentPhase === TimerPhase.IS_WORK ? "work" : "nap"}
                        size={50}
                        onPress={() => {
                            setLocalIsPaused(false);
                            resumeTimer();
                        }}
                    />
                ) : (
                    <ThemedIcon
                        name={"pause"}
                        color={currentPhase === TimerPhase.IS_WORK ? "work" : "nap"}
                        size={50}
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

const styles = StyleSheet.create({
    group: {
        alignItems: "center",
        position: "absolute",
        justifyContent: "space-between",
    },
});
