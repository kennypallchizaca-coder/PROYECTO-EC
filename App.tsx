import React from 'react';
import { ExpoRoot } from 'expo-router';

export default function App() {
  // Point Expo Router to the routes inside the frontend/app directory
  // The require.context call is transformed by the expo-router Babel plugin
  // to load all route files for Metro bundler.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctx = (require as any).context('./frontend/app');
  return <ExpoRoot context={ctx} />;
}

