import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from "@/constants/Colors";

export type ThemedProgressProps = {
    remainingTime: number;
    totalTime: number;
    lightColor?: string;
    darkColor?: string;
    type?: 'work' | 'nap';
};

export function ThemedProgress({remainingTime, totalTime, lightColor, darkColor, type = 'work', ...otherProps}: ThemedProgressProps) {

    const activeColor = useThemeColor({
        light: lightColor || Colors.light[type].primary,
        dark: darkColor || Colors.dark[type].primary
    }, type);

    return (
        <CircularProgress
            value={(remainingTime / totalTime) * 100}
            radius={100}
            showProgressValue={false}
            circleBackgroundColor={'white'}
            activeStrokeColor={activeColor}
            inActiveStrokeColor={'white'}
            {...otherProps}
        />
    );
}