import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { STATION } from "@/src/features/radio/constants/station";
import { useUserPreferences } from "@/src/features/settings/context/UserPreferencesContext";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";

export default function AppHeader() {
  const { displayName } = useUserPreferences();
  const isLarge = useMediaQuery("md");

  /**
   * Mostramos un saludo dinámico para reforzar la identidad de la emisora
   * y personalizar la experiencia del usuario.
   */
  const greeting = displayName ? `Hola, ${displayName}` : "Bienvenido";

  return (
    <View style={[styles.container, isLarge && styles.containerLarge]}>
      <View style={styles.titleGroup}>
        <Ionicons name="radio-outline" size={28} color="#fff" />
        <View style={styles.info}>
          <Text style={styles.title}>{STATION.name}</Text>
          <Text style={styles.tagline}>{STATION.tagline}</Text>
        </View>
      </View>
      <Text style={[styles.greeting, isLarge && styles.greetingLarge]}>{greeting}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 54,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderBottomColor: "rgba(255,255,255,0.08)",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  containerLarge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center"
  },
  info: {
    marginLeft: 12
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.4
  },
  tagline: {
    color: "#e2e8f0",
    marginTop: 2,
    fontSize: 12
  },
  greeting: {
    color: "#cbd5e1",
    fontWeight: "600",
    marginTop: 14
  },
  greetingLarge: {
    marginTop: 0
  }
});
