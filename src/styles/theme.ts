import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme, Theme as NavigationTheme } from '@react-navigation/native';

export type ThemeMode = 'light' | 'dark';

type ColorPalette = {
  background: string;
  surface: string;
  card: string;
  primary: string;
  onPrimary: string;
  text: string;
  muted: string;
  border: string;
  success: string;
  danger: string;
};

type SpacingScale = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

type TypographyScale = {
  hero: number;
  heading: number;
  subheading: number;
  body: number;
  caption: number;
};

type RadiusScale = {
  sm: number;
  md: number;
  lg: number;
};

export type AppTheme = {
  mode: ThemeMode;
  colors: ColorPalette;
  spacing: SpacingScale;
  typography: TypographyScale;
  radius: RadiusScale;
};

const spacing: SpacingScale = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const typography: TypographyScale = {
  hero: 32,
  heading: 24,
  subheading: 20,
  body: 16,
  caption: 12,
};

const radius: RadiusScale = {
  sm: 8,
  md: 16,
  lg: 28,
};

const lightColors: ColorPalette = {
  background: '#f8fafc',
  surface: '#e2e8f0',
  card: '#ffffff',
  primary: '#f97316',
  onPrimary: '#fffbeb',
  text: '#0f172a',
  muted: '#64748b',
  border: '#cbd5f5',
  success: '#10b981',
  danger: '#ef4444',
};

const darkColors: ColorPalette = {
  background: '#0f172a',
  surface: '#1e293b',
  card: '#1e293b',
  primary: '#fb923c',
  onPrimary: '#0f172a',
  text: '#e2e8f0',
  muted: '#94a3b8',
  border: '#334155',
  success: '#34d399',
  danger: '#f87171',
};

export const buildTheme = (mode: ThemeMode): AppTheme => ({
  mode,
  colors: mode === 'dark' ? darkColors : lightColors,
  spacing,
  typography,
  radius,
});

export const buildNavigationTheme = (mode: ThemeMode): NavigationTheme => {
  const base = mode === 'dark' ? NavigationDarkTheme : NavigationLightTheme;
  const palette = mode === 'dark' ? darkColors : lightColors;

  return {
    ...base,
    colors: {
      ...base.colors,
      background: palette.background,
      card: palette.card,
      border: palette.border,
      text: palette.text,
      primary: palette.primary,
      notification: palette.primary,
    },
  };
};
