import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { usePlayer } from '../context/PlayerContext';

type IconButtonProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'ghost';
  style?: ViewStyle;
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
}) => {
  const { theme } = usePlayer();

  // Calculamos colores dependiendo de si es el botón principal o uno secundario tipo ghost.
  const backgroundColor =
    variant === 'primary' ? theme.colors.primary : theme.mode === 'dark' ? 'transparent' : theme.colors.card;
  const iconColor = variant === 'primary' ? theme.colors.onPrimary : theme.colors.primary;
  const borderColor = variant === 'primary' ? theme.colors.primary : theme.colors.border;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => {
        void onPress();
      }}
      style={[styles.base, { backgroundColor, borderColor, borderWidth: variant === 'ghost' ? 1 : 0 }, style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} />
      ) : (
        <Ionicons name={icon} size={24} color={disabled ? theme.colors.muted : iconColor} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});

export default IconButton;
