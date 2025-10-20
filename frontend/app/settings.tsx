import React from "react";
import GradientBackground from "@/src/components/shared/GradientBackground";
import Header from "@/src/components/layout/Header";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/src/store/themeStore";

export default function SettingsScreen() {
  const { mode, setMode } = useThemeStore();
  return (
    <GradientBackground>
      <Header />
      <View style={{ padding: 18 }}>
        <Text style={styles.title}>Apariencia</Text>
        <Row title="Tema del sistema" active={mode === "system"} onPress={() => setMode("system")} icon="phone-portrait-outline" />
        <Row title="Modo claro" active={mode === "light"} onPress={() => setMode("light")} icon="sunny-outline" />
        <Row title="Modo oscuro" active={mode === "dark"} onPress={() => setMode("dark")} icon="moon-outline" />
      </View>
    </GradientBackground>
  );
}

function Row({ title, icon, active, onPress }: { title: string; icon: any; active?: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.row, active && styles.rowActive]} android_ripple={{ color: "#ffffff22" }}>
      <Ionicons name={icon} size={20} color="#fff" />
      <Text style={styles.rowText}>{title}</Text>
      {active && <Ionicons name="checkmark-circle" size={18} color="#22d3ee" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: { color: "#fff", fontWeight: "800", fontSize: 18, marginBottom: 10 },
  row: {
    backgroundColor: "#ffffff12",
    borderColor: "#ffffff1a",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  rowActive: { borderColor: "#22d3ee" },
  rowText: { flex: 1, color: "#e2e8f0", marginLeft: 12 }
});

