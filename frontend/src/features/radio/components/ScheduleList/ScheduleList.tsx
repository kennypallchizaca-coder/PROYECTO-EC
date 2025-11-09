import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { weeklySchedule } from "@/src/features/radio/utils/scheduleData";

/**
 * Lista estilizada de programas que se reutiliza en diversas vistas.
 */
export default function ScheduleList() {
  return (
    <View style={styles.container}>
      {weeklySchedule.map((show, idx) => (
        <View key={`${show.title}-${idx}`} style={styles.item}>
          <View style={styles.left}>
            <Ionicons name="musical-notes-outline" size={20} color="#a5b4fc" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{show.title}</Text>
            <Text style={styles.meta}>
              {show.time} • {show.days}
            </Text>
            {show.host && <Text style={styles.host}>Con {show.host}</Text>}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 8, marginHorizontal: 16 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#ffffff0f",
    borderColor: "#ffffff16",
    borderWidth: 1,
    marginBottom: 10
  },
  left: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "#3730a330"
  },
  title: { color: "#fff", fontWeight: "700" },
  meta: { color: "#cbd5e1", marginTop: 4 },
  host: { color: "#94a3b8", marginTop: 2 }
});
