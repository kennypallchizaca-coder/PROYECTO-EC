import { create } from "zustand";

type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
};

/**
 * Mantiene la preferencia de tema seleccionada por el usuario.
 */
export const useThemeStore = create<ThemeState>((set) => ({
  mode: "system",
  setMode: (mode) => set({ mode })
}));

