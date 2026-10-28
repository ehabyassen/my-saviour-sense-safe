# MySaviour

**A personal-safety mobile app prototype: one long press to raise an alarm, and a fake incoming call
to get out of an uncomfortable situation.**

MySaviour is a React + Capacitor app for Android. I built it in April 2025 to try out fast,
AI-assisted prototyping: I generated the UI scaffold with Lovable, then added the social sign-up
flows, the OAuth token-exchange server and the Android build myself.

> **Prototype status:** the emergency alert and location sharing are **simulated** (UI and
> notifications only). No contacts are messaged and no location leaves the device. Don't rely on
> it for real emergencies.

## Features

| Feature | What it does | Status |
|---|---|---|
| Emergency button | Hold for 2 seconds (with a progress ring) to trigger an alert, which prevents accidental presses | UI done; alert simulated |
| Fake call | A full-screen incoming-call screen with a ringtone and a running call timer | Working |
| Safety map | Shows your location and nearby safe places | Simulated |
| Safety tips | A library of safety guidance cards | Working |
| Social sign-up | Google and Twitter (OAuth 2.0 authorization code flow), Facebook | Working in dev |
| Settings, help, terms, privacy | Supporting pages | Working |

## Architecture

```
React (Vite, TypeScript, shadcn/ui, Tailwind)  ──►  Capacitor 7  ──►  Android app
        │
        └── OAuth callbacks ──► server.js (Express) ──► Google / Twitter token endpoints
```

`server.js` exchanges OAuth authorization codes for tokens on the server, so client secrets never
ship in the app bundle.

## Run locally

```bash
npm install
cp .env.example .env       # fill in your OAuth client IDs and secrets (.env is git-ignored)
node server.js             # OAuth token-exchange API on :3001
npm run dev                # web app on :8080
```

| Variable | Purpose |
|---|---|
| `VITE_GOOGLE_CLIENT_ID`, `VITE_GOOGLE_CLIENT_SECRET`, `VITE_GOOGLE_REDIRECT_URI` | Google OAuth |
| `VITE_TWITTER_CLIENT_ID`, `VITE_TWITTER_CLIENT_SECRET`, `VITE_TWITTER_REDIRECT_URI` | Twitter OAuth 2.0 |
| `VITE_FACEBOOK_APP_ID` | Facebook login |
| `PORT` | API server port (default 3001) |

## Android

```bash
npm run build
npx cap sync android
npx cap open android       # build and run from Android Studio (JDK 17)
```

`capacitor.config.ts` currently points `server.url` at the hosted Lovable preview for live reload.
Remove that block to bundle the local `dist/` build.

## Next steps

- Real alerting: SMS or push to emergency contacts with a live location link
  (`@capacitor/geolocation` is already installed)
- A real map provider and a nearby-safe-places search
- Move secrets out of `VITE_*` variables (Vite exposes those to the client) into server-only config

## Author

**Ehab Ahmed**: [LinkedIn](https://linkedin.com/in/ehabyassen) · [GitHub](https://github.com/ehabyassen)
