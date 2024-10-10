import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

Notifications.setNotificationChannelAsync('general', {
    name: 'Times Up !',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [],
    sound: 'notification.wav',
});


export function scheduleNotification(msg: string): void {

    Notifications.scheduleNotificationAsync({
        content: {
            title: "Pomodoro Timer",
            body: msg,
            vibrate: [],
            sound: "notification.wav",
            priority: Notifications.AndroidNotificationPriority.MAX,
        },
        trigger: {
            seconds: 2,
            channelId: 'general',
            repeats: false
        }
    });
}
