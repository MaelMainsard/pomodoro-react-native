import { TouchableOpacity, Text, StyleSheet, type TouchableOpacityProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = TouchableOpacityProps & {
    lightColor?: string;
    darkColor?: string;
    textColorLight?: string;
    textColorDark?: string;
    title: string;
    variant?: 'default' | 'danger' | 'stop' | 'resume';
};

export function ThemedButton({
    lightColor,
    darkColor,
    textColorLight,
    textColorDark,
    title,
    variant = 'default',
    style,
    ...otherProps
    }: ThemedButtonProps) {

    const backgroundColor =
        variant === 'danger' ? 'red' :
            variant === 'stop' ? 'blue' :
                variant === 'resume' ? 'green' :
                    useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

    const textColor =
        variant === 'danger' || variant === 'stop' || variant === 'resume'
            ? 'white'
            : useThemeColor({ light: textColorLight, dark: textColorDark }, 'text');

    return (
        <TouchableOpacity style={[{ backgroundColor }, styles.buttonContainer, style]} {...otherProps}>
            <Text style={[{ color: textColor }, styles.buttonText]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 12,
        marginVertical: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
