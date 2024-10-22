import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ImagesAssets} from "@/assets/images/ImagesAssets";
import React from "react";
import {useAuth} from "@/context/AuthContext";
import {signInWithGoogle, SignInWithGoogleResTypes} from "@/hooks/useGoogleAuth";

export function GoogleButton() {

    const { setUserInfo } = useAuth();

    const logInWithGoogle = async () => {
        const response = await signInWithGoogle();
        if (response.type === SignInWithGoogleResTypes.LOGIN_POPUP_SUCCESS) {
            setUserInfo(response);
        } else {
            alert(`Erreur de connexion Google : ${response.error_msg}`);
        }
    };

    return (
        <TouchableOpacity style={styles.google_btn} onPress={logInWithGoogle}>
            <Image source={ImagesAssets.google_icon} style={styles.google_icon}/>
            <Text style={styles.google_text}>Se connecter avec Google</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    google_btn: {
        width: '90%',
        marginVertical: 50,
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    google_icon : {
        width: 30,
        height: 30,
        marginRight: 20
    },
    google_text: {
        fontSize: 18,
    }
});
