import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import AppNavigator from './src/navigation/AppNavigator';
import { PlayerProvider, usePlayer } from './src/context/PlayerContext';

const StatusBarController = () => {
  const { themeMode } = usePlayer();
  return <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />;
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PlayerProvider>
          <AppNavigator />
          <StatusBarController />
        </PlayerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
