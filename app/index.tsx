import { ThemedView } from "@/components/ThemedView";
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useRouter } from "expo-router";
import { askAllPermission } from '../hooks/usePermission';
import React, { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedContainer } from "@/components/ThemedContainer";
import { ImagesAssets } from "@/assets/images/ImagesAssets";
import { GoogleButton } from "@/components/GoogleButton";
import { UserProfile } from '../components/UserProfile';
import { useAuth } from "@/context/AuthContext";


export default function HomeScreen() {
    const router = useRouter();
    const { userInfo, isLoading, setUserInfo } = useAuth();

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
            <ThemedContainer style={styles.container}>
                <Image source={ImagesAssets.work_img} style={styles.image}/>
                <ThemedText type="subtitle">
                    Commencer à travailler
                </ThemedText>
            </ThemedContainer>
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
        alignItems: 'center',
        paddingVertical: 20,
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
