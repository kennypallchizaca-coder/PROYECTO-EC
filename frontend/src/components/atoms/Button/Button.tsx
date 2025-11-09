import React, { useMemo } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  /** Etiqueta a mostrar dentro del botón. */
  label: string;
  /** Nombre del icono Ionicons a renderizar opcionalmente. */
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  /** Determina si se muestra un indicador de carga. */
  isLoading?: boolean;
  /** Variante visual del botón. */
  variant?: ButtonVariant;
  /** Acción a ejecutar al presionar el botón. */
  onPress?: () => void;
  /** Estilos adicionales para el contenedor principal. */
  style?: ViewStyle;
  /** Texto accesible para tecnologías de asistencia. */
  accessibilityLabel?: string;
};

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: "#22d3ee" },
  secondary: { backgroundColor: "rgba(255,255,255,0.12)" },
  ghost: { backgroundColor: "transparent" }
};

export function Button({
  label,
  iconName,
  isLoading = false,
  variant = "primary",
  onPress,
  style,
  accessibilityLabel
}: ButtonProps) {
  /** Calculamos estilos combinados para mejorar el rendimiento del renderizado. */
  const containerStyle = useMemo(
    () => [styles.base, variantStyles[variant], style],
    [variant, style]
  );

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      disabled={isLoading}
      onPress={onPress}
      style={containerStyle}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === "primary" ? "#0f172a" : "#fff"} />
      ) : (
        <View style={styles.content}>
          {iconName && <Ionicons name={iconName} size={18} color={variant === "primary" ? "#0f172a" : "#fff"} />}
          <Text style={[styles.label, variant === "primary" ? styles.labelDark : styles.labelLight]}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 9999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 8
  },
  label: {
    fontWeight: "600",
    letterSpacing: 0.3
  },
  labelLight: {
    color: "#f8fafc"
  },
  labelDark: {
    color: "#0f172a"
  }
});

export default Button;
