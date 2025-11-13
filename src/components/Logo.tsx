import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

type LogoProps = {
  width?: number;
};

const logoSource: ImageSourcePropType = require('../images/logoradiosisidec.jpg');

export const Logo: React.FC<LogoProps> = ({ width = 220 }) => {
  return (
    <View accessibilityRole="image" accessibilityLabel="Logo Radio Sisid Ecuador" style={styles.wrapper}>
      <Image source={logoSource} style={{ width, height: 72, borderRadius: 18 }} resizeMode="contain" />
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
