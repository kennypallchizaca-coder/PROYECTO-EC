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
  background: '#fff6f6',   // Fondo claro con un tono cálido sutil
  surface: '#ffffff',      // Superficie de tarjetas o contenedores
  card: '#ffe1e1',         // Tarjetas con leve tono rojizo para identidad
  primary: '#E20613',      // Rojo institucional de Radio Sisid
  onPrimary: '#ffffff',    // Texto claro sobre el rojo
  text: '#1a1a1a',         // Texto principal oscuro
  muted: '#6b7280',        // Texto secundario
  border: '#f0c4c4',       // Bordes suaves acordes al rojo
  success: '#16a34a',      // Verde para estados positivos
  danger: '#dc2626',       // Rojo oscuro para errores
};

const darkColors: ColorPalette = {
  background: '#121212',   // Fondo principal oscuro
  surface: '#1e1e1e',      // Superficie de secciones
  card: '#2a2a2a',         // Tarjetas o bloques
  primary: '#ff4b4b',      // Rojo brillante adaptado al modo oscuro
  onPrimary: '#ffffff',    // Texto claro sobre el rojo
  text: '#f5f5f5',         // Texto principal claro
  muted: '#9ca3af',        // Texto secundario gris
  border: '#2f2f2f',       // Bordes discretos
  success: '#22c55e',      // Verde para confirmaciones
  danger: '#ef4444',       // Rojo vibrante para errores
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
