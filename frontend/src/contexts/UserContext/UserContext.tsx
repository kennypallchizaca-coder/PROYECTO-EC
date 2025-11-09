import React, { createContext, useContext, useMemo, useState } from "react";

export type UserPreferences = {
  displayName: string | null;
  autoPlay: boolean;
  defaultTimerMinutes: number;
  setDisplayName: (name: string | null) => void;
  toggleAutoPlay: () => void;
  setDefaultTimerMinutes: (minutes: number) => void;
};

const defaultValue: UserPreferences = {
  displayName: null,
  autoPlay: false,
  defaultTimerMinutes: 30,
  setDisplayName: () => undefined,
  toggleAutoPlay: () => undefined,
  setDefaultTimerMinutes: () => undefined
};

/**
 * Contexto centralizado para las preferencias personalizables del oyente.
 */
const UserContext = createContext<UserPreferences>(defaultValue);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [defaultTimerMinutes, setDefaultTimerMinutes] = useState(30);

  /**
   * Memoizamos las funciones para evitar renders innecesarios en los consumidores.
   */
  const value = useMemo<UserPreferences>(() => ({
    displayName,
    autoPlay,
    defaultTimerMinutes,
    setDisplayName,
    toggleAutoPlay: () => setAutoPlay((prev) => !prev),
    setDefaultTimerMinutes
  }), [displayName, autoPlay, defaultTimerMinutes]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserPreferences() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserPreferences debe utilizarse dentro de un UserProvider");
  }
  return context;
}
