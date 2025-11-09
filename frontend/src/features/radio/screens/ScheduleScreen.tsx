import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainLayout from "@/src/features/radio/components/MainLayout/MainLayout";
import ScheduleList from "@/src/features/radio/components/ScheduleList/ScheduleList";

/**
 * Página que presenta la programación semanal con contexto editorial.
 */
export default function ScheduleScreen() {
  return (
    <MainLayout scrollable contentStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Programación semanal</Text>
        <Text style={styles.subtitle}>
          Descubre los programas destacados y prepara tu día con nosotros.
        </Text>
      </View>
      <ScheduleList />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16
  },
  header: {
    marginHorizontal: 2,
    marginTop: 16,
    marginBottom: 12
  },
  title: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8
  },
  subtitle: {
    color: "#cbd5e1",
    lineHeight: 20
  }
});
