/**
 * Storage schema defining all persisted state keys and their types
 */
export interface StorageSchema {
  'settings.soundEnabled': boolean;
  'snake.highScore': number;
  'emulator.lastActiveApp': string;
}

/**
 * Type-safe storage key type
 */
export type StorageKey = keyof StorageSchema;

/**
 * Type-safe storage value type based on key
 */
export type StorageValue<K extends StorageKey> = StorageSchema[K];
