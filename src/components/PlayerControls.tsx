import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../utils/formatTime';
import IconButton from './IconButton';

type PlayerControlsProps = {
  onPlayPause: () => Promise<void>;
  onStop: () => Promise<void>;
};

export const PlayerControls: React.FC<PlayerControlsProps> = ({ onPlayPause, onStop }) => {
  const { theme, isPlaying, playbackDuration, playbackPosition, volume, changeVolume } = usePlayer();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.timeWrapper}>
        <Text style={[styles.timeText, { color: theme.colors.text }]}>{formatTime(playbackPosition)}</Text>
        <Text style={[styles.timeText, { color: theme.colors.muted }]}>/</Text>
        <Text style={[styles.timeText, { color: theme.colors.text }]}>{formatTime(playbackDuration)}</Text>
      </View>
      <View style={styles.controlsRow}>
        <IconButton size={68} icon={isPlaying ? 'pause' : 'play'} label={isPlaying ? 'Pausar reproducción' : 'Reproducir emisora'} onPress={onPlayPause} />
        <IconButton icon="stop" label="Detener reproducción" onPress={onStop} variant="ghost" />
      </View>
      <View accessibilityRole="adjustable" style={styles.sliderWrapper}>
        <Text style={[styles.sectionLabel, { color: theme.colors.muted }]}>Volumen</Text>
        <Slider
          accessibilityLabel="Control de volumen"
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={(value) => {
            void changeVolume(value);
          }}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.muted}
          thumbTintColor={theme.colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    gap: 16,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderWrapper: {
    width: '100%',
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  timeText: {
    fontVariant: ['tabular-nums'],
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
});

export default PlayerControls;
