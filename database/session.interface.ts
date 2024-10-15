import {Timestamp} from "@react-native-firebase/firestore";

export interface SessionInterface {
    userId: string;
    startedAt: Timestamp;
    endedAt: Timestamp;
    workMinutes: number;
    restMinutes: number;
}