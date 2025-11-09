import React from "react";
import MainLayout from "@/src/components/templates/MainLayout/MainLayout";
import PlayerCard from "@/src/components/organisms/PlayerCard/PlayerCard";
import StationAbout from "@/src/features/Home/organisms/StationAbout/StationAbout";
import { useUpcomingShow } from "@/src/features/Home/hooks/useUpcomingShow";

/**
 * Página principal que combina el reproductor y contenido editorial.
 */
export default function HomePage() {
  const upcomingLabel = useUpcomingShow();

  return (
    <MainLayout scrollable contentStyle={{ paddingBottom: 48 }}>
      <PlayerCard upcomingLabel={upcomingLabel ?? undefined} />
      <StationAbout />
    </MainLayout>
  );
}
