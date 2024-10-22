import {useAuth} from "@/context/AuthContext";
import {StyleSheet, View} from "react-native";
import {
    signOutWithGoogle,
    SignOutWithGoogleResResponse,
    SignOutWithGoogleResTypes
} from "@/hooks/useGoogleAuth";
import {Avatar, Icon, Text, useTheme} from "@ui-kitten/components";

export function UserProfile() {

    const theme = useTheme();
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
        <View style={styles.profile}>
            <Avatar size='giant' nativeID={userInfo.user_info.user.displayName}  src={userInfo.user_info.user.photoURL}/>
            <View>
                <Text>Bonjour</Text>
                <Text style={{fontSize: 25}}>{userInfo.user_info.user.displayName}</Text>
            </View>
            <Icon name='log-out-outline' fill={theme['color-basic-200']} style={{width: 40, height: 40}} onPress={logOutWithGoogle}/>
        </View>
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
    }
});
