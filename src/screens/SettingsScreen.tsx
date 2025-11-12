import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

import { usePlayer } from '../context/PlayerContext';

export const SettingsScreen: React.FC = () => {
  const { theme, themeMode, toggleTheme, autoPlay, toggleAutoPlay, volume, changeVolume } = usePlayer();

  // Guardamos el cambio de tema en AsyncStorage a través del contexto.
  const handleThemeToggle = useCallback(() => {
    void toggleTheme();
  }, [toggleTheme]);

  const handleAutoPlayToggle = useCallback(() => {
    void toggleAutoPlay();
  }, [toggleAutoPlay]);

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }} contentContainerStyle={styles.container}>
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
        <Text style={[styles.title, { color: theme.colors.text }]}>Apariencia</Text>
        <View style={styles.row}>
          <View style={styles.rowContent}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Tema oscuro</Text>
            <Text style={[styles.helper, { color: theme.colors.muted }]}>Adapta la interfaz a ambientes con poca luz.</Text>
          </View>
          <Switch
            accessibilityLabel="Activar modo oscuro"
            value={themeMode === 'dark'}
            onValueChange={handleThemeToggle}
            trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
            thumbColor={theme.colors.onPrimary}
          />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
        <Text style={[styles.title, { color: theme.colors.text }]}>Reproducción</Text>
        <View style={styles.row}>
          <View style={styles.rowContent}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Autoplay</Text>
            <Text style={[styles.helper, { color: theme.colors.muted }]}>Comienza la reproducción al seleccionar una emisora.</Text>
          </View>
          <Switch
            accessibilityLabel="Activar reproducción automática"
            value={autoPlay}
            onValueChange={handleAutoPlayToggle}
            trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
            thumbColor={theme.colors.onPrimary}
          />
        </View>
        <View style={styles.sliderSection}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Volumen por defecto</Text>
          <Slider
            accessibilityLabel="Ajustar volumen por defecto"
            minimumValue={0}
            maximumValue={1}
            value={volume}
            step={0.05}
            onValueChange={(value) => {
              void changeVolume(value);
            }}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.muted}
            thumbTintColor={theme.colors.primary}
          />
          <Text style={[styles.helper, { color: theme.colors.muted }]}>{`Nivel actual: ${Math.round(volume * 100)}%`}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
  },
  card: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContent: {
    flex: 1,
    paddingRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  helper: {
    fontSize: 14,
  },
  sliderSection: {
    gap: 8,
  },
});

export default SettingsScreen;
