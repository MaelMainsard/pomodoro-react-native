import {ThemedTouch} from "@/components/themed/ThemedTouch";
import {Image, StyleSheet, View} from "react-native";
import {TimerPhase} from "@/hooks/useTimerLogic";
import {ImagesAssets} from "@/assets/images/ImagesAssets";
import {ThemedText} from "@/components/themed/ThemedText";
import React from "react";
import {useTimer} from "@/context/TimerContext";
import {useRouter} from "expo-router";
import {ThemedIcon} from "@/components/themed/ThemedIcon";

export function TimerWidget() {

    const router = useRouter();
    const {isTimerRunning, currentPhase,} = useTimer();

    return(
        <ThemedTouch style={[{ flexDirection: isTimerRunning ? 'row' : 'column' },styles.widget]} onPress={() => router.push("/timer")}>
            <View style={{ alignItems: isTimerRunning ? 'flex-start' : 'center' }}>
                <Image source={currentPhase == TimerPhase.IS_WORK ? ImagesAssets.work_img : ImagesAssets.nap_img} style={styles.image}/>
                <ThemedText type="subtitle" colorType="text2">
                    {isTimerRunning ? currentPhase == TimerPhase.IS_WORK ? "Au boulot !" : "Une pause s'impose" : "Commencer à travailer"}
                </ThemedText>
            </View>
            {isTimerRunning && (
                <ThemedIcon name="chevron-forward-outline" size={30} color="text2"/>
            )}
        </ThemedTouch>
    );
}

const styles = StyleSheet.create({
    widget: {
        borderRadius: 20,
        width: '90%',
        height: "auto",
        padding: 20,
        color: 'primary',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
    },
    image : {
        width: 60,
        height: 60,
    }
});
