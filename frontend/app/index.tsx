import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import GradientBackground from "@/src/components/shared/GradientBackground";
import Header from "@/src/components/layout/Header";
import PlayerCard from "@/src/components/shared/PlayerCard";
import { THEME, STATION } from "@/src/constants/config";

export default function HomeScreen() {
  return (
    <GradientBackground>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <PlayerCard />
        <View style={styles.about}>
          <Text style={styles.aboutTitle}>Acerca de {STATION.name}</Text>
          <Text style={styles.aboutText}>
            Somos una emisora comunitaria desde Ecuador. Música, noticias y
            cultura con una identidad fresca y cercana. ¡Sintoniza y comparte!
          </Text>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32
  },
  about: {
    marginTop: 8,
    marginHorizontal: 18,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.22)",
    borderColor: "#ffffff1a",
    borderWidth: 1
  },
  aboutTitle: { color: THEME.textPrimary, fontWeight: "700", marginBottom: 6 },
  aboutText: { color: THEME.textSecondary, lineHeight: 20 }
});

