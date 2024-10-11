import {GoogleSignin, SignInResponse, SignInSilentlyResponse} from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { config } from 'dotenv';
config();

// --------------------------------------------------------------
// Explication du workflow du SSO Google
//---------------------------------------------------------------
// 1. Tout d'abord, nous procédons à l'authentification (sign in/register) de l'utilisateur auprès de l'Identity Provider (IdP) de Google.
// 2. Ensuite, l'IdP nous renvoie un tokenId.
// 3. Nous transférons ce tokenId à Firebase afin de connecter l'utilisateur au service Firebase en tant que connexion SSO Google.
// 4. Enfin, Firebase nous retourne les informations de l'utilisateur.
// --------------------------------------------------------------

export enum SignInWithGoogleResTypes {
    LOGIN_SILENT_SUCCESS = 'LOGIN_SILENT_SUCCESS',
    LOGIN_SILENT_NO_CREDENTIAL = 'LOGIN_SILENT_NO_CREDENTIAL',
    LOGIN_SILENT_FAILURE = 'LOGIN_SILENT_FAILURE',
    LOGIN_POPUP_SUCCESS = 'LOGIN_POPUP_SUCCESS',
    LOGIN_POPUP_CANCELLED = 'LOGIN_POPUP_CANCELLED',
    LOGIN_POPUP_FAILURE = 'LOGIN_POPUP_FAILURE',
}

export interface SignInWithGoogleResResponse {
    type: SignInWithGoogleResTypes;
    user_info?: FirebaseAuthTypes.UserCredential;
    error_msg?: string;
}

// Ici on configure le sso google

GoogleSignin.configure({
    offlineAccess: true,
    webClientId: process.env.WEB_CLIENT_ID,
    scopes: ['profile', 'email'],
});

// -------------------------------------------------------------------------------------------------------
// Cette fonction permet à l'application de connecter l'utilisateur sans qu'il ait à faire quoi que ce soit
// -------------------------------------------------------------------------------------------------------

export async function signInWithGoogleSilently(): Promise<SignInWithGoogleResResponse> {
    try {
        const userInfo: SignInSilentlyResponse = await GoogleSignin.signInSilently();
        if (userInfo.type === "success") {
            const credential: FirebaseAuthTypes.AuthCredential = auth.GoogleAuthProvider.credential(userInfo.data.idToken);
            const firebaseLoginResponse: FirebaseAuthTypes.UserCredential = await auth().signInWithCredential(credential);

            return {
                type: SignInWithGoogleResTypes.LOGIN_SILENT_SUCCESS,
                user_info: firebaseLoginResponse,
            };
        } else {
            return {
                type: SignInWithGoogleResTypes.LOGIN_SILENT_NO_CREDENTIAL,
            };
        }
    } catch (error) {
        return {
            type: SignInWithGoogleResTypes.LOGIN_SILENT_FAILURE,
            error_msg: error.toString(),
        };
    }
}

// -------------------------------------------------------------------------------------------------
// Cette fonction est utilise si le silent login n'as pas fonctionné, il permet d'aficher une pop up
// et de choisit son compte google pour continuer
// -------------------------------------------------------------------------------------------------

export async function signInWithGoogle():Promise<SignInWithGoogleResResponse>  {

    try {
        const userInfo:SignInResponse = await GoogleSignin.signIn();
        if (userInfo.type == "success") {
            const credential: FirebaseAuthTypes.AuthCredential = auth.GoogleAuthProvider.credential(userInfo.data.idToken);
            const firebaseLoginResponse: FirebaseAuthTypes.UserCredential = await auth().signInWithCredential(credential);

            return {
                type: SignInWithGoogleResTypes.LOGIN_POPUP_SUCCESS,
                user_info: firebaseLoginResponse,
            };
        } else {
            return {
                type: SignInWithGoogleResTypes.LOGIN_POPUP_CANCELLED,
            };
        }
    } catch (error) {
        return {
            type: SignInWithGoogleResTypes.LOGIN_POPUP_FAILURE,
            error_msg: error.toString(),
        };
    }

}

// --------------------------------------------------------------
// Cette fonctio permet de ce déconnecté de google et de firebase
// --------------------------------------------------------------

export async function signOutWithGoogle() {
    try {
        
    } catch (error) {
        
    }
    await GoogleSignin.signOut();
    await auth().signOut();
}