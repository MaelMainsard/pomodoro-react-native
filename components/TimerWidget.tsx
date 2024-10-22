import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {TimerPhase} from "@/hooks/useTimerLogic";
import {ImagesAssets} from "@/assets/images/ImagesAssets";
import React from "react";
import {useTimer} from "@/context/TimerContext";
import {useRouter} from "expo-router";
import {useTheme, Text, Icon} from "@ui-kitten/components";

export function TimerWidget() {

    const router = useRouter();
    const theme = useTheme();
    const {isTimerRunning, currentPhase,} = useTimer();

    return(
        <TouchableOpacity style={[{ flexDirection: isTimerRunning ? 'row' : 'column', backgroundColor: theme['color-primary-300']},styles.widget]} onPress={() => router.push("/timer")}>
            <View style={{ alignItems: isTimerRunning ? 'flex-start' : 'center' }}>
                <Image source={currentPhase == TimerPhase.IS_WORK ? ImagesAssets.work_img : ImagesAssets.nap_img} style={{ width: 60, height: 60 }}/>
                <Text style={{color: theme['color-basic-100'], fontSize: 20}}>{isTimerRunning ? currentPhase == TimerPhase.IS_WORK ? "Au boulot !" : "Une pause s'impose" : "Commencer à travailer"}</Text>
            </View>
            {isTimerRunning && (
                <Icon name='chevron-right-outline' fill={theme['color-basic-100']} style={{width: 40, height: 40}}/>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    widget: {
        borderRadius: 20,
        width: '90%',
        height: "auto",
        padding: 20,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        paddingVertical: 20
    }
});
