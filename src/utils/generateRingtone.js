const fs = require('fs');
const path = require('path');

// Create a simple ringtone using the Web Audio API
function generateRingtone() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  // Configure the oscillator
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);

  // Configure the gain node for volume envelope
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);

  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Start and stop the oscillator
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);

  // Create a MediaRecorder to capture the audio
  const mediaRecorder = new MediaRecorder(audioContext.destination.stream);
  const chunks = [];

  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    
    // Save the file
    const audioPath = path.join(__dirname, '../../public/audio/ringtone.mp3');
    fs.writeFileSync(audioPath, Buffer.from(await blob.arrayBuffer()));
  };

  mediaRecorder.start();
  setTimeout(() => mediaRecorder.stop(), 300);
}

// Run the generator
generateRingtone(); 