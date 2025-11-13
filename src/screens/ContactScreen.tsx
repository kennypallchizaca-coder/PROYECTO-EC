import React, { useCallback } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { usePlayer } from '../context/PlayerContext';
import { CONTACT_CHANNELS } from '../services/contact';

const iconByType: Record<(typeof CONTACT_CHANNELS)[number]['type'], React.ComponentProps<typeof Ionicons>['name']> = {
  email: 'mail',
  phone: 'call',
  social: 'share-social',
};

export const ContactScreen: React.FC = () => {
  const { theme } = usePlayer();

  const handlePress = useCallback(async (url?: string) => {
    if (!url) return;
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert('No se puede abrir el enlace', 'Copia el dato y pégalo en tu navegador o app favorita.');
      return;
    }
    await Linking.openURL(url);
  }, []);

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }} contentContainerStyle={styles.container}>
      <View style={styles.heroWrapper}>
        <LinearGradient
          colors={[theme.colors.surface, theme.colors.card]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Contacto</Text>
          <Text style={[styles.heroDescription, { color: theme.colors.muted }]}>Escríbenos en el canal que prefieras.</Text>
        </LinearGradient>
      </View>

      {CONTACT_CHANNELS.map((channel) => (
        <TouchableOpacity
          key={channel.id}
          accessibilityRole="button"
          accessibilityLabel={channel.label}
          accessibilityHint={`Abrir ${channel.label}`}
          activeOpacity={0.8}
          style={[styles.channelCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          onPress={() => {
            void handlePress(channel.actionUrl);
          }}
        >
          <View style={[styles.iconWrapper, { backgroundColor: theme.colors.surface }]}> 
            <Ionicons name={iconByType[channel.type]} size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.channelInfo}>
            <Text style={[styles.channelLabel, { color: theme.colors.text }]}>{channel.label}</Text>
            <Text style={[styles.channelValue, { color: theme.colors.primary }]}>{channel.value}</Text>
            <Text style={[styles.channelDescription, { color: theme.colors.muted }]}>{channel.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.muted} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
  },
  heroWrapper: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  heroCard: {
    padding: 24,
    gap: 12,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
  },
  heroDescription: {
    fontSize: 15,
    lineHeight: 20,
  },
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelInfo: {
    flex: 1,
    gap: 4,
  },
  channelLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  channelValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  channelDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
});

export default ContactScreen;

