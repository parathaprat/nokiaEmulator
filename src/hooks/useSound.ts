import { useEffect, useRef, useCallback } from 'react';
import { generateBeepSound } from '../assets/sounds/generateBeep';
import { loadState } from '../core/storage';

/**
 * Custom hook for managing audio playback
 * Handles keypress beep sounds with settings integration
 * 
 * @returns Object with playKeypress function
 */
export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const beepBufferRef = useRef<AudioBuffer | null>(null);
  const soundEnabledRef = useRef<boolean>(true);

  // Initialize audio context and preload sounds
  useEffect(() => {
    try {
      // Create audio context (lazy initialization)
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.warn('Web Audio API not supported');
        return;
      }

      audioContextRef.current = new AudioContextClass();
      
      // Generate and cache the beep sound
      beepBufferRef.current = generateBeepSound(audioContextRef.current);
      
      // Load sound enabled setting
      soundEnabledRef.current = loadState('settings.soundEnabled', true);
      
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }

    // Cleanup
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, []);

  /**
   * Play keypress beep sound
   * Only plays if sound is enabled in settings
   */
  const playKeypress = useCallback(() => {
    // Check if sound is enabled
    const soundEnabled = loadState('settings.soundEnabled', true);
    soundEnabledRef.current = soundEnabled;
    
    if (!soundEnabled) {
      return;
    }

    try {
      const audioContext = audioContextRef.current;
      const beepBuffer = beepBufferRef.current;
      
      if (!audioContext || !beepBuffer) {
        return;
      }

      // Resume audio context if suspended (browser autoplay policy)
      if (audioContext.state === 'suspended') {
        audioContext.resume().catch(console.error);
      }

      // Create and play the sound
      const source = audioContext.createBufferSource();
      source.buffer = beepBuffer;
      source.connect(audioContext.destination);
      source.start(0);
      
    } catch (error) {
      // Silently handle audio playback errors
      console.debug('Audio playback error:', error);
    }
  }, []);

  return {
    playKeypress,
  };
}
