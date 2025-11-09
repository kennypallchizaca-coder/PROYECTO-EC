import { useEffect, useState } from "react";
import { getUpcomingShow } from "@/src/features/Home/utils/getUpcomingShow";

/**
 * Devuelve una etiqueta amigable con el próximo programa de la emisora.
 */
export function useUpcomingShow() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const upcoming = getUpcomingShow();
      if (!upcoming) {
        setLabel(null);
        return;
      }

      const date = upcoming.startDate;
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      setLabel(`${upcoming.show.title} • ${hours}:${minutes} hrs`);
    };

    update();
    // Actualizamos cada minuto para reflejar cambios de programación.
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return label;
}
