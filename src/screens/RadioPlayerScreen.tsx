import React, { useCallback } from 'react';
import { ImageBackground, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import IconButton from '../components/IconButton';
import PlayerControls from '../components/PlayerControls';
import { usePlayer } from '../context/PlayerContext';
import { formatBitrate, formatTime } from '../utils/formatTime';

export const RadioPlayerScreen: React.FC = () => {
  const { currentStation, theme, togglePlayPause, stop, isPlaying, isLoading, playbackDuration, playbackPosition, clearStation } =
    usePlayer();

  const handleOpenWebsite = useCallback(async () => {
    if (currentStation?.website) {
      await Linking.openURL(currentStation.website);
    }
  }, [currentStation?.website]);

  if (!currentStation) {
    return (
      <View style={[styles.emptyStateContainer, { backgroundColor: theme.colors.background }]}> 
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>Selecciona una emisora</Text>
        <Text style={[styles.emptyDescription, { color: theme.colors.muted }]}>Desde la pantalla de inicio podrás elegir qué escuchar.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }} contentContainerStyle={styles.container}>
      <View style={styles.heroWrapper}>
        <ImageBackground
          source={typeof currentStation.image === 'string' ? { uri: currentStation.image } : currentStation.image}
          style={styles.heroImage}
          imageStyle={styles.heroImageStyle}
          accessibilityIgnoresInvertColors
        >
          <LinearGradient
            colors={['rgba(15,23,42,0.1)', 'rgba(15,23,42,0.8)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.heroOverlay}
          >
            <View style={styles.badgesRow}>
              <Text style={[styles.heroBadge, { color: theme.colors.onPrimary, backgroundColor: theme.colors.primary }]}>EN VIVO</Text>
              {currentStation.bitrateKbps && currentStation.bitrateKbps >= 192 ? (
                <Text style={[styles.heroBadge, { color: theme.colors.onPrimary, backgroundColor: '#64748b' }]}>HD</Text>
              ) : null}
            </View>
            <Text style={[styles.heroTitle, { color: theme.colors.onPrimary }]}>{currentStation.name}</Text>
            <Text style={[styles.heroMeta, { color: theme.colors.onPrimary }]}>
              {`${currentStation.genre} · ${currentStation.country}`}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.description, { color: theme.colors.text }]}>{currentStation.description}</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.meta, { color: theme.colors.muted }]}>{`Bitrate: ${formatBitrate(currentStation.bitrateKbps)}`}</Text>
          <Text style={[styles.meta, { color: theme.colors.muted }]}>{`Duración total: ${formatTime(playbackDuration)}`}</Text>
        </View>
        <View style={styles.chipRow}>
          {currentStation.website && (
            <IconButton icon="globe" label="Abrir sitio web" onPress={handleOpenWebsite} variant="ghost" />
          )}
          <IconButton
            icon="refresh"
            label="Detener y limpiar"
            onPress={() => {
              void clearStation();
            }}
            variant="ghost"
          />
        </View>
        <PlayerControls onPlayPause={togglePlayPause} onStop={stop} />
        <Text style={[styles.playbackStatus, { color: theme.colors.muted }]}>
          {isLoading ? 'Conectando...' : isPlaying ? 'Reproduciendo' : 'En pausa'} · {formatTime(playbackPosition)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 24,
  },
  heroWrapper: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  heroImage: {
    height: 260,
    justifyContent: 'flex-end',
  },
  heroImageStyle: {
    borderRadius: 32,
  },
  heroOverlay: {
    padding: 24,
    gap: 8,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
  },
  heroMeta: {
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  card: {
    borderRadius: 32,
    borderWidth: 1,
    padding: 24,
    gap: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  meta: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  playbackStatus: {
    textAlign: 'center',
    fontSize: 13,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  emptyDescription: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default RadioPlayerScreen;
