import { useCallback, useEffect, useRef, useState } from 'react';
import { Audio, AVPlaybackStatus, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

// Estado base cuando aún no se ha cargado ningún stream.
const DEFAULT_STATE = {
  positionMillis: 0,
  durationMillis: 0,
  isPlaying: false,
  isBuffering: false,
};

type PlaybackSnapshot = typeof DEFAULT_STATE;

type UseAudioPlayerReturn = {
  playback: PlaybackSnapshot;
  loadStream: (streamUrl: string, volume: number) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  unload: () => Promise<void>;
};

export const useAudioPlayer = (): UseAudioPlayerReturn => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playback, setPlayback] = useState<PlaybackSnapshot>(DEFAULT_STATE);

  // Cada actualización del objeto Audio.Sound llega aquí.
  const handleStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      setPlayback(DEFAULT_STATE);
      return;
    }

    setPlayback({
      positionMillis: status.positionMillis ?? 0,
      durationMillis: status.durationMillis ?? 0,
      isPlaying: status.isPlaying,
      isBuffering: status.isBuffering,
    });
  }, []);

  // Ajustamos el modo de audio para permitir reproducción en background.
  const configureAudio = useCallback(async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  // Descarga y limpia cualquier stream previo.
  const unload = useCallback(async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
      } catch (error) {
        // Stop may throw if the sound is already stopped; ignore.
      }

      await soundRef.current.unloadAsync();
      soundRef.current.setOnPlaybackStatusUpdate(null);
      soundRef.current = null;
      setPlayback(DEFAULT_STATE);
    }
  }, []);

  // Carga un nuevo stream y asigna el callback de estado.
  const loadStream = useCallback(
    async (streamUrl: string, volume: number) => {
      await configureAudio();
      await unload();

      const { sound } = await Audio.Sound.createAsync(
        { uri: streamUrl },
        {
          shouldPlay: false,
          progressUpdateIntervalMillis: 500,
          volume,
        },
        handleStatusUpdate,
      );

      soundRef.current = sound;
    },
    [configureAudio, handleStatusUpdate, unload],
  );

  const play = useCallback(async () => {
    await soundRef.current?.playAsync();
  }, []);

  const pause = useCallback(async () => {
    await soundRef.current?.pauseAsync();
  }, []);

  const stop = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.setPositionAsync(0);
    }
  }, []);

  const setVolume = useCallback(async (volume: number) => {
    await soundRef.current?.setStatusAsync({ volume });
  }, []);

  useEffect(() => {
    return () => {
      unload();
    };
  }, [unload]);

  return {
    playback,
    loadStream,
    play,
    pause,
    stop,
    setVolume,
    unload,
  };
};
