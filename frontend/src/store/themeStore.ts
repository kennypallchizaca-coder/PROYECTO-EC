import { create } from "zustand";

type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: "system",
  setMode: (mode) => set({ mode })
}));

