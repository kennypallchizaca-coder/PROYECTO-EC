import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "RADIO SISID ECUADOR",
  slug: "radio-sisid-ecuador",
  scheme: "radio-sisid-ecuador",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: undefined,
      backgroundColor: "#0b1021"
    }
  },
  web: {
    bundler: "metro",
    favicon: undefined
  },
  extra: {
    eas: {
      projectId: "00000000-0000-0000-0000-000000000000"
    }
  }
});
