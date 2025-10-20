import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: React.ComponentProps<typeof Ionicons>["name"];
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function IconButton({ name, size = 24, color = "#fff", onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.btn, style]}
      android_ripple={{ color: "rgba(255,255,255,0.15)", borderless: true }}>
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 12,
    borderRadius: 9999,
    backgroundColor: "rgba(255,255,255,0.08)"
  }
});

