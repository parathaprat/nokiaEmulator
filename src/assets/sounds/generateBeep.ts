/**
 * Generate a short beep sound using Web Audio API
 * This creates a simple tone that mimics the Nokia keypress sound
 * 
 * @returns AudioBuffer containing the beep sound
 */
export function generateBeepSound(audioContext: AudioContext): AudioBuffer {
  const sampleRate = audioContext.sampleRate;
  const duration = 0.05; // 50ms - short beep
  const frequency = 1200; // Hz - high-pitched beep
  
  const length = sampleRate * duration;
  const buffer = audioContext.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  
  // Generate a simple sine wave with envelope
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-t * 20); // Quick decay
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3; // 0.3 = volume
  }
  
  return buffer;
}
