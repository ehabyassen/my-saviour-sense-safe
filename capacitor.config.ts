
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ea2f88de72454634936b94ae14056051',
  appName: 'my-saviour-sense-safe',
  webDir: 'dist',
  server: {
    url: "https://ea2f88de-7245-4634-936b-94ae14056051.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1E1B4B",
      showSpinner: true,
      spinnerColor: "#3B82F6",
      androidSpinnerStyle: "large"
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#1E1B4B"
    }
  }
};

export default config;
