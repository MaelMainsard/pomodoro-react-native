import { SessionModel } from "@/database/session.model";
import duration, { Duration } from "dayjs/plugin/duration";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, View } from "react-native";
import {Icon, Layout, Text, useTheme} from "@ui-kitten/components";

dayjs.extend(duration);

interface HistoricTileProps {
    session: SessionModel;
}

export const HistoricTile: React.FC<HistoricTileProps> = ({ session }) => {

    const theme = useTheme();
    const totalSessionDuration: Duration = dayjs.duration(
        session.endedAt.toDate().getTime() - session.startedAt.toDate().getTime()
    );

    function calculateCompletedCycles(): { workCycles: number; restCycles: number } {
        const totalMinutes = Math.ceil(totalSessionDuration.asMinutes());
        const fullCycleMinutes = session.workMinutes + session.restMinutes;
        const completeCycles = Math.floor(totalMinutes / fullCycleMinutes);
        const remainingMinutes = totalMinutes % fullCycleMinutes;

        let workCycles = completeCycles;
        let restCycles = completeCycles;

        if (remainingMinutes > 0) {
            workCycles++;
            if (remainingMinutes > session.workMinutes) {
                restCycles++;
            }
        }

        return { workCycles, restCycles };
    }

    const { workCycles, restCycles } = calculateCompletedCycles();

    return (
        <Layout style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%", marginVertical: 10, borderRadius: 15, paddingVertical: 15, paddingHorizontal: 50 }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ color: theme['color-primary-400'] }}>{session.workMinutes}</Text>
                <Text> / </Text>
                <Text style={{ color: theme['color-primary-500'] }}>{session.restMinutes}</Text>
            </View>
            <Text>{totalSessionDuration.format("HH:mm:ss")}</Text>
            <View style={{ display: "flex", flexDirection: "row" , alignItems: "center" }}>
                <Icon name='sync-outline' fill={theme['color-basic-50']} style={{width: 15, height: 15, marginRight: 5}}/>
                <Text style={{ color: theme['color-primary-400'] }}>{workCycles}</Text>
                <Text> - </Text>
                <Text style={{ color: theme['color-primary-500'] }}>{restCycles}</Text>
            </View>
        </Layout>
    );
};
