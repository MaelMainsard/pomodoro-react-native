import {TimerPhase, useTimer} from '../context/TimerContext';
import {Image, StyleSheet, View} from "react-native";
import {TimerProgress} from "@/components/TimerProgress";
import {ImagesAssets} from "@/assets/images/ImagesAssets";
import React from "react";
import {useAuth} from "@/context/AuthContext";
import {Button, Layout, Text, useTheme} from "@ui-kitten/components";


export function TimerInfo() {

    const {stopTimer, currentPhase} = useTimer();
    const theme = useTheme();
    const { userInfo } = useAuth();

    return (
        <Layout style={{flex: 1, justifyContent: "space-between", alignItems: "center", paddingVertical: 20, backgroundColor: currentPhase === TimerPhase.IS_WORK ? theme['color-primary-100'] : theme['color-primary-200']}}>
            <TimerProgress/>
            <View style={{alignItems: 'center', width: "80%"}}>
                <Image source={currentPhase === TimerPhase.IS_WORK ? ImagesAssets.work_img : ImagesAssets.nap_img} style={{width: 150, height: 150, marginBottom:30}}/>
                <Text style={{fontSize: 40, lineHeight: 40, textAlign: "center", color:  theme['color-basic-300']}}>
                    {currentPhase === TimerPhase.IS_WORK ? "Au boulot !" : "Une pause s'impose"}
                </Text>
            </View>
            <Button
                style={{borderColor:currentPhase === TimerPhase.IS_WORK ? theme['color-primary-400'] : theme['color-primary-500'],  backgroundColor: currentPhase === TimerPhase.IS_WORK ? theme['color-primary-400'] : theme['color-primary-500'], borderRadius: 10, width: "90%"}} size="giant" onPress={()=>stopTimer(userInfo ? userInfo.user_info.user.uid : null)}>
                Terminer la session
            </Button>
        </Layout>
    );
}