import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import AppHeader from "@/src/features/radio/components/AppHeader/AppHeader";
import { THEME } from "@/src/features/radio/constants/station";

export type MainLayoutProps = {
  /** Contenido principal a renderizar. */
  children: React.ReactNode;
  /** Determina si el contenido debe ser desplazable. */
  scrollable?: boolean;
  /** Estilos extra para el contenedor. */
  contentStyle?: ViewStyle;
};

export default function MainLayout({ children, scrollable = false, contentStyle }: MainLayoutProps) {
  /**
   * Centralizamos el gradiente y el encabezado para reutilizar el layout
   * en todas las pantallas de la aplicación.
   */
  if (scrollable) {
    return (
      <LinearGradient colors={THEME.gradient as [string, string, ...string[]]} style={styles.gradient}>
        <AppHeader />
        <ScrollView contentContainerStyle={[styles.content, contentStyle]}>{children}</ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={THEME.gradient as [string, string, ...string[]]} style={styles.gradient}>
      <AppHeader />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  content: {
    paddingBottom: 32
  }
});
