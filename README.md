# Farm Family

One codebase for Android and iOS, built with Expo (SDK 58) + React Native + TypeScript + Expo Router.

Farm Family helps farmers catch animal illness early, with an AI health-check triage,
animal-specific vaccination reminders, a produce log, learning guides, and a planned
marketplace for quality farm products.

> **Important:** the AI scan in this app is early **triage only, never a final
> diagnosis**. Confirm with a vet. Demo animal and date data in the skeleton is
> labelled as demo data and is not a real appointment or live market price.

## Build from source

Prerequisites: Node.js 20 or newer, npm, and Git. No Android Studio, Xcode,
or native SDK is needed for development — use Expo Go or EAS (below).

```bash
git clone <this-repo-url>
cd farm-family-app
npm install
npx expo start
```

Then, in the Expo terminal:

- Press `a` for an Android emulator (Android Studio required), `i` for an
  iOS simulator (macOS + Xcode required), or `w` for a web preview.
- On a physical phone: install Expo Go, put the phone on the same Wi-Fi as
  the computer, and scan the QR code shown by `expo start`.
- Windows PowerShell note: if `npm` is blocked by the execution policy, use
  `npm.cmd install` and `npx.cmd expo start`, or run the commands in Command
  Prompt instead.

Production / downloadable builds (no local native toolchains needed):

```bash
# Android APK for direct install (preview profile)
npx eas-cli@latest build --platform android --profile preview

# iOS via TestFlight (Apple Developer account required)
npx eas-cli@latest build --platform ios --profile preview
```

Web export (static bundle, for a quick browser check):

```bash
npx expo export --platform web
```

Checks before a pull request:

```bash
npm run typecheck
npx expo lint
npx expo-doctor
```

## Where the AI integration plugs in

This is the part the AI integrator should start from:

- **Entry point:** Home (`src/app/(tabs)/index.tsx`) → Scan Animal Now /
  Upload from Gallery → the animal-select bottom sheet
  (`src/components/AnimalSelectSheet.tsx`).
- **Scan screen:** `src/app/scan.tsx` — currently a placeholder that already
  receives the chosen animal and the source (`camera` or `gallery`) as route
  params, and shows a Monitor triage result with the vet disclaimer. Replace
  this screen's placeholder with the real camera + model call when the model
  is ready; keep the triage framing and the disclaimer.
- **Demo data only:** `src/data/animals.ts` (Gauri, Nandi, Lakshmi, Bheema;
  Gauri's photo is bundled in `assets/gauri.png`). No backend is wired up.
- **Languages:** every user-facing string lives in `src/locales/en.json`,
  `hi.json`, `mr.json`. Add new scan/result strings to all three files.

This branch contains the Home screen only. Login/welcome screens are not
included here — they are not up to par yet and will be worked on later.

## Screens in this app

| Route | Screen |
| --- | --- |
| `/` | Home — built from the Stitch Home screen: Quick Actions, My Registered Animals, AI Animal Health Scan card, and Farm Services (i-Learning, Vaccination) |
| `/animals` | My Animals — Gauri, Nandi, Lakshmi, Bheema (demo data), reached from Home |
| `/scan` | AI Animal Health Scan — placeholder until the camera screen code arrives; it already receives the animal + camera/gallery choice from the Home popup, plus the triage disclaimer |
| `/marketplace` | Marketplace — planned feature placeholder |
| `/profile` | Farmer Profile + language switcher |

Bottom tabs match the Stitch Home dock, in order: **Home / Marketplace / Farmer Profile**.
Animals and Scan are stack screens reached from Home, not tabs. If the team wants
the centre Scan tab back, that is a one-file change in `src/app/(tabs)/_layout.tsx`.

## Languages

English, Hindi, and Marathi, from day one.

- Translations live in `src/locales/en.json`, `hi.json`, `mr.json`.
- They are wired up in `src/i18n/index.ts` (i18next + react-i18next).
- The switcher is `src/components/LanguageSwitcher.tsx` and appears on Home and Profile.
- **Rule for every new screen:** add its strings to all three locale files before
  calling the screen done. Never hardcode user-facing text.

## Preview while building (no build needed)

```bash
npm install
npx expo start
```

- **On your phone:** install Expo Go, scan the QR code shown by `expo start`.
  You see the real app, and it refreshes as screens change.
- **In a browser:** press `w` in the Expo terminal, or run `npx expo start --web`.
- **Android emulator / iOS simulator:** press `a` / `i` in the Expo terminal
  (Android Studio / Xcode required; iOS simulator needs macOS).

This is the preview loop to use for every Stitch screen: build the screen,
preview it in Expo Go / web, then move on. No downloadable build is made
unless someone explicitly asks for one.

## How to add a Stitch screen

1. Share the Stitch screenshot / export and name the screen (e.g. "Vaccination Schedule").
2. The screen is built as a file under `src/app/` (a new route) or as a tab
   under `src/app/(tabs)/`.
3. Its strings go into `en.json` / `hi.json` / `mr.json`.
4. Shared UI goes in `src/components/`, colours in `src/theme.ts`.
5. Preview it with `npx expo start` and check all three languages.

## Downloadable builds — only on request

Downloadable builds are **not** produced automatically. When requested:

```bash
# Android APK for direct install (preview profile)
npx eas-cli@latest build --platform android --profile preview

# iOS needs an Apple Developer account; it ships via TestFlight, not a direct file
npx eas-cli@latest build --platform ios --profile preview
```

See `eas.json` for the profiles. First-time EAS setup asks for an Expo account
and, for iOS, Apple credentials — that step is done only when a build is requested.

## Working on this repo (teammates)

```bash
git clone <this-repo-url>
cd farm-family-app
npm install
npx expo start
```

Useful checks before a pull request:

```bash
npm run typecheck
npx expo lint
npx expo-doctor
```

- Do not commit `node_modules/`, `.expo/`, `dist/`, `web-build/`, or generated
  `android/` / `ios/` folders (see `.gitignore`). Native folders are generated
  — configure native behaviour in `app.json` and config plugins instead.
- Do not commit secrets. Copy any future `.env.example` to `.env.local` locally.
- Keep the AI scan framed as triage with the vet disclaimer on every screen
  that shows a scan result.

## Project structure

```
src/
  app/
    _layout.tsx          # root Stack, loads i18n + Plus Jakarta Sans
    (tabs)/
      _layout.tsx        # bottom tabs: Home / Marketplace / Farmer Profile
      index.tsx          # Home (Stitch Home)
      marketplace.tsx
      profile.tsx
    animals.tsx          # stack screen, reached from Home
    scan.tsx             # stack screen, reached from the Home scan popup
    +not-found.tsx
  components/
    LanguageSwitcher.tsx
    AnimalSelectSheet.tsx  # Scan / Upload animal-select bottom sheet
  data/
    animals.ts           # demo animals only
  i18n/
    index.ts
  locales/
    en.json  hi.json  mr.json
  theme.ts
```

## Stack

Expo SDK 58, React Native 0.88, React 19, TypeScript, Expo Router (file-based
routing in `src/app/`), i18next.
