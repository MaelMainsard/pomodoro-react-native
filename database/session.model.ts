import {Timestamp} from "@react-native-firebase/firestore";
import {SessionInterface} from "@/database/session.interface";


class SessionModel implements SessionInterface{
    userId: string;
    startedAt: Timestamp;
    endedAt: Timestamp;
    workMinutes: number;
    restMinutes: number;

    constructor({userId,startedAt, endedAt, workMinutes, restMinutes}:SessionInterface) {
        this.userId = userId;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.workMinutes = workMinutes;
        this.restMinutes = restMinutes;
    }

    toDocument(): Record<string, any> {
        return {
            'userId': this.userId,
            'startedAt': this.startedAt,
            'endedAt': this.endedAt,
            'workMinutes': this.workMinutes,
            'restMinutes': this.restMinutes
        };
    }

    static fromDocument(doc: Record<string, any>): SessionModel {
        return new SessionModel({
            userId: doc['userId'] as string,
            startedAt: doc['startedAt'] as Timestamp,
            endedAt: doc['endedAt'] as Timestamp,
            workMinutes: doc['workMinutes'] as number,
            restMinutes: doc['restMinutes'] as number
        });
    }

    toString(): string {
        return `SessionModel: {
        userId: ${this.userId},
        startedAt: ${this.startedAt},
        endedAt: ${this.endedAt},
        workMinutes: ${this.workMinutes},
        restMinutes: ${this.restMinutes},
      }`;
    }


}

export { SessionModel };