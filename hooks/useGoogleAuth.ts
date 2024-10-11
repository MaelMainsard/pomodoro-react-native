import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure(
    {
        offlineAccess: true,
        webClientId: "421858371890-klbs1rofpjr3ff0iscejev0i3r5isedm.apps.googleusercontent.com",
        scopes: ['profile', 'email']
    }
);

export async function signInWithGoogleSilently() {
    const userInfo = await GoogleSignin.signInSilently();
    if (userInfo.type === "success") {
        const credential = auth.GoogleAuthProvider.credential(userInfo.data?.idToken);
        return await auth().signInWithCredential(credential);
    }
    return null;

}

export async function signInWithGoogle() {

    const userInfo = await GoogleSignin.signIn();
    if (userInfo.type === "success") {
        const credential = auth.GoogleAuthProvider.credential(userInfo.data?.idToken);
        return await auth().signInWithCredential(credential);
    }
    return null;

}

export async function signOutWithGoogle() {
    await GoogleSignin.signOut();
    await auth().signOut();
}