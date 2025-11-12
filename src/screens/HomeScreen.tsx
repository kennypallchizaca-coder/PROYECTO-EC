import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Logo from '../components/Logo';
import StationItem from '../components/StationItem';
import { usePlayer } from '../context/PlayerContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Station, fetchStations } from '../services/radioAPI';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme, currentStation, selectStation } = usePlayer();
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);

  // Elegimos una emisora destacada para mostrarla en la tarjeta hero.
  const featuredStation = useMemo(() => currentStation ?? stations[0] ?? null, [currentStation, stations]);

  // Cargamos las estaciones desde el servicio mock.
  const loadStations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchStations();
      setStations(response);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStations();
  }, [loadStations]);

  // Al seleccionar una emisora, guardamos la elección en el contexto y navegamos al reproductor.
  const handlePress = useCallback(
    async (station: Station) => {
      await selectStation(station);
      navigation.navigate('RadioPlayer');
    },
    [navigation, selectStation],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={stations}
        keyExtractor={(item) => item.id}
        {/* Cabecera con logo y tarjeta destacada para seguir el diseño proporcionado. */}
        ListHeaderComponent={
          <View style={styles.header}>
            <Logo />
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.surface]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featuredCard}
            >
              <Text style={[styles.pill, { color: theme.colors.onPrimary }]}>DESTACADO</Text>
              <Text style={[styles.featuredTitle, { color: theme.colors.onPrimary }]}>
                {featuredStation ? featuredStation.name : 'Sin selección actual'}
              </Text>
              {featuredStation && (
                <Text style={[styles.featuredDescription, { color: theme.colors.onPrimary }]}> 
                  {featuredStation.description}
                </Text>
              )}
              <Text style={[styles.featuredMeta, { color: theme.colors.onPrimary }]}>
                {featuredStation
                  ? `${featuredStation.genre} · ${featuredStation.country}`
                  : 'Explora nuestra selección de emisoras'}
              </Text>
            </LinearGradient>
            <Text style={[styles.subtitle, { color: theme.colors.muted }]}> 
              Curamos estaciones internacionales con excelente calidad de audio.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <StationItem
            station={item}
            onPress={() => handlePress(item)}
            isActive={currentStation?.id === item.id}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing.sm }} />}
        contentContainerStyle={[styles.listContent, { padding: theme.spacing.lg }]}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadStations} tintColor={theme.colors.primary} />}
        ListEmptyComponent={
          !loading ? (
            <Text style={[styles.emptyState, { color: theme.colors.muted }]}>No hay emisoras disponibles por ahora.</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'stretch',
    gap: 16,
    marginBottom: 24,
  },
  featuredCard: {
    borderRadius: 28,
    padding: 24,
    gap: 12,
  },
  pill: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  featuredTitle: {
    fontSize: 26,
    fontWeight: '800',
  },
  featuredDescription: {
    fontSize: 15,
    lineHeight: 20,
  },
  featuredMeta: {
    fontSize: 13,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  subtitle: {
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 48,
    gap: 16,
  },
  emptyState: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});

export default HomeScreen;
