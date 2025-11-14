import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Station, getStationById } from '../services/radioAPI';
import { AppTheme, ThemeMode, buildTheme } from '../styles/theme';

// Clave única para persistir preferencias y última emisora escuchada.
const PREFERENCES_KEY = '@radiosisid/preferences';
const DEFAULT_STATION_ID = 'radio-sisid-ecuador';

type StoredPreferences = {
  themeMode?: ThemeMode;
  autoPlay?: boolean;
  volume?: number;
  lastStationId?: string | null;
};

type PlayerContextValue = {
  currentStation: Station | null;
  isLoading: boolean;
  isPlaying: boolean;
  volume: number;
  playbackPosition: number;
  playbackDuration: number;
  theme: AppTheme;
  themeMode: ThemeMode;
  autoPlay: boolean;
  selectStation: (station: Station) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  stop: () => Promise<void>;
  changeVolume: (volume: number) => Promise<void>;
  toggleTheme: () => void;
  toggleAutoPlay: () => void;
  clearStation: () => Promise<void>;
};

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { playback, loadStream, play, pause, stop, setVolume, unload } = useAudioPlayer();
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [autoPlay, setAutoPlay] = useState(true);
  const [volume, setVolumeState] = useState(0.8);
  const [hydrated, setHydrated] = useState(false);

  // Propagamos el volumen al reproductor nativo.
  useEffect(() => {
    void setVolume(volume);
  }, [setVolume, volume]);

  // Hidratamos el contexto leyendo preferencias guardadas en disco.
  useEffect(() => {
    const restore = async () => {
      try {
        const savedRaw = await AsyncStorage.getItem(PREFERENCES_KEY);
        const saved: StoredPreferences = savedRaw ? (JSON.parse(savedRaw) as StoredPreferences) : {};

        if (saved.themeMode === 'dark' || saved.themeMode === 'light') setThemeMode(saved.themeMode);
        if (typeof saved.autoPlay === 'boolean') setAutoPlay(saved.autoPlay);
        if (typeof saved.volume === 'number') setVolumeState(saved.volume);

        const hasStoredStation = Object.prototype.hasOwnProperty.call(saved, 'lastStationId');
        const targetId = hasStoredStation ? saved.lastStationId : DEFAULT_STATION_ID;
        if (targetId) {
          const station = await getStationById(targetId);
          if (station) {
            setCurrentStation(station);
            await loadStream(station.streamUrl, saved.volume ?? volume);
            if (saved.autoPlay) {
              await play();
            }
          }
        }
      } catch (error) {
        console.warn('No se pudo restaurar el estado del reproductor', error);
      } finally {
        setHydrated(true);
      }
    };

    restore();
  }, [loadStream, volume, play]);

  // Persistimos cualquier cambio relevante en tema, autoplay, volumen o emisora.
  const persistPreferences = useCallback(async () => {
    if (!hydrated) return;

    try {
      await AsyncStorage.setItem(
        PREFERENCES_KEY,
        JSON.stringify({
          themeMode,
          autoPlay,
          volume,
          lastStationId: currentStation ? currentStation.id : null,
        }),
      );
    } catch (error) {
      console.warn('No se pudo guardar la configuración del reproductor', error);
    }
  }, [autoPlay, currentStation, hydrated, themeMode, volume]);

  useEffect(() => {
    persistPreferences();
  }, [persistPreferences]);

  // Carga la emisora seleccionada y la reproduce automáticamente si la preferencia está activa.
  const selectStation = useCallback(
    async (station: Station) => {
      setIsLoading(true);
      try {
        setCurrentStation(station);
        await loadStream(station.streamUrl, volume);
        if (autoPlay) {
          await play();
        }
      } catch (error) {
        console.warn('No se pudo iniciar la reproducción de la emisora seleccionada', error);
        setCurrentStation(null);
      } finally {
        setIsLoading(false);
      }
    },
    [autoPlay, loadStream, play, volume],
  );

  const togglePlayPause = useCallback(async () => {
    if (!currentStation) return;
    if (playback.isPlaying) {
      await pause();
      return;
    }
    if (!playback.isPlaying) {
      await play();
    }
  }, [currentStation, pause, play, playback.isPlaying]);

  const changeVolume = useCallback(
    async (newVolume: number) => {
      const normalized = Math.min(1, Math.max(0, newVolume));
      setVolumeState(normalized);
      await setVolume(normalized);
    },
    [setVolume],
  );

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setAutoPlay((prev) => !prev);
  }, []);

  const clearStation = useCallback(async () => {
    await unload();
    setCurrentStation(null);
  }, [unload]);

  const value = useMemo<PlayerContextValue>(
    () => ({
      currentStation,
      isLoading,
      isPlaying: playback.isPlaying,
      volume,
      playbackPosition: playback.positionMillis,
      playbackDuration: playback.durationMillis,
      theme: buildTheme(themeMode),
      themeMode,
      autoPlay,
      selectStation,
      togglePlayPause,
      stop,
      changeVolume,
      toggleTheme,
      toggleAutoPlay,
      clearStation,
    }),
    [
      autoPlay,
      changeVolume,
      clearStation,
      currentStation,
      isLoading,
      playback.durationMillis,
      playback.isPlaying,
      playback.positionMillis,
      selectStation,
      stop,
      themeMode,
      toggleAutoPlay,
      togglePlayPause,
      toggleTheme,
      volume,
    ],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer debe utilizarse dentro de un PlayerProvider');
  }
  return context;
};
