import * as Notifications from 'expo-notifications';

export async function isNotificationOn():Promise<boolean> {
    const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
    return notificationStatus === 'granted';
}

export async function askAllPermission(): Promise<void> {
    if (!await isNotificationOn()) {
        alert('You need to enable notifications to receive alerts.');
    }
}