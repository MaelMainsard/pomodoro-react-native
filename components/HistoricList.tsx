import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { getSessionByUserId } from "@/database/session.repository";
import { SessionModel } from "@/database/session.model";
import { StyleSheet, ScrollView, View } from "react-native";
import { HistoricTile } from "@/components/HistoricTile";
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Importer la locale française
import { Spinner, Text, useTheme } from "@ui-kitten/components";

dayjs.extend(duration);
dayjs.locale('fr'); // Définir la locale sur "fr"

export function HistoricList() {
    const theme = useTheme();
    const { userInfo, isLoading } = useAuth();
    const [sessions, setSessions] = useState<SessionModel[]>([]);

    useEffect(() => {
        if (!isLoading && userInfo?.user_info?.user) {
            const unsubscribe = getSessionByUserId(userInfo.user_info.user.uid, setSessions);
            return () => unsubscribe();
        }
    }, [userInfo, isLoading]);

    const groupSessionsByDate = (sessions: SessionModel[]) => {
        return sessions
            .sort((a, b) => dayjs(b.startedAt.toDate()).isAfter(dayjs(a.startedAt.toDate())) ? 1 : -1) // Trier les sessions dans l'ordre inverse
            .reduce<{ [key: string]: SessionModel[] }>((acc, session) => {
                const date = dayjs(session.startedAt.toDate()).format('YYYY-MM-DD');
                if (!acc[date]) acc[date] = [];
                acc[date].push(session);
                return acc;
            }, {});
    };

    const groupedSessions = groupSessionsByDate(sessions);

    return (
        <View style={styles.historicList}>
            {isLoading ? (
                <Spinner style={{ borderColor: theme['color-primary-300'] }} />
            ) : userInfo ? (
                Object.keys(groupedSessions).length ? (
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {Object.entries(groupedSessions).map(([date, sessions]) => (
                            <View key={date}>
                                <Text style={styles.dateText}>{dayjs(date).format('D MMMM YYYY')}</Text>
                                {sessions.map((session, index) => (
                                    <HistoricTile key={index} session={session} />
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <Text>No sessions found</Text>
                )
            ) : (
                <Text>Nothing to display</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    historicList: {
        flex: 1,
        width: "100%",
    },
    scrollContent: {
        alignItems: "center",
        justifyContent: "flex-start",
    },
    dateText: {
        textAlign: "center",
        fontWeight: "bold",
        marginVertical: 5,
    },
});
