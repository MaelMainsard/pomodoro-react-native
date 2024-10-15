import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TimerProvider } from '../context/TimerContext';
import { AuthProvider } from "../context/AuthContext";
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      router.push('/timer');
    });


    if (loaded) {
      SplashScreen.hideAsync();
    }



    return () => subscription.remove();
  }, [loaded]);



  if (!loaded) {
    return null;
  }


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <TimerProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false   }} />
            <Stack.Screen name="timer" options={{ headerShown: true, headerTransparent: true, headerTitle: '' }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </TimerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
