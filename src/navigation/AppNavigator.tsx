import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { usePlayer } from '../context/PlayerContext';
import HomeScreen from '../screens/HomeScreen';
import RadioPlayerScreen from '../screens/RadioPlayerScreen';
import ContactScreen from '../screens/ContactScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { buildNavigationTheme } from '../styles/theme';

export type TabParamList = {
  Home: undefined;
  Player: undefined;
  Contact: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<TabParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
// Work around React 19 + React Navigation TS props inference friction
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabNav = Tab.Navigator as unknown as React.ComponentType<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StackNav = Stack.Navigator as unknown as React.ComponentType<any>;

const TabNavigator = () => {
  const { theme } = usePlayer();

  return (
    <TabNav
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 72,
          paddingBottom: 12,
          paddingTop: 12,
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<keyof TabParamList, React.ComponentProps<typeof Ionicons>['name']> = {
            Home: 'radio',
            Player: 'play-circle',
            Contact: 'chatbubbles',
            Settings: 'settings',
          };

          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Player" component={RadioPlayerScreen} options={{ title: 'Reproductor' }} />
      <Tab.Screen name="Contact" component={ContactScreen} options={{ title: 'Contacto' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ajustes' }} />
    </TabNav>
  );
};

const AppNavigator: React.FC = () => {
  const { themeMode } = usePlayer();

  return (
    <NavigationContainer theme={buildNavigationTheme(themeMode)}>
      <StackNav>
        <Stack.Screen name="Root" component={TabNavigator} options={{ headerShown: false }} />
      </StackNav>
    </NavigationContainer>
  );
};

export default AppNavigator;
