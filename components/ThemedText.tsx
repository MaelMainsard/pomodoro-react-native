import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'enormous' | 'timer';
  colorType?: 'default' | 'work' | 'nap';
  white?: boolean;
};

export function ThemedText({style, lightColor, darkColor, type = 'default', colorType = 'default', white = false, ...rest}: ThemedTextProps) {

  const textColor = useThemeColor(
      {
        light: lightColor || (white ? 'white' : (colorType === 'work' ? Colors.light.work.text : (colorType === 'nap' ? Colors.light.nap.text : Colors.light.default.text))),
        dark: darkColor || (white ? 'white' : (colorType === 'work' ? Colors.light.work.text : (colorType === 'nap' ? Colors.light.nap.text : Colors.light.default.text)))
      },
      colorType
  );

  return (
      <Text
          style={[
            { color: textColor as string }, // Assure que textColor est bien une chaîne
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
