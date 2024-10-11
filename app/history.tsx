import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ThemedView} from "@/components/ThemedView";
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

import {
    signInWithGoogle,
    SignInWithGoogleResponse,
    SignInWithGoogleResTypes,
    signInWithGoogleSilently,
    signOutWithGoogle,
    SignOutWithGoogleResResponse,
    SignOutWithGoogleResTypes
} from "@/hooks/useGoogleAuth";

export default function History() {

    const [signInResponse, setSignInResponse] = useState<SignInWithGoogleResponse | undefined>(undefined);

    useEffect(() => {
        const signInSilently = async () => {
            const response:SignInWithGoogleResponse = await signInWithGoogleSilently();
            if(response.type === SignInWithGoogleResTypes.LOGIN_SILENT_FAILURE) {
                alert(`Un problème est survenu lors de la connexion siliencieuse : ${response.error_msg}`);
            }
            else {
                setSignInResponse(response);
            }
        };

        signInSilently();

        return () => {};
    }, []);

    const logInWithGoogle = async () => {
        const response:SignInWithGoogleResponse = await signInWithGoogle();
        if(response.type === SignInWithGoogleResTypes.LOGIN_POPUP_SUCCESS){
            setSignInResponse(response);
        }
        else if(response.type == SignInWithGoogleResTypes.LOGIN_SILENT_FAILURE) {
            alert(`Un problème est survenu lors de la connexion à google : ${response.error_msg}`);
        }
    }

    const logOutWithGoogle = async () => {
        const response:SignOutWithGoogleResResponse = await signOutWithGoogle();
        if(response.type === SignOutWithGoogleResTypes.SIGN_OUT_SUCESS){
            const signInResponse = {type: SignInWithGoogleResTypes.LOGIN_SILENT_NO_CREDENTIAL};
            setSignInResponse(signInResponse);
        }
        else {
            alert(`Un problème est survenu lors de la déconnexion : ${response.error_msg}`);
        }
    }


    return (
        <ThemedView style={styles.screen}>
            {signInResponse === undefined ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : signInResponse.type == SignInWithGoogleResTypes.LOGIN_SILENT_SUCCESS || signInResponse.type == SignInWithGoogleResTypes.LOGIN_POPUP_SUCCESS ? (
                <TouchableOpacity style={styles.buttonContainer} onPress={logOutWithGoogle}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            ) : (
                <GoogleSigninButton onPress={logInWithGoogle}/>
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