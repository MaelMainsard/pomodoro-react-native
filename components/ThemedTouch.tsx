import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import {Colors} from "@/constants/Colors";

export type ThemedTouchProps = TouchableOpacityProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'work' | 'nap';
};

export function ThemedTouch({ style, lightColor, darkColor, type = 'default', ...otherProps }: ThemedTouchProps) {
    const backgroundColor = useThemeColor(        {
            light: lightColor || Colors.light[type].primary,
            dark: darkColor || Colors.dark[type].primary
        },
        type
    );

    return <TouchableOpacity style={[{ backgroundColor: backgroundColor as string }, style]} {...otherProps} />;
}
