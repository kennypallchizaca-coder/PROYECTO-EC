import { weeklySchedule, Show } from "@/src/features/Schedule/utils/scheduleData";

/**
 * Días de la semana abreviados para interpretar las etiquetas de la grilla.
 */
const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] as const;

function parseStartMinutes(timeRange: string) {
  const start = timeRange.split("–")[0]?.trim() ?? "00:00";
  const [hours, minutes] = start.split(":").map((chunk) => parseInt(chunk, 10));
  return hours * 60 + minutes;
}

function expandDays(label: string): number[] {
  if (label.includes("–")) {
    const [startLabel, endLabel] = label.split("–").map((v) => v.trim());
    const startIndex = DAYS.indexOf(startLabel as typeof DAYS[number]);
    const endIndex = DAYS.indexOf(endLabel as typeof DAYS[number]);
    if (startIndex === -1 || endIndex === -1) return [];

    const result: number[] = [];
    let current = startIndex;
    while (true) {
      result.push(current);
      if (current === endIndex) break;
      current = (current + 1) % 7;
    }
    return result;
  }

  const dayIndex = DAYS.indexOf(label.trim() as typeof DAYS[number]);
  return dayIndex === -1 ? [] : [dayIndex];
}

function showMatchesDay(show: Show, dayIndex: number) {
  return show.days.split(",").some((part) => expandDays(part).includes(dayIndex));
}

/**
 * Calcula el próximo programa disponible tomando en cuenta día y horario actual.
 */
export function getUpcomingShow(reference: Date = new Date()) {
  const now = reference;
  const todayIndex = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (let offset = 0; offset < 7; offset += 1) {
    const dayIndex = (todayIndex + offset) % 7;
    const dayStart = new Date(now);
    dayStart.setHours(0, 0, 0, 0);
    dayStart.setDate(dayStart.getDate() + offset);

    const showsForDay = weeklySchedule
      .filter((show) => showMatchesDay(show, dayIndex))
      .map((show) => ({
        show,
        startMinutes: parseStartMinutes(show.time)
      }))
      .sort((a, b) => a.startMinutes - b.startMinutes);

    for (const item of showsForDay) {
      if (offset === 0 && item.startMinutes <= currentMinutes) {
        continue;
      }

      const hours = Math.floor(item.startMinutes / 60);
      const minutes = item.startMinutes % 60;
      const startDate = new Date(dayStart);
      startDate.setHours(hours, minutes, 0, 0);
      return { show: item.show, startDate };
    }
  }

  return null;
}
