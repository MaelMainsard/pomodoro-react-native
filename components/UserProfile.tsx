import {useAuth} from "@/context/AuthContext";
import {StyleSheet} from "react-native";
import UserAvatar from 'react-native-user-avatar';
import {ThemedView} from "@/components/themed/ThemedView";
import {ThemedText} from "@/components/themed/ThemedText";
import {
    signOutWithGoogle,
    SignOutWithGoogleResResponse,
    SignOutWithGoogleResTypes
} from "@/hooks/useGoogleAuth";
import {ThemedIcon} from "@/components/themed/ThemedIcon";

export function UserProfile() {
    const { userInfo, setUserInfo } = useAuth();

    const logOutWithGoogle = async () => {
        const response:SignOutWithGoogleResResponse = await signOutWithGoogle();
        if(response.type === SignOutWithGoogleResTypes.SIGN_OUT_FAILURE){
            alert(`Un problème est survenu lors de la déconnexion : ${response.error_msg}`);
        }
        else {
            setUserInfo(null);
        }
    }

    return (
        <ThemedView style={styles.profile}>
            <UserAvatar size={80} name={userInfo.user_info.user.displayName} src={userInfo.user_info.user.photoURL}/>
            <ThemedView>
                <ThemedText>
                    Bonjour
                </ThemedText>
                <ThemedText type="subtitle">
                    {userInfo.user_info.user.displayName}
                </ThemedText>
            </ThemedView>
            <ThemedIcon name={"log-out-outline"} color={"text3"} size={50} onPress={logOutWithGoogle}/>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    profile: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        marginVertical: 50,
    },
    logout_button: {
        width: 80,
        height: 80,
    }
});
