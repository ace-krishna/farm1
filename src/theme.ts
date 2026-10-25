import type { ImageSourcePropType } from 'react-native';

export const colors = {
  background: '#f9faf8',
  card: '#ffffff',
  surfaceContainerLow: '#f3f4f2',
  surfaceContainer: '#edeeec',
  surfaceContainerHigh: '#e7e8e6',
  primary: '#00362a',
  primaryDark: '#082820',
  primaryContainer: '#134e3f',
  primaryFixed: '#b5efda',
  secondary: '#904d00',
  secondaryFixed: '#ffdcc3',
  tertiaryContainer: '#004971',
  tertiaryFixed: '#cce5ff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  accent: '#FF8F00',
  danger: '#ba1a1a',
  text: '#191c1b',
  muted: '#404945',
  border: '#bfc9c3',
  scan: '#111827',
  animalAvatar: '#8fa998',
};

export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
};

export type Animal = {
  id: string;
  name: string;
  breed: string;
  tag: string;
  initials: string;
  image?: ImageSourcePropType;
};
