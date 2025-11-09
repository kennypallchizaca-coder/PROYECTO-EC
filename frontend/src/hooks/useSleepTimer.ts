import { useEffect, useRef, useState } from "react";
import { useUserPreferences } from "@/src/contexts/UserContext/UserContext";
import { usePlayer } from "@/src/store/playerStore";

/**
 * Gestiona un temporizador de reposo sincronizado con el reproductor.
 */
export function useSleepTimer() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { pause } = usePlayer.getState();
  const { defaultTimerMinutes } = useUserPreferences();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  /**
   * Inicia el temporizador utilizando el valor preferido por el usuario si no se proporciona.
   */
  function start(minutes = defaultTimerMinutes) {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    const endAt = Date.now() + minutes * 60 * 1000;
    timeoutRef.current = setInterval(() => {
      const diff = Math.max(0, endAt - Date.now());
      setRemaining(diff);
      if (diff <= 0) {
        clearInterval(timeoutRef.current!);
        timeoutRef.current = null;
        pause();
        setRemaining(null);
      }
    }, 500);
  }

  function cancel() {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    timeoutRef.current = null;
    setRemaining(null);
  }

  return {
    start,
    cancel,
    remaining
  };
}

