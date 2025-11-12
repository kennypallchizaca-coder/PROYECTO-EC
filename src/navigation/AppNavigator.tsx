import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { usePlayer } from '../context/PlayerContext';
import HomeScreen from '../screens/HomeScreen';
import RadioPlayerScreen from '../screens/RadioPlayerScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ContactScreen from '../screens/ContactScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { buildNavigationTheme } from '../styles/theme';

export type TabParamList = {
  Home: undefined;
  Player: undefined;
  Schedule: undefined;
  Contact: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<TabParamList>;
  RadioPlayer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { theme } = usePlayer();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        // Ajustamos la altura del tab bar para imitar la maqueta.
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 72,
          paddingBottom: 12,
          paddingTop: 12,
        },
        // Iconos por pestaña usando Ionicons para mantener consistencia.
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<keyof TabParamList, React.ComponentProps<typeof Ionicons>['name']> = {
            Home: 'radio',
            Player: 'play-circle',
            Schedule: 'calendar',
            Contact: 'chatbubbles',
            Settings: 'settings',
          };

          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Player" component={RadioPlayerScreen} options={{ title: 'Reproductor' }} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'Programación' }} />
      <Tab.Screen name="Contact" component={ContactScreen} options={{ title: 'Contacto' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ajustes' }} />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const { themeMode } = usePlayer();

  return (
    <NavigationContainer theme={buildNavigationTheme(themeMode)}>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="RadioPlayer" component={RadioPlayerScreen} options={{ title: 'Reproductor' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
