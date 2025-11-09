import React from "react";
import MainLayout from "@/src/features/radio/components/MainLayout/MainLayout";
import PlayerCard from "@/src/features/radio/components/PlayerCard/PlayerCard";
import StationAbout from "@/src/features/radio/components/StationAbout/StationAbout";
import { useUpcomingShow } from "@/src/features/radio/hooks/useUpcomingShow";

/**
 * Página principal que combina el reproductor y contenido editorial.
 */
export default function HomeScreen() {
  const upcomingLabel = useUpcomingShow();

  return (
    <MainLayout scrollable contentStyle={{ paddingBottom: 48 }}>
      <PlayerCard upcomingLabel={upcomingLabel ?? undefined} />
      <StationAbout />
    </MainLayout>
  );
}
