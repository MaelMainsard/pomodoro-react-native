import {ThemedText} from "@/components/ThemedText";
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet, View} from "react-native";
import {TimerPhase} from "@/hooks/useTimerLogic";
import CircularProgress from "react-native-circular-progress-indicator";
import {useState} from "react";
import {useTimer} from "@/context/TimerContext";

export function TimerProgress() {

    const {
        pauseTimer,
        resumeTimer,
        remainingTime,
        currentPhase,
        currentMode,
        isPaused
    } = useTimer();

    const activeStrokeColor = currentPhase === TimerPhase.IS_WORK ? '#36618e' : '#825414';
    const totalTime = currentPhase === TimerPhase.IS_WORK ? currentMode.WORK : currentMode.NAP;
    const [localIsPaused, setLocalIsPaused] = useState(isPaused);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Pas de zéro initial pour les minutes
    };


    return(
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 100}}>
            <CircularProgress
                value={(remainingTime / totalTime) * 100}
                radius={100}
                showProgressValue={false}
                circleBackgroundColor={'white'}
                activeStrokeColor={activeStrokeColor}
                inActiveStrokeColor={'white'}
            />
            <View style={styles.group}>
                <ThemedText style={{marginBottom: 10}} type={"timer"}>{formatTime(remainingTime)}</ThemedText>
                {localIsPaused ? (
                    <Ionicons
                        name={"play"}
                        color={activeStrokeColor}
                        size={50}
                        onPress={() => {
                            setLocalIsPaused(false);
                            resumeTimer();
                        }}
                    />
                ) : (
                    <Ionicons
                        name={"pause"}
                        color={activeStrokeColor}
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
