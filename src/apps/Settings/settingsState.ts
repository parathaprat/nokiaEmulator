import { useState } from 'react';
import { loadState, saveState } from '../../core/storage';

/**
 * Settings interface defining all available settings
 */
export interface Settings {
  soundEnabled: boolean;
}

/**
 * Default settings values
 */
const DEFAULT_SETTINGS: Settings = {
  soundEnabled: true,
};

/**
 * Custom hook for managing settings state with persistence
 * 
 * @returns Settings state and update function
 */
export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    // Load initial settings from storage on mount
    const soundEnabled = loadState('settings.soundEnabled', DEFAULT_SETTINGS.soundEnabled);
    return {
      soundEnabled,
    };
  });

  /**
   * Update a specific setting and persist to storage
   * 
   * @param key - Setting key to update
   * @param value - New value for the setting
   */
  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      
      // Persist to storage
      if (key === 'soundEnabled') {
        saveState('settings.soundEnabled', value as boolean);
      }
      
      return newSettings;
    });
  };

  /**
   * Toggle sound enabled setting
   */
  const toggleSound = () => {
    updateSetting('soundEnabled', !settings.soundEnabled);
  };

  return {
    settings,
    updateSetting,
    toggleSound,
  };
}
