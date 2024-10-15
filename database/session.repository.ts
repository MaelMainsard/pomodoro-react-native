import firestore from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { SessionModel } from "@/database/session.model";

export function getSessionByUserId(userId: string, callback: (sessions: SessionModel[]) => void): () => void {
    const unsubscribe = firestore()
        .collection('session')
        .where('userId', '==', userId)
        .onSnapshot((querySnapshot) => {
            const sessions: SessionModel[] = [];
            querySnapshot.forEach(snapshot => {
                const data: FirebaseFirestoreTypes.DocumentData = snapshot.data();
                sessions.push(SessionModel.fromDocument(data));
            });
            callback(sessions);
        });

    return unsubscribe;
}

export enum NewSessionTypes {
    SUCCESS,
    FAILURE,
}

export interface NewSessionRes {
    type: NewSessionTypes,
    error_msg?: string;
}


export function addNewSession(session: SessionModel): Promise<NewSessionRes> {
    return firestore()
        .collection('session')
        .add(session.toDocument())
        .then(() => {
            return { type: NewSessionTypes.SUCCESS };
        })
        .catch((error) => {
            return {
                type: NewSessionTypes.FAILURE,
                error_msg: error.toString(),
            };
        });
}