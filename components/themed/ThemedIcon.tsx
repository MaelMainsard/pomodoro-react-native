import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export type ThemedIconProps = {
    lightColor?: string;
    darkColor?: string;
    color?: 'text1' | 'text2' | 'text3' | 'work' | 'nap' ;
    name: keyof typeof Ionicons.glyphMap;
    size?: number;
    onPress?: () => any;
};

export function ThemedIcon({name, lightColor, onPress, darkColor, color = 'text1', size = 30, ...otherProps}: ThemedIconProps) {
    const iconColor = useThemeColor({
        light: lightColor ||
            (color === "text1" ? Colors.light.default.text1 :
                color === "text2" ? Colors.light.default.text2 :
                    color === "text3" ? Colors.light.default.text3 :
                        color === "work" ? Colors.light.work.primary : Colors.light.nap.primary),

        dark: darkColor ||
            (color === "text1" ? Colors.dark.default.text1 :
                color === "text2" ? Colors.dark.default.text2 :
                    color === "text3" ? Colors.dark.default.text3 :
                        color === "work" ? Colors.dark.work.primary : Colors.dark.nap.primary),
    },color);

    return <Ionicons name={name} color={iconColor} size={size} onPress={onPress} {...otherProps} />;
}
