# RadioWave

Aplicación de radio construida con Expo y React Native que permite reproducir emisoras en streaming con una arquitectura modular y escalable.

## 🚀 Características principales

- Reproducción de streams online con [`expo-av`](https://docs.expo.dev/versions/latest/sdk/av/).
- Controles de reproducción (play/pause, stop, volumen) y estado global mediante Context API + hooks personalizados.
- Navegación combinando stack y pestañas inferiores con React Navigation (Inicio, Reproductor, Programación, Contacto, Ajustes).
- Persistencia de preferencias (tema, autoplay, volumen) usando `AsyncStorage`.
- Diseño responsivo inspirado en Atomic Design con componentes reutilizables.
- Gradientes y superficies ricas usando `expo-linear-gradient` para replicar la maqueta.
- Tipado completo con TypeScript y linting automático con ESLint + Prettier.

## 📂 Estructura del proyecto

```
/radio-app
├── App.tsx
├── app.json
├── package.json
└── src
    ├── assets/
    │   ├── icons/
    │   ├── images/
    │   └── fonts/
    ├── components/
    ├── context/
    ├── hooks/
    ├── navigation/
    ├── screens/
    ├── services/
    ├── styles/
    └── utils/
```

Cada carpeta agrupa una responsabilidad concreta (UI, lógica compartida, servicios, etc.), promoviendo separación de responsabilidades y escalabilidad.

> Nota: los directorios de `assets` permanecen vacíos para evitar archivos binarios en el repositorio. Sustituye las rutas por tus propios recursos locales cuando prepares una build real.

## 🧩 Componentes clave

- **`src/hooks/useAudioPlayer.ts`**: encapsula la integración con `expo-av` para cargar, reproducir y controlar streams.
- **`src/context/PlayerContext.tsx`**: expone el estado global del reproductor y preferencias persistentes.
- **`src/navigation/AppNavigator.tsx`**: configura el stack principal y las pestañas inferiores.
- **`src/screens/*`**: pantallas de Inicio, Reproductor, Programación, Contacto y Ajustes.
- **`src/services/radioAPI.ts`**: catálogo mock de emisoras reales listo para reemplazar por una API externa.
- **`src/services/schedule.ts` y `src/services/contact.ts`**: datos de programación y canales de comunicación centralizados.

## 🛠️ Configuración y scripts

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Ejecuta la app (elige la plataforma):
   ```bash
   npm run start    # modo interactivo con Expo Go
   npm run android  # compila en Android
   npm run ios      # compila en iOS
   npm run web      # vista web
   ```
3. Analiza el código:
   ```bash
   npm run lint
   ```

> ℹ️ El proyecto usa la [CLI de Expo](https://docs.expo.dev/workflow/expo-cli/) y requiere Node.js 18+. Para reproducción en segundo plano, recuerda aceptar los permisos de audio en tu dispositivo o emulador.

## 🎨 Temas y accesibilidad

El archivo [`src/styles/theme.ts`](src/styles/theme.ts) define los tokens de diseño (colores, tipografías, espaciados) y se conecta con React Navigation para sincronizar la apariencia en toda la app. Los componentes incluyen labels accesibles y controles adaptables para lectores de pantalla.

## 📄 Linting y estilo

- Configuración moderna en `eslint.config.mjs` combinando las reglas recomendadas de JavaScript, React y TypeScript.
- Formato consistente con Prettier (`.prettierrc`).

## 🤝 Contribución

1. Crea una rama desde `main`.
2. Aplica cambios siguiendo la estructura existente.
3. Ejecuta `npm run lint` antes de abrir un PR.

¡Listo! Tienes una base sólida para seguir ampliando funcionalidades (favoritos, historial, integración con APIs en tiempo real, etc.).
