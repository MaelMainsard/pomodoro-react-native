import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { getSessionByUserId } from "@/database/session.repository";
import { SessionModel } from "@/database/session.model";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIndicator } from "react-native";

export function HistoricList() {
    const { userInfo, isLoading } = useAuth();
    const [sessions, setSessions] = useState<SessionModel[]>([]);

    useEffect(() => {
        if (!isLoading && userInfo?.user_info?.user) {
            const unsubscribe = getSessionByUserId(userInfo.user_info.user.uid, (fetchedSessions: SessionModel[]) => {
                setSessions(fetchedSessions);
            });

            return () => {
                unsubscribe();
            };
        }
    }, [userInfo, isLoading]);

    return (
        <ThemedView>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : userInfo ? (
                sessions.length > 0 ? (
                    sessions.map((session:SessionModel,index:number) => (
                        <ThemedText key={index}>
                            {session.toString()}
                        </ThemedText>
                    ))
                ) : (
                    <ThemedText>No sessions found</ThemedText>
                )
            ) : (
                <ThemedText>Nothing to display</ThemedText>
            )}
        </ThemedView>
    );
}
