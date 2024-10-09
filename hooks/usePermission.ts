import * as Location from 'expo-location';

export async function requestPermissionsBg(LOCATION_TASK_NAME:string): Promise<void> {
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
        });
    }
};
