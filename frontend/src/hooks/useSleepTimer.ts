import { useEffect, useRef, useState } from "react";
import { usePlayer } from "@/src/store/playerStore";

export function useSleepTimer() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { pause } = usePlayer.getState();

  useEffect(() => () => timeoutRef.current && clearInterval(timeoutRef.current), []);

  function start(minutes: number) {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    const endAt = Date.now() + minutes * 60 * 1000;
    timeoutRef.current = setInterval(() => {
      const diff = Math.max(0, endAt - Date.now());
      setRemaining(diff);
      if (diff <= 0) {
        clearInterval(timeoutRef.current!);
        pause();
        setRemaining(null);
      }
    }, 500);
  }

  function cancel() {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    setRemaining(null);
  }

  return {
    start,
    cancel,
    remaining
  };
}

