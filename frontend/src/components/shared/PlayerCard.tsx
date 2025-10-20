import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePlayer } from "@/src/store/playerStore";
import { STATION } from "@/src/constants/config";
import { useSleepTimer } from "@/src/hooks/useSleepTimer";

export default function PlayerCard() {
  const { init, toggle, status, isReady } = usePlayer();
  const { start, cancel, remaining } = useSleepTimer();

  useEffect(() => {
    init();
  }, [init]);

  const isPlaying = !!status?.isPlaying;
  const remainingLabel = useMemo(() => {
    if (!remaining) return null;
    const sec = Math.ceil(remaining / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, [remaining]);

  return (
    <View style={styles.card}>
      <View style={styles.logoWrap}>
        <MaterialCommunityIcons name="radio-tower" size={44} color="#fff" />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>{STATION.name}</Text>
        <Text style={styles.subtitle}>Transmitiendo en vivo • {STATION.location}</Text>
      </View>

      <Pressable style={[styles.playBtn, isPlaying && styles.playing]} onPress={toggle}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={36} color="#0b1021" />
      </Pressable>

      <View style={styles.actions}>
        <Action icon="timer-outline" label={remaining ? `Sleep ${remainingLabel}` : "Sleep"}
          onPress={() => (remaining ? cancel() : start(30))} />
        <Action icon="share-social-outline" label="Compartir"
          onPress={async () => {
            const { Share } = await import("react-native");
            Share.share({
              message: `${STATION.name} – Escúchala en vivo: ${STATION.website}`
            });
          }} />
        <Action icon="volume-high-outline" label={isReady ? (status?.isBuffering ? "Buffering" : isPlaying ? "Sonando" : "Pausado") : "Cargando"} />
      </View>
    </View>
  );
}

function Action({ icon, label, onPress }: { icon: any; label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.actionItem} android_ripple={{ color: "#ffffff22" }}>
      <Ionicons name={icon} size={20} color="#fff" />
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
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
    alignItems: "center"
  },
  logoWrap: {
    height: 72,
    width: 72,
    borderRadius: 16,
    backgroundColor: "#ffffff22",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5
  },
  subtitle: {
    color: "#cbd5e1",
    marginTop: 4
  },
  playBtn: {
    marginTop: 18,
    height: 72,
    width: 72,
    borderRadius: 9999,
    backgroundColor: "#22d3ee",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2
  },
  playing: {
    backgroundColor: "#a78bfa"
  },
  actions: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 9999,
    backgroundColor: "#ffffff12"
  },
  actionText: { color: "#fff", marginLeft: 8, fontWeight: "600" }
});

