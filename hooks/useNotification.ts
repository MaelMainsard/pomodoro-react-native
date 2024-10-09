import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function scheduleNotification(msg:string) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Timer Finished!",
            body: `${msg}`,
            sound: true,
        },
        trigger: null, // Déclenche après le nombre de secondes spécifié
    });
}
