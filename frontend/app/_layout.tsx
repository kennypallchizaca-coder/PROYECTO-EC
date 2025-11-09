import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "@/src/features/radio/constants/station";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "@/src/features/settings/context/UserPreferencesContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#0b1021",
            borderTopColor: "#ffffff22"
          },
          tabBarActiveTintColor: THEME.accent,
          tabBarInactiveTintColor: "#94a3b8"
        }}
      >
        <Tabs.Screen name="index" options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )
        }} />
        <Tabs.Screen name="schedule" options={{
          title: "Programación",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          )
        }} />
        <Tabs.Screen name="contact" options={{
          title: "Contacto",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          )
        }} />
        <Tabs.Screen name="settings" options={{
          title: "Ajustes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )
        }} />
      </Tabs>
    </UserProvider>
  );
}

