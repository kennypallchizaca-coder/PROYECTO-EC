import React from "react";
import GradientBackground from "@/src/components/shared/GradientBackground";
import Header from "@/src/components/layout/Header";
import { View, Text, StyleSheet, Linking, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { STATION } from "@/src/constants/config";

export default function ContactScreen() {
  return (
    <GradientBackground>
      <Header />
      <View style={{ padding: 18 }}>
        <Text style={styles.title}>Contáctanos</Text>
        <Item icon="call-outline" label={STATION.phone} onPress={() => Linking.openURL(`tel:${STATION.phone}`)} />
        <Item icon="mail-outline" label={STATION.email} onPress={() => Linking.openURL(`mailto:${STATION.email}`)} />
        <Item icon="logo-whatsapp" label={STATION.whatsapp} onPress={() => Linking.openURL(`https://wa.me/${STATION.whatsapp.replace(/[^\d]/g, "")}`)} />
        <Item icon="globe-outline" label={STATION.website} onPress={() => Linking.openURL(STATION.website)} />
      </View>
    </GradientBackground>
  );
}

function Item({ icon, label, onPress }: { icon: any; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.item} android_ripple={{ color: "#ffffff22" }}>
      <Ionicons name={icon} size={20} color="#fff" />
      <Text style={styles.itemText}>{label}</Text>
      <Ionicons name="open-outline" size={18} color="#a5b4fc" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: { color: "#fff", fontWeight: "800", fontSize: 18, marginBottom: 10 },
  item: {
    backgroundColor: "#ffffff12",
    borderColor: "#ffffff1a",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemText: { flex: 1, color: "#e2e8f0", marginLeft: 12, marginRight: 10 }
});

