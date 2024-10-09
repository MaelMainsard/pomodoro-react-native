import * as Notifications from 'expo-notifications';
import { isNotificationOn } from './usePermission';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function scheduleNotification(msg:string) {

    if(await isNotificationOn()){
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Timer Finished!",
                body: `${msg}`,
                sound: true,
            },
            trigger: null,
        });
    }
}
