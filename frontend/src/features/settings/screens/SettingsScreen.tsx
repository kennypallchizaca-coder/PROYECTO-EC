import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainLayout from "@/src/features/radio/components/MainLayout/MainLayout";
import ActionRow from "@/src/components/ui/ActionRow";
import Button from "@/src/components/ui/Button";
import { useThemeStore } from "@/src/features/settings/state/themeStore";
import { useUserPreferences } from "@/src/features/settings/context/UserPreferencesContext";

const TIMER_OPTIONS = [15, 30, 45];

export default function SettingsScreen() {
  const { mode, setMode } = useThemeStore();
  const { autoPlay, toggleAutoPlay, defaultTimerMinutes, setDefaultTimerMinutes } = useUserPreferences();

  return (
    <MainLayout contentStyle={styles.content}>
      {/* Preferencias visuales del usuario. */}
      <View style={styles.section}>
        <Text style={styles.title}>Apariencia</Text>
        <ActionRow
          icon="phone-portrait-outline"
          title="Seguir tema del sistema"
          active={mode === "system"}
          onPress={() => setMode("system")}
        />
        <ActionRow icon="sunny-outline" title="Modo claro" active={mode === "light"} onPress={() => setMode("light")} />
        <ActionRow icon="moon-outline" title="Modo oscuro" active={mode === "dark"} onPress={() => setMode("dark")} />
      </View>

      <View style={styles.section}>
        {/* Opciones relacionadas al comportamiento del reproductor. */}
        <Text style={styles.title}>Reproducción</Text>
        <ActionRow
          icon="play-outline"
          title="Autoreproducir al abrir"
          subtitle={autoPlay ? "Activado" : "Desactivado"}
          active={autoPlay}
          onPress={toggleAutoPlay}
        />
        <Text style={styles.subtitle}>Duración predeterminada del temporizador</Text>
        <View style={styles.timerRow}>
          {TIMER_OPTIONS.map((minutes) => (
            <Button
              key={minutes}
              label={`${minutes} min`}
              variant={minutes === defaultTimerMinutes ? "primary" : "secondary"}
              onPress={() => setDefaultTimerMinutes(minutes)}
            />
          ))}
        </View>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 24
  },
  section: {
    marginBottom: 24
  },
  title: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12
  },
  subtitle: {
    color: "#cbd5e1",
    marginBottom: 12,
    marginTop: 4
  },
  timerRow: {
    flexDirection: "row",
    columnGap: 12
  }
});
