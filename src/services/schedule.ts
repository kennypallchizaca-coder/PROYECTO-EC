// Información mock de la programación semanal. Mantenerla separada del componente
// facilita reemplazarla por datos reales sin tocar la UI.
export type ScheduleSlot = {
  id: string;
  title: string;
  host: string;
  start: string;
  end: string;
  description: string;
};

export type DaySchedule = {
  day: string;
  slots: ScheduleSlot[];
};

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    day: 'Lunes',
    slots: [
      {
        id: 'mon-morning-news',
        title: 'Noticias de la mañana',
        host: 'Ana Torres',
        start: '06:00',
        end: '09:00',
        description: 'Resumen de titulares, tráfico y clima para arrancar el día.',
      },
      {
        id: 'mon-midday',
        title: 'Música y noticias',
        host: 'Diego Paredes',
        start: '12:00',
        end: '15:00',
        description: 'Hits actuales intercalados con cápsulas informativas.',
      },
      {
        id: 'mon-night',
        title: 'Sesión nocturna',
        host: 'Paula Ríos',
        start: '21:00',
        end: '23:00',
        description: 'Selección chill y downtempo para desconectar.',
      },
    ],
  },
  {
    day: 'Martes',
    slots: [
      {
        id: 'tue-breakfast',
        title: 'Desayuno global',
        host: 'Carlos Méndez',
        start: '07:00',
        end: '10:00',
        description: 'Entrevistas y reportes en vivo desde diferentes ciudades.',
      },
      {
        id: 'tue-drive',
        title: 'Ruta urbana',
        host: 'Laura Díaz',
        start: '17:00',
        end: '19:00',
        description: 'Playlists para tu regreso a casa con recomendaciones culturales.',
      },
    ],
  },
  {
    day: 'Miércoles',
    slots: [
      {
        id: 'wed-focus',
        title: 'Zona Focus',
        host: 'Lofi Team',
        start: '09:00',
        end: '12:00',
        description: 'Beats suaves y ambientes instrumentales para concentrarte.',
      },
      {
        id: 'wed-live',
        title: 'Sesiones en vivo',
        host: 'Club RadioWave',
        start: '20:00',
        end: '22:00',
        description: 'Transmisión de presentaciones y DJ sets exclusivos.',
      },
    ],
  },
];
