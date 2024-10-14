import firestore from '@react-native-firebase/firestore';
import { Timestamp} from "@react-native-firebase/firestore";

export enum AddSessionRes {
    SUCCESS,
    FAILED,
}

export interface Session {
    id?: string;
    userId?: string;
    startedAt: Timestamp;
    endedAt: Timestamp;
    restMinutes: number;
    workMinutes: number;
}

export async function sendSession(): Promise<void> {
    await firestore().collection('session').add({
        userId: userId,
        startedAt: "2024-05-31T17:14:24.244Z",
        endedAt: "2024-06-31T17:14:24.244Z",
        workMinutes: 40,
        restMinutes: 40
    });
}