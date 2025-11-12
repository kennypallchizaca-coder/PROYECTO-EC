import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, Rect, Text as SvgText } from 'react-native-svg';

import { usePlayer } from '../context/PlayerContext';

type LogoProps = {
  width?: number;
  height?: number;
};

export const Logo: React.FC<LogoProps> = ({ width = 220, height = 72 }) => {
  const { theme } = usePlayer();

  // SVG simple para imitar el bloque del mockup.
  return (
    <View accessibilityRole="image" accessibilityLabel="Logo de RadioWave" style={styles.wrapper}>
      <Svg width={width} height={height} viewBox="0 0 220 72">
        <Rect width={220} height={72} rx={18} fill={theme.colors.primary} />
        <SvgText
          x="50%"
          y="50%"
          fill={theme.colors.onPrimary}
          fontSize={32}
          fontWeight="700"
          fontFamily="System"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          RadioWave
        </SvgText>
        <Path
          d="M28 18C42 32 42 40 28 54"
          stroke={theme.colors.onPrimary}
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
});

export default Logo;
