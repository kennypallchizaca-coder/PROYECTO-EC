/**
 * Convert milliseconds into an mm:ss string. Falls back to 00:00 when the input is falsy.
 */
export const formatTime = (millis?: number | null): string => {
  if (!millis || Number.isNaN(millis)) {
    return '00:00';
  }

  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Friendly formatter for bit-rate information.
 */
export const formatBitrate = (bitrateKbps?: number): string => {
  if (!bitrateKbps) {
    return 'Desconocido';
  }

  if (bitrateKbps >= 1000) {
    return `${(bitrateKbps / 1000).toFixed(1)} Mbps`;
  }

  return `${bitrateKbps} Kbps`;
};
