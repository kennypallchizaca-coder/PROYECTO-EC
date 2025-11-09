import React, { useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "@/src/components/atoms/Button/Button";
import { useUserPreferences } from "@/src/contexts/UserContext/UserContext";
import { usePlayer } from "@/src/store/playerStore";
import { STATION } from "@/src/constants/config";
import { useSleepTimer } from "@/src/hooks/useSleepTimer";
import { formatMillis } from "@/src/utils/time";

export type PlayerCardProps = {
  /** Texto opcional para destacar la próxima programación. */
  upcomingLabel?: string;
};

export default function PlayerCard({ upcomingLabel }: PlayerCardProps) {
  const { init, toggle, status, isReady, play } = usePlayer();
  const { start, cancel, remaining } = useSleepTimer();
  const { autoPlay, defaultTimerMinutes } = useUserPreferences();

  /** Inicializamos el stream tan pronto se monta el componente. */
  useEffect(() => {
    init();
  }, [init]);

  const isPlaying = !!status?.isPlaying;

  /** Si el usuario lo prefiere, arrancamos la emisión automáticamente. */
  useEffect(() => {
    if (autoPlay && isReady && !isPlaying) {
      play();
    }
  }, [autoPlay, isReady, isPlaying, play]);

  /** Convertimos el tiempo restante del temporizador a un formato mm:ss. */
  const remainingLabel = useMemo(() => (remaining ? formatMillis(remaining) : null), [remaining]);

  return (
    <View style={styles.card}>
      <View style={styles.logoWrap}>
        <MaterialCommunityIcons name="radio-tower" size={44} color="#fff" />
      </View>

      <View style={styles.centerContent}>
        <Text style={styles.title}>{STATION.name}</Text>
        <Text style={styles.subtitle}>Transmitiendo en vivo • {STATION.location}</Text>
        {upcomingLabel && <Text style={styles.upcoming}>{upcomingLabel}</Text>}
      </View>

      <Button
        label={isPlaying ? "Pausar" : "Reproducir"}
        iconName={isPlaying ? "pause" : "play"}
        variant={isPlaying ? "secondary" : "primary"}
        onPress={toggle}
        accessibilityLabel={isPlaying ? "Pausar transmisión" : "Reproducir transmisión"}
      />

      <View style={styles.actions}>
        <Button
          label={remaining ? `Temporizador ${remainingLabel}` : `Temporizador ${defaultTimerMinutes}m`}
          iconName="timer-outline"
          variant="secondary"
          onPress={() => (remaining ? cancel() : start())}
        />
        <Button
          label="Compartir"
          iconName="share-social-outline"
          variant="secondary"
          onPress={async () => {
            const { Share } = await import("react-native");
            Share.share({
              message: `${STATION.name} – Escúchala en vivo: ${STATION.website}`
            });
          }}
        />
        <Button
          label={
            isReady
              ? status?.isBuffering
                ? "Conectando"
                : isPlaying
                ? "Sonando"
                : "Pausado"
              : "Cargando"
          }
          iconName="volume-high-outline"
          variant="ghost"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 18,
    marginTop: 24,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.28)",
    borderWidth: 1,
    borderColor: "#ffffff14",
    alignItems: "center",
    rowGap: 18
  },
  logoWrap: {
    height: 72,
    width: 72,
    borderRadius: 16,
    backgroundColor: "#ffffff22",
    alignItems: "center",
    justifyContent: "center"
  },
  centerContent: {
    alignItems: "center",
    rowGap: 6
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5
  },
  subtitle: {
    color: "#cbd5e1"
  },
  upcoming: {
    color: "#a5b4fc",
    fontWeight: "600"
  },
  actions: {
    width: "100%",
    rowGap: 10
  }
});
