import firestore from '@react-native-firebase/firestore';

export enum AddSessionRes {
    SUCCESS,
    FAILED,
}

export interface Session {
    id?: string;
    userId: string;
    startedAt: Date;
    createdAt: Date;
}



export async function addSession(userId: string): Promise<void> {
    await firestore().collection('session').add({
        userId: userId,
        startedAt: "2024-05-31T17:14:24.244Z",
        endedAt: "2024-06-31T17:14:24.244Z",
        workMinutes: 40,
        restMinutes: 40
    });
}