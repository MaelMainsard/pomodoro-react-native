import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedContainerProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedContainer({ style, lightColor, darkColor, ...otherProps }: ThemedContainerProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');

    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
