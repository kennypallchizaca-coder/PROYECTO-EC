import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { STATION } from "@/src/features/radio/constants/station";

/**
 * Bloque informativo acerca de la identidad de la emisora.
 */
export default function StationAbout() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de {STATION.name}</Text>
      <Text style={styles.body}>
        Somos una emisora comunitaria que impulsa la cultura ecuatoriana con noticias,
        música y espacios de participación ciudadana. Nuestra señal acompaña tus días con
        contenidos frescos y relevantes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.22)",
    borderColor: "#ffffff1a",
    borderWidth: 1,
    rowGap: 8
  },
  title: {
    color: "#f8fafc",
    fontWeight: "700"
  },
  body: {
    color: "#cbd5e1",
    lineHeight: 20
  }
});
