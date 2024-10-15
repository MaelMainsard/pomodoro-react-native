import { useThemeColor } from '@/hooks/useThemeColor';
import {Colors} from "@/constants/Colors";
import {ActivityIndicator, ActivityIndicatorProps} from "react-native";
import React from "react";

export type ThemedIndicatorProps = ActivityIndicatorProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default';
};

export function ThemedIndicator({ style, lightColor, darkColor, type = 'default', ...otherProps }: ThemedIndicatorProps) {
    const color = useThemeColor({
        light: lightColor || Colors.light[type].primary,
        dark: darkColor || Colors.dark[type].primary
    }, type);

    return  <ActivityIndicator color={color as string} size={50} style={style} {...otherProps}/>;
}