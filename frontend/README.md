RADIO SISID ECUADOR – Mobile App (Expo)

Overview
- Cross‑platform mobile app (iOS/Android/Web) built with Expo + Expo Router.
- Eye‑catching, gradient UI with iconography and tabs.
- Live radio streaming with background audio using `expo-av`.
- Sleep timer, share action, and a weekly schedule.

Folder Structure (inspired by your screenshot)
- `app/` – Route-based screens (Expo Router): `index`, `schedule`, `contact`, `settings`.
- `src/components/` – Reusable UI and layout pieces.
- `src/features/` – Feature modules such as `schedule/`.
- `src/hooks/` – Custom hooks (e.g., `useSleepTimer`).
- `src/lib/` – Audio configuration helpers.
- `src/constants/` – Station config and theme.
- `src/store/` – Zustand stores for player and theme.
- `src/utils/` – Utilities (e.g., time formatting).

Getting Started
1) Install deps
   npm install

2) Set your live stream URL (recommended)
   - Create `.env` in project root or pass at runtime:
     EXPO_PUBLIC_STREAM_URL="https://your-stream-url.example/stream"
   - Default demo stream is configured in `src/constants/config.ts`.

3) Run the app
   npx expo start
   - Press `a` for Android, `i` for iOS, or scan the QR.

Deploy to GitHub Pages
- The repo does not ship with an Actions workflow, but you can add one like the following under `.github/workflows/deploy-gh-pages.yml` in your repository (create the directories if they do not exist):

  ```yaml
  name: Deploy Expo Web to GitHub Pages

  on:
    push:
      branches: [main]

  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      defaults:
        run:
          working-directory: frontend
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: 'npm'
            cache-dependency-path: frontend/package-lock.json
        - run: npm ci
        - run: npx expo export:web
        - name: Deploy to GitHub Pages
          uses: peaceiris/actions-gh-pages@v3
          with:
            github_token: ${{ secrets.GITHUB_TOKEN }}
            publish_dir: frontend/dist
  ```
- Steps:
  1) Create a GitHub repo and push the project (branch `main`).
  2) Commit the workflow above (or a variation) and push to `main`.
  3) In GitHub → Settings → Pages → set "Build and deployment" to "GitHub Actions".
  4) Push to `main`; the action builds a static web export and deploys it.
  5) Your site will be available at `https://<user>.github.io/<repo>/`.
  6) If you use a custom domain, add a `CNAME` file to `frontend/dist` during deployment or configure it in the Pages settings.

Branding
- Replace icon/splash assets later by editing `app.config.ts` and adding files under `assets/`.

Notes
- Background audio is enabled; on iOS you must enable the Audio background mode if you build a standalone app.
- UI colors are set in `src/constants/config.ts`.
