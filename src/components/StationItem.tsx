import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { usePlayer } from '../context/PlayerContext';
import { Station } from '../services/radioAPI';
import { formatBitrate } from '../utils/formatTime';

type StationItemProps = {
  station: Station;
  onPress: () => void;
  isActive?: boolean;
};

export const StationItem: React.FC<StationItemProps> = ({ station, onPress, isActive = false }) => {
  const { theme } = usePlayer();

  // La tarjeta se compone de una miniatura con gradiente y la información textual.
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Escuchar ${station.name}`}
      accessibilityHint="Abre el reproductor para esta emisora"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: isActive ? theme.colors.primary : theme.colors.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <ImageBackground
        source={{ uri: station.image }}
        style={styles.thumbnail}
        imageStyle={styles.thumbnailImage}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      >
        <LinearGradient
          colors={['rgba(15, 23, 42, 0.4)', 'rgba(15, 23, 42, 0.75)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.thumbnailOverlay}
        />
      </ImageBackground>
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{station.name}</Text>
          {isActive && <Text style={[styles.badge, { backgroundColor: theme.colors.primary, color: theme.colors.onPrimary }]}>LIVE</Text>}
        </View>
        <Text style={[styles.meta, { color: theme.colors.muted }]}>{`${station.genre} · ${station.country}`}</Text>
        <Text style={[styles.description, { color: theme.colors.text }]} numberOfLines={2}>
          {station.description}
        </Text>
        <Text style={[styles.meta, { color: theme.colors.muted }]}>{`Calidad: ${formatBitrate(station.bitrateKbps)}`}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    padding: 12,
    gap: 12,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 16,
    overflow: 'hidden',
  },
  thumbnailImage: {
    borderRadius: 16,
  },
  thumbnailOverlay: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  meta: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  badge: {
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
    marginLeft: 8,
  },
});

export default StationItem;
