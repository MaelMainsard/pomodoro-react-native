import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithGoogleSilently, signInWithGoogle, signOutWithGoogle } from "@/hooks/useGoogleAuth";
import { ThemedView } from "@/components/ThemedView";
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {FirebaseAuthTypes} from "@react-native-firebase/auth";

export default function History() {

    const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.UserCredential | null>(null);

    useEffect(() => {
        const signInSilently = async () => {
            const user = await signInWithGoogleSilently();
            setUserInfo(user);
        };

        signInSilently();

        return () => {};
    }, []);

    return (
        <ThemedView style={styles.screen}>
            { userInfo ? (
                <ThemedView>
                    <Text style={styles.welcomeText}>
                        Welcome, {userInfo.user?.displayName}!
                    </Text>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={async () => {
                            await signOutWithGoogle();
                            setUserInfo(null);
                        }}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </ThemedView>
            ) : (
                <GoogleSigninButton
                    onPress={async () => {
                        const user = await signInWithGoogle();
                        if (user !== null) {
                            setUserInfo(user);
                        }
                    }}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '80%',
        marginVertical: 10,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
    },
});