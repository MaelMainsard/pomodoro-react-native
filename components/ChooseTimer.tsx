import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedTouch} from "@/components/ThemedTouch";
import React from "react";
import {StyleSheet, View} from "react-native";
import {useTimer} from "@/context/TimerContext";

export function ChooseTimer()  {

    const { startTimer } = useTimer();

    return (
        <ThemedView style={styles.container}>
            <ThemedText type={"subtitle"} style={{marginBottom: 100}}>Sélectionnez un rythme de travail</ThemedText>
            <ThemedView style={styles.button_group}>
                <ThemedView style={styles.button}>
                    <ThemedText type={"subtitle"}>Travail</ThemedText>
                    <ThemedText type={"subtitle"}>Pause</ThemedText>
                </ThemedView>
                <ThemedTouch style={styles.button} onPress={()=>startTimer(45,15)}>
                    <ThemedText type={"subtitle"} white={true}>45min</ThemedText>
                    <ThemedText type={"subtitle"} white={true}>15min</ThemedText>
                </ThemedTouch>
                <ThemedTouch style={styles.button} onPress={()=>startTimer(25,5)}>
                    <ThemedText type={"subtitle"} white={true}>25min</ThemedText>
                    <ThemedText type={"subtitle"} white={true}>5min</ThemedText>
                </ThemedTouch>
                <ThemedTouch style={styles.button} onPress={()=>startTimer(1,1)}>
                    <ThemedText type={"subtitle"} white={true}>1min</ThemedText>
                    <ThemedText type={"subtitle"} white={true}>1min</ThemedText>
                </ThemedTouch>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'space-around',
    },
    button_group: {
        width: '90%',
        justifyContent: 'space-around',
        height: 300,
    }
});