export type Show = {
  title: string;
  host?: string;
  time: string; // e.g. "06:00 - 08:00"
  days: string; // e.g. "Lun–Vie"
};

export const weeklySchedule: Show[] = [
  { title: "Despertar Andino", host: "Equipo Matinal", time: "06:00 – 08:00", days: "Lun–Vie" },
  { title: "Noticias SISID", host: "Redacción", time: "08:00 – 09:00", days: "Lun–Vie" },
  { title: "Magazine Comunitario", time: "09:00 – 12:00", days: "Lun–Vie" },
  { title: "Tardes Musicales", time: "12:00 – 15:00", days: "Lun–Vie" },
  { title: "Deportes al Día", time: "17:00 – 18:00", days: "Lun–Vie" },
  { title: "Noches de Baladas", time: "20:00 – 22:00", days: "Lun–Dom" }
];
