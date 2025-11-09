import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

type Breakpoint = "sm" | "md" | "lg";

const BREAKPOINTS: Record<Breakpoint, number> = {
  sm: 0,
  md: 768,
  lg: 1024
};

/**
 * Hook utilitario para consultar el ancho de la ventana y responder
 * a diferentes puntos de corte (breakpoints) en tiempo real.
 */
export function useMediaQuery(breakpoint: Breakpoint) {
  const { width } = useWindowDimensions();

  return useMemo(() => width >= BREAKPOINTS[breakpoint], [width, breakpoint]);
}
