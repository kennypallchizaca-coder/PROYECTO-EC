import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

/**
 * Configura el modo de audio global para habilitar reproducción en segundo plano.
 */
export async function configureAudio() {
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
    interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
    interruptionModeIOS: InterruptionModeIOS.DuckOthers
  });
}

export type PlayerStatus = {
  isBuffering: boolean;
  isPlaying: boolean;
  durationMillis?: number | null;
  positionMillis?: number | null;
};
