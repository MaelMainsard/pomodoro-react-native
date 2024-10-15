import {TimerPhase, useTimer} from '../context/TimerContext';
import {ThemedView} from "@/components/ThemedView";
import {Image, StyleSheet, View} from "react-native";
import {TimerProgress} from "@/components/TimerProgress";
import {ImagesAssets} from "@/assets/images/ImagesAssets";
import React from "react";
import {ThemedText} from "@/components/ThemedText";
import {ThemedTouch} from "@/components/ThemedTouch";
import {useAuth} from "@/context/AuthContext";
import {SessionModel} from "@/database/session.model";


export function TimerInfo() {
    const {
        startAt,
        endAt,
        stopTimer,
        currentPhase,
        globalWorkSeconds,
        globalNapSeconds
    } = useTimer();

    const { userInfo } = useAuth();


    return (
        <ThemedView style={styles.container} type={currentPhase === TimerPhase.IS_WORK ? 'work' : 'nap'}>
            <TimerProgress/>
            <View style={{alignItems: 'center', width: "80%"}}>
                <Image source={currentPhase === TimerPhase.IS_WORK ? ImagesAssets.work_img : ImagesAssets.nap_img} style={styles.image}/>
                <ThemedText colorType={currentPhase === TimerPhase.IS_WORK ? 'work' : 'nap'} style={{fontSize: 40, lineHeight: 40, textAlign: "center"}}>
                    {currentPhase === TimerPhase.IS_WORK ? "Au boulot" : "Une pause s'impose"}
                </ThemedText>
            </View>
            <ThemedTouch type={currentPhase === TimerPhase.IS_WORK ? 'work' : 'nap'} style={styles.button} onPress={()=>stopTimer(userInfo.user_info.user.uid)}>
                <ThemedText white={true}>
                    Terminer la session
                </ThemedText>
            </ThemedTouch>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
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
