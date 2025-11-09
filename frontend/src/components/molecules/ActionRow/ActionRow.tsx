import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ActionRowProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle?: string;
  trailingIcon?: React.ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
  active?: boolean;
  style?: ViewStyle;
};

/**
 * Fila interactiva reutilizable para mostrar acciones o ajustes dentro de la app.
 */
export default function ActionRow({ icon, title, subtitle, trailingIcon, onPress, active = false, style }: ActionRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, active && styles.active, style]}
      android_ripple={{ color: "#ffffff22" }}
    >
      <Ionicons name={icon} size={20} color="#fff" />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {trailingIcon && <Ionicons name={trailingIcon} size={18} color="#22d3ee" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "#ffffff12",
    borderColor: "#ffffff1a",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12
  },
  active: {
    borderColor: "#22d3ee"
  },
  title: {
    color: "#e2e8f0",
    flex: 1,
    fontWeight: "600"
  },
  subtitle: {
    color: "#94a3b8"
  }
});
