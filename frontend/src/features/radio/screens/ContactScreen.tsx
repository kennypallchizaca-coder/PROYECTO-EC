import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import MainLayout from "@/src/features/radio/components/MainLayout/MainLayout";
import ActionRow from "@/src/components/ui/ActionRow";
import { STATION } from "@/src/features/radio/constants/station";

export default function ContactScreen() {
  return (
    <MainLayout contentStyle={styles.content}>
      {/* Sección editorial con el contexto del canal de contacto. */}
      <View style={styles.header}>
        <Text style={styles.title}>Contáctanos</Text>
        <Text style={styles.subtitle}>
          Estamos disponibles en todos nuestros canales para escuchar tus sugerencias.
        </Text>
      </View>
      <ActionRow
        icon="call-outline"
        title={STATION.phone}
        trailingIcon="open-outline"
        onPress={() => Linking.openURL(`tel:${STATION.phone}`)}
      />
      <ActionRow
        icon="mail-outline"
        title={STATION.email}
        trailingIcon="open-outline"
        onPress={() => Linking.openURL(`mailto:${STATION.email}`)}
      />
      <ActionRow
        icon="logo-whatsapp"
        title={STATION.whatsapp}
        trailingIcon="open-outline"
        onPress={() => Linking.openURL(`https://wa.me/${STATION.whatsapp.replace(/[^\d]/g, "")}`)}
      />
      <ActionRow
        icon="globe-outline"
        title={STATION.website}
        trailingIcon="open-outline"
        onPress={() => Linking.openURL(STATION.website)}
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 24
  },
  header: {
    marginBottom: 16,
    rowGap: 6
  },
  title: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "800"
  },
  subtitle: {
    color: "#cbd5e1",
    lineHeight: 20
  }
});
