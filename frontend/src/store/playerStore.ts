import { create } from "zustand";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import { configureAudio } from "@/src/lib/audio";
import { STATION } from "@/src/constants/config";

type PlayerState = {
  sound: Audio.Sound | null;
  status: AVPlaybackStatusSuccess | null;
  isReady: boolean;
  error?: string | null;
  init: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  toggle: () => Promise<void>;
  setStatus: (s: AVPlaybackStatusSuccess) => void;
};

export const usePlayer = create<PlayerState>((set, get) => ({
  sound: null,
  status: null,
  isReady: false,
  error: null,
  setStatus: (s) => set({ status: s }),
  init: async () => {
    try {
      if (get().sound) return;
      await configureAudio();
      const sound = new Audio.Sound();
      sound.setOnPlaybackStatusUpdate((st) => {
        if (!st.isLoaded) return;
        set({ status: st });
      });
      await sound.loadAsync(
        { uri: STATION.streamUrl },
        { shouldPlay: false, progressUpdateIntervalMillis: 500 }
      );
      set({ sound, isReady: true });
    } catch (e: any) {
      set({ error: e?.message ?? String(e) });
    }
  },
  play: async () => {
    const s = get().sound;
    if (!s) await get().init();
    await get().sound?.playAsync();
  },
  pause: async () => {
    await get().sound?.pauseAsync();
  },
  stop: async () => {
    await get().sound?.stopAsync();
  },
  toggle: async () => {
    const st = get().status;
    if (!st || !st.isPlaying) {
      await get().play();
    } else {
      await get().pause();
    }
  }
}));

