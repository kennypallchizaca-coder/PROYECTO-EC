import React from "react";
import GradientBackground from "@/src/components/shared/GradientBackground";
import Header from "@/src/components/layout/Header";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ScheduleList from "@/src/features/schedule/ScheduleList";

export default function ScheduleScreen() {
  return (
    <GradientBackground>
      <Header />
      <ScrollView>
        <View style={styles.headerWrap}>
          <Text style={styles.headerTitle}>Programación semanal</Text>
          <Text style={styles.headerSubtitle}>Conecta con tus shows favoritos</Text>
        </View>
        <ScheduleList />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  headerWrap: { marginTop: 16, marginHorizontal: 16 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  headerSubtitle: { color: "#cbd5e1", marginTop: 4 }
});

