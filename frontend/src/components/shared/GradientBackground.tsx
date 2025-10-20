import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { THEME } from "@/src/constants/config";
import { StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
};

export default function GradientBackground({ children }: Props) {
  return (
    <LinearGradient colors={THEME.gradient} style={styles.container}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

