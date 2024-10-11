import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { askAllPermission } from '../hooks/usePermission';
import { useEffect } from "react";
import { ThemedButton } from '../components/ThemedButton';
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
    const router = useRouter();

    useEffect(() => {
        askAllPermission();
    }, []);

    return (
        <ThemedView style={styles.screen}>
            <ThemedText type="subtitle" style={styles.title}>
                Bienvenue sur pomoboro, choisissez un mode
            </ThemedText>
            <View style={styles.buttons_group}>
                <ThemedButton
                    title="45/15"
                    variant="default"
                    onPress={() => router.push({ pathname: '/timer', params: { work: 45, nap: 15 } })}
                ></ThemedButton>
                <ThemedButton
                    title="25/5"
                    variant="default"
                    onPress={() => router.push({ pathname: '/timer', params: { work: 25, nap: 5 } })}
                ></ThemedButton>
            </View>
            <View style={styles.historyButtonContainer}>
                <ThemedButton
                    title="Historique"
                    variant="default"
                    onPress={() => router.push({ pathname: '/history' })}
                ></ThemedButton>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        width: "80%",
    },
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    buttons_group: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyButtonContainer: {
        width: '80%',
        marginBottom: 30,
        alignItems: 'center',
    }
});
