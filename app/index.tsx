import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { askAllPermission } from '../hooks/usePermission';
import {useEffect} from "react";

export default function HomeScreen() {
    const router = useRouter();

    useEffect(() => {
        askAllPermission();
    })


    return (
        <ThemedView style={styles.screen}>
            <View style={styles.buttons_group}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => router.push({ pathname: '/timer', params: { work: 5, nap: 5 } })}
                >
                    <Text style={styles.buttonText}>45/15</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => router.push({ pathname: '/timer', params: { work: 25, nap: 5 } })}
                >
                    <Text style={styles.buttonText}>25/5</Text>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
    },
    buttons_group: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '80%',
        marginVertical: 10,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
    },
});
