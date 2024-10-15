import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'enormous' | 'timer';
  colorType?: 'text1' | 'text2' | 'work' | 'nap';
};

export function ThemedText({style, lightColor, darkColor, type = 'default', colorType = 'text1', ...rest}: ThemedTextProps) {

    const textColor = useThemeColor(
        {
            light: lightColor ||
                (colorType === "text1" ? Colors.light.default.text1 :
                    colorType === "text2" ? Colors.light.default.text2 :
                        colorType === "work"  ? Colors.light.work.text :
                            Colors.light.nap.text),

            dark: darkColor ||
                (colorType === "text1" ? Colors.dark.default.text1 :
                    colorType === "text2" ? Colors.dark.default.text2 :
                        colorType === "work"  ? Colors.dark.work.text :
                            Colors.dark.nap.text),
        },
        colorType
    );

  return (
      <Text
          style={[
            { color: textColor as string },
            type === 'default' ? styles.default : undefined,
            type === 'title' ? styles.title : undefined,
            type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
            type === 'subtitle' ? styles.subtitle : undefined,
            type === 'link' ? styles.link : undefined,
            type === 'enormous' ? styles.enormous : undefined,
            type === 'timer' ? styles.timer : undefined,
            style,
          ]}
          {...rest}
      />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  enormous: {
    fontSize: 62,
    fontWeight: 'bold',
    lineHeight: 62,
  },
  timer :{
    fontSize: 42,
    fontWeight: 'semibold',
    lineHeight: 42,
  }
});
