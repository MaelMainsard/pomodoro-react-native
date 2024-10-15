import { ThemedView } from "@/components/ThemedView";
import {ActivityIndicator, Image, StyleSheet, View} from "react-native";
import { useRouter } from "expo-router";
import { askAllPermission } from '../hooks/usePermission';
import React, { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ImagesAssets } from "@/assets/images/ImagesAssets";
import { GoogleButton } from "@/components/GoogleButton";
import { UserProfile } from '../components/UserProfile';
import { useAuth } from "@/context/AuthContext";
import {ThemedTouch} from "@/components/ThemedTouch";
import {TimerPhase, useTimer} from "@/context/TimerContext";
import { Ionicons } from '@expo/vector-icons';
import { HistoricList } from "@/components/HistoricList";

export default function HomeScreen() {
    const router = useRouter();

    const { userInfo, isLoading } = useAuth();
    const {isTimerRunning, currentPhase,} = useTimer();

    useEffect(() => {
        askAllPermission();
    }, []);


    return (
        <ThemedView style={styles.screen}>
            {isLoading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
            ):userInfo ? (
                <UserProfile/>
            ) : (
                <GoogleButton/>

            )}
            <ThemedTouch style={[{ flexDirection: isTimerRunning ? 'row' : 'column' },styles.container]} onPress={() => router.push("/timer")}>
                <View style={{alignItems: isTimerRunning ? 'left' : 'center'}}>
                    <Image source={currentPhase == TimerPhase.IS_WORK ? ImagesAssets.work_img : ImagesAssets.nap_img} style={styles.image}/>
                    <ThemedText type="subtitle" white={true}>
                        {isTimerRunning ? currentPhase == TimerPhase.IS_WORK ? "Au boulot !" : "Une pause s'impose" : "Commencer à travailer"}
                    </ThemedText>
                </View>
                {isTimerRunning && (
                    <Ionicons name="chevron-forward-outline" color="white" size={30} />
                )}
            </ThemedTouch>
            <HistoricList/>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    container: {
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
    },
    button: {
        marginTop: 50
    },
    loader: {
        marginTop: 80,
        marginBottom: 54
    }
});
