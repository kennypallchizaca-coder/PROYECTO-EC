import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { STATION } from "@/src/constants/config";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <Ionicons name="radio-outline" size={28} color="#fff" />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.title}>{STATION.name}</Text>
        <Text style={styles.tagline}>{STATION.tagline}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 54,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderBottomColor: "rgba(255,255,255,0.08)",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.4
  },
  tagline: { color: "#e2e8f0", marginTop: 2, fontSize: 12 }
});

