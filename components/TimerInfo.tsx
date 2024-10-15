import {TimerPhase, useTimer} from '../context/TimerContext';
import {ThemedView} from "@/components/themed/ThemedView";
import {Image, StyleSheet, View} from "react-native";
import {TimerProgress} from "@/components/TimerProgress";
import {ImagesAssets} from "@/assets/images/ImagesAssets";
import React from "react";
import {ThemedText} from "@/components/themed/ThemedText";
import {ThemedTouch} from "@/components/themed/ThemedTouch";
import {useAuth} from "@/context/AuthContext";


export function TimerInfo() {

    const {stopTimer, currentPhase} = useTimer();
    const { userInfo } = useAuth();

    return (
        <ThemedView style={styles.timer} type={currentPhase === TimerPhase.IS_WORK ? 'work' : 'nap'}>
            <TimerProgress/>
            <View style={{alignItems: 'center', width: "80%"}}>
                <Image source={currentPhase === TimerPhase.IS_WORK ? ImagesAssets.work_img : ImagesAssets.nap_img} style={styles.image}/>
                <ThemedText colorType={currentPhase === TimerPhase.IS_WORK ? 'work' : 'nap'} style={{fontSize: 40, lineHeight: 40, textAlign: "center"}}>
                    {currentPhase === TimerPhase.IS_WORK ? "Au boulot !" : "Une pause s'impose"}
                </ThemedText>
            </View>
            <ThemedTouch type={currentPhase === TimerPhase.IS_WORK ? 'work' : 'nap'} style={styles.button} onPress={()=>stopTimer(userInfo.user_info.user.uid)}>
                <ThemedText colorType={"text2"}>
                    Terminer la session
                </ThemedText>
            </ThemedTouch>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    timer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    image : {
        width: 150,
        height: 150,
        marginBottom: 30
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'space-around',
        width: "90%"
    },
});
