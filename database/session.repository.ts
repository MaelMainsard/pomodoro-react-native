import firestore from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { SessionModel } from "@/database/session.model";

export function getSessionByUserId(userId: string, callback: (sessions: SessionModel[]) => void): () => void {
    const unsubscribe = firestore()
        .collection('session')
        .where('userId', '==', userId)
        .orderBy('startedAt', 'desc')  // Sort by startedAt in descending order
        .onSnapshot((querySnapshot) => {
            const sessions: SessionModel[] = [];
            if (querySnapshot && !querySnapshot.empty) {
                querySnapshot.forEach(snapshot => {
                    const data = snapshot.data();
                    sessions.push(SessionModel.fromDocument(data));
                });
            }
            callback(sessions);
        }, (error) => {
            console.error("Error fetching sessions:", error);
            callback([]);  // Call the callback with an empty array in case of error
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