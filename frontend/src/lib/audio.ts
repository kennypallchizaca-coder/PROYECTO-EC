import { Audio } from "expo-av";

export async function configureAudio() {
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID.DUCK_OTHERS,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS
  });
}

export type PlayerStatus = {
  isBuffering: boolean;
  isPlaying: boolean;
  durationMillis?: number | null;
  positionMillis?: number | null;
};

