import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'work' | 'nap';
};

export function ThemedView({ lightColor, darkColor, type = 'default', style, ...otherProps }: ThemedViewProps) {
    const backgroundColor = useThemeColor({
        light: lightColor || Colors.light[type].background,
        dark: darkColor || Colors.dark[type].background
    });

    return (
        <View style={[{ backgroundColor: backgroundColor as string }, style]} {...otherProps} />
    );
}