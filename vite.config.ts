import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// Local dev certificates are git-ignored. Serve HTTPS only when they exist.
const hasDevCerts = fs.existsSync('./key.pem') && fs.existsSync('./cert.pem');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    https: hasDevCerts
      ? {
          key: fs.readFileSync('./key.pem'),
          cert: fs.readFileSync('./cert.pem'),
        }
      : undefined,
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
