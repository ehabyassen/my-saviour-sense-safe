import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the audio directory if it doesn't exist
const audioDir = path.join(__dirname, '../../public/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Download a standard ringtone
const file = fs.createWriteStream(path.join(audioDir, 'ringtone.mp3'));
https.get('https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3', (response) => {
  response.pipe(file);
  
  file.on('finish', () => {
    file.close();
    console.log('Ringtone downloaded successfully!');
  });
}).on('error', (err) => {
  fs.unlink(path.join(audioDir, 'ringtone.mp3'));
  console.error('Error downloading ringtone:', err.message);
}); 