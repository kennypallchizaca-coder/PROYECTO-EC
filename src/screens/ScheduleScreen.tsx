import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { usePlayer } from '../context/PlayerContext';
import { DaySchedule, WEEKLY_SCHEDULE } from '../services/schedule';

// Convierte HH:mm a minutos para comparar intervalos.
const parseToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Obtenemos el día en español manteniendo la primera letra en mayúscula.
const getSpanishWeekday = (date: Date) =>
  date.toLocaleDateString('es-EC', { weekday: 'long' }).replace(/^[a-z]/, (letter) => letter.toUpperCase());

// Determina si el bloque está activo usando la hora actual del dispositivo.
const findCurrentSlot = (schedule: DaySchedule) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const todayName = getSpanishWeekday(now);

  if (schedule.day !== todayName) {
    return null;
  }

  return schedule.slots.find((slot) => {
    const start = parseToMinutes(slot.start);
    const end = parseToMinutes(slot.end);
    return currentMinutes >= start && currentMinutes < end;
  });
};

export const ScheduleScreen: React.FC = () => {
  const { theme } = usePlayer();

  const scheduleWithStatus = useMemo(() =>
    WEEKLY_SCHEDULE.map((daySchedule) => {
      const currentSlot = findCurrentSlot(daySchedule);

      return {
        ...daySchedule,
        currentSlotId: currentSlot?.id,
      };
    }),
  []);

  // Cada día se presenta como una tarjeta con sus bloques.
  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }} contentContainerStyle={styles.container}>
      {/* Cabecera inspirada en el mockup con un gradiente suave. */}
      <View style={styles.heroWrapper}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.surface]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={[styles.heroTitle, { color: theme.colors.onPrimary }]}>Programación</Text>
          <Text style={[styles.heroDescription, { color: theme.colors.onPrimary }]}>
            Revisa qué suena en cada bloque y agenda tus shows favoritos.
          </Text>
        </LinearGradient>
      </View>

      {scheduleWithStatus.map((daySchedule) => (
        <View key={daySchedule.day} style={[styles.dayCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.dayLabel, { color: theme.colors.text }]}>{daySchedule.day}</Text>
          {daySchedule.slots.map((slot) => {
            const isLive = slot.id === daySchedule.currentSlotId;

            return (
              <View
                key={slot.id}
                style={[
                  styles.slotCard,
                  {
                    backgroundColor: isLive ? theme.colors.surface : theme.colors.background,
                    borderColor: isLive ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              >
                <View style={styles.slotHeader}>
                  <View>
                    <Text style={[styles.slotTitle, { color: theme.colors.text }]}>{slot.title}</Text>
                    <Text style={[styles.slotHost, { color: theme.colors.muted }]}>{slot.host}</Text>
                  </View>
                  <View
                    style={[
                      styles.timePill,
                      { backgroundColor: isLive ? theme.colors.primary : theme.colors.surface, borderColor: theme.colors.border },
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        { color: isLive ? theme.colors.onPrimary : theme.colors.text },
                      ]}
                    >
                      {slot.start} - {slot.end}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.slotDescription, { color: theme.colors.muted }]}>{slot.description}</Text>
                {isLive && <Text style={[styles.liveTag, { color: theme.colors.primary }]}>EN VIVO AHORA</Text>}
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
  },
  heroWrapper: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  heroCard: {
    padding: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
  },
  heroDescription: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
  },
  dayCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  dayLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  slotCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  slotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slotTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  slotHost: {
    fontSize: 14,
    marginTop: 2,
  },
  slotDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  timePill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  liveTag: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default ScheduleScreen;
