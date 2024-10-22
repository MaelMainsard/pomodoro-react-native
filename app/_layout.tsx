import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TimerProvider } from '../context/TimerContext';
import { AuthProvider } from "../context/AuthContext";
import * as Notifications from 'expo-notifications';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { customTheme } from '../constants/custom-theme';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            router.push('/timer');
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={customTheme}>
                <AuthProvider>
                    <TimerProvider>
                        <Stack>
                            <Stack.Screen name="index" options={{ headerShown: false }} />
                            <Stack.Screen name="timer" options={{ headerShown: true, headerTransparent: true, headerTitle: '' }} />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                    </TimerProvider>
                </AuthProvider>
            </ApplicationProvider>
        </>
    );
}
