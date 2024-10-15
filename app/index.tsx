import { ThemedView } from "@/components/themed/ThemedView";
import {StyleSheet} from "react-native";
import { askAllPermission } from '../hooks/usePermission';
import React, { useEffect } from "react";
import { UserProfile } from '../components/UserProfile';
import { useAuth } from "@/context/AuthContext";
import { HistoricList } from "@/components/HistoricList";
import {ThemedIndicator} from "@/components/themed/ThemedIndicator";
import {TimerWidget} from "@/components/TimerWidget";
import {GoogleButton} from "@/components/GoogleButton";

export default function HomeScreen() {

    const { userInfo, isLoading } = useAuth();

    useEffect(() => {
        askAllPermission();
    }, []);


    return (
        <ThemedView style={styles.screen}>
            {isLoading ? (
                <ThemedIndicator/>
            ):userInfo ? (
                <UserProfile/>
            ) : (
                <GoogleButton/>
            )}
            <TimerWidget/>
            <HistoricList/>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
});
