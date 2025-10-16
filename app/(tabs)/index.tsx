import type { ComponentProps } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';

import { Feather } from '@expo/vector-icons';

type FeatherIconName = ComponentProps<typeof Feather>['name'];

type Section = {
  title: string;
  description: string;
  icon: FeatherIconName;
  items: { label: string; detail: string }[];
};

const folderOutline = [
  'PROYECTO-EC/',
  '├── app/',
  '│   ├── (tabs)/',
  '│   ├── _layout.tsx',
  '│   ├── +html.tsx',
  '│   ├── +not-found.tsx',
  '│   └── modal.tsx',
  '├── assets/',
  '├── components/',
  '├── constants/',
  '├── app.json',
  '├── package.json',
  '└── tsconfig.json',
];

const sections: Section[] = [
  {
    title: 'Routes & navigation',
    description: 'Expo Router screens grouped by platform tabs and shared layouts.',
    icon: 'map',
    items: [
      { label: 'app/', detail: 'Main routing directory with Expo Router conventions.' },
      { label: '(tabs)/', detail: 'Bottom tab navigator with feature screens.' },
      { label: '_layout.tsx', detail: 'Shared navigation shell and providers.' },
      { label: 'modal.tsx', detail: 'Reusable modal flow accessible from any tab.' },
    ],
  },
  {
    title: 'Reusable interface',
    description: 'Composable primitives and helpers shared across screens.',
    icon: 'grid',
    items: [
      { label: 'components/', detail: 'Design system building blocks (buttons, text, etc.).' },
      { label: 'StyledText.tsx', detail: 'Typography variants with consistent styling.' },
      { label: 'Themed.tsx', detail: 'Light/dark aware wrappers for Text and View.' },
      { label: 'ExternalLink.tsx', detail: 'Browser-safe link component with tracking.' },
    ],
  },
  {
    title: 'Design tokens',
    description: 'Color palettes and configuration centralised for easy updates.',
    icon: 'sliders',
    items: [
      { label: 'constants/', detail: 'Theme constants consumed by the entire app.' },
      { label: 'Colors.ts', detail: 'Primary/secondary palette and tint configuration.' },
      { label: 'useColorScheme.ts', detail: 'Hook wrapping the system appearance API.' },
      { label: 'useClientOnlyValue.ts', detail: 'Utility for SSR-safe responsive values.' },
    ],
  },
  {
    title: 'Static assets',
    description: 'Images, icons, fonts, and media bundled with the application.',
    icon: 'image',
    items: [
      { label: 'assets/', detail: 'Global static assets available via the bundler.' },
      { label: 'fonts/', detail: 'Custom typography (Space Mono) loaded at runtime.' },
      { label: 'images/icon.png', detail: 'Primary app icon used across platforms.' },
      { label: 'images/splash-icon.png', detail: 'Splash and adaptive launch graphics.' },
    ],
  },
  {
    title: 'Configuration',
    description: 'Project-level configuration and scripts for tooling & Expo.',
    icon: 'settings',
    items: [
      { label: 'app.json', detail: 'Expo app metadata and platform-specific settings.' },
      { label: 'package.json', detail: 'Dependencies, scripts, and npm configuration.' },
      { label: 'tsconfig.json', detail: 'TypeScript compiler options and path aliases.' },
      { label: 'README.md', detail: 'Project overview and development workflows.' },
    ],
  },
];

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme = {
    background: isDark ? '#020617' : '#f8fafc',
    card: isDark ? 'rgba(15,23,42,0.9)' : '#ffffff',
    border: isDark ? 'rgba(148,163,184,0.25)' : '#e2e8f0',
    accent: isDark ? '#38bdf8' : '#1d4ed8',
    accentMuted: isDark ? 'rgba(56,189,248,0.12)' : 'rgba(37,99,235,0.08)',
    muted: isDark ? '#94a3b8' : '#475569',
    heading: isDark ? '#e2e8f0' : '#0f172a',
    badge: isDark ? '#facc15' : '#f97316',
  } as const;

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: theme.card, borderColor: theme.border }]}> 
          <View style={[styles.heroBadge, { backgroundColor: theme.accentMuted }]}> 
            <Text style={styles.heroBadgeText} lightColor={theme.accent} darkColor={theme.accent}>
              Expo Router
            </Text>
          </View>
          <Text style={[styles.heroTitle, { color: theme.heading }]}>Modern Frontend Folder Structure</Text>
          <Text style={[styles.heroSubtitle, { color: theme.muted }]}>A quick visual map of how this Expo app is organised so new teammates can explore confidently.</Text>
        </View>

        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}> 
          <Text style={[styles.sectionHeading, { color: theme.heading }]}>High-level map</Text>
          <Text style={[styles.sectionDescription, { color: theme.muted }]}>Start from the project root and explore where every concern lives.</Text>
          <View style={[styles.codeBlock, { backgroundColor: isDark ? 'rgba(15,23,42,0.7)' : '#f1f5f9', borderColor: theme.border }]}> 
            {folderOutline.map((line) => (
              <Text
                key={line}
                style={[styles.codeLine, { color: isDark ? '#e2e8f0' : '#0f172a' }]}
              >
                {line}
              </Text>
            ))}
          </View>
        </View>

        {sections.map((section) => (
          <View
            key={section.title}
            style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={styles.sectionHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: theme.accentMuted }]}> 
                <Feather name={section.icon} size={18} color={theme.accent} />
              </View>
              <View style={styles.sectionHeaderText}>
                <Text style={[styles.sectionHeading, { color: theme.heading }]}>{section.title}</Text>
                <Text style={[styles.sectionDescription, { color: theme.muted }]}>{section.description}</Text>
              </View>
            </View>

            <View style={styles.itemList}>
              {section.items.map((item) => (
                <View
                  key={item.label}
                  style={[styles.itemRow, { borderColor: theme.border }]}
                >
                  <Text
                    style={[styles.itemLabel, { color: theme.heading }]}
                    lightColor={theme.heading}
                    darkColor={theme.heading}
                  >
                    {item.label}
                  </Text>
                  <Text style={[styles.itemDetail, { color: theme.muted }]}>{item.detail}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 32,
    gap: 24,
  },
  hero: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
    gap: 16,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  heroBadgeText: {
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  codeBlock: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    gap: 6,
  },
  codeLine: {
    fontSize: 13,
    letterSpacing: 0.4,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderText: {
    flex: 1,
    gap: 6,
  },
  itemList: {
    gap: 12,
  },
  itemRow: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  itemDetail: {
    fontSize: 13,
    lineHeight: 18,
  },
});
