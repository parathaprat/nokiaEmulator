import type { StorageKey, StorageValue } from '../types/storage.types';

/**
 * In-memory storage fallback when localStorage is unavailable
 */
const memoryStorage = new Map<string, string>();

/**
 * Check if localStorage is available and working
 */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Flag to track localStorage availability
 */
let useLocalStorage = isLocalStorageAvailable();

/**
 * Save a value to storage with type safety
 * 
 * @param key - Storage key from StorageSchema
 * @param value - Value matching the key's type
 * @returns true if save was successful, false otherwise
 */
export function saveState<K extends StorageKey>(
  key: K,
  value: StorageValue<K>
): boolean {
  try {
    const serialized = JSON.stringify(value);
    
    if (useLocalStorage) {
      try {
        localStorage.setItem(key, serialized);
        return true;
      } catch (error) {
        // Handle quota exceeded or other localStorage errors
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          console.warn('LocalStorage quota exceeded, falling back to memory storage');
        } else {
          console.warn('LocalStorage error, falling back to memory storage:', error);
        }
        
        // Fall back to memory storage
        useLocalStorage = false;
        memoryStorage.set(key, serialized);
        return true;
      }
    } else {
      // Use in-memory storage
      memoryStorage.set(key, serialized);
      return true;
    }
  } catch (error) {
    console.error('Failed to save state:', error);
    return false;
  }
}

/**
 * Load a value from storage with type safety
 * 
 * @param key - Storage key from StorageSchema
 * @param defaultValue - Default value to return if key doesn't exist
 * @returns The stored value or the default value
 */
export function loadState<K extends StorageKey>(
  key: K,
  defaultValue: StorageValue<K>
): StorageValue<K> {
  try {
    let serialized: string | null = null;
    
    if (useLocalStorage) {
      try {
        serialized = localStorage.getItem(key);
      } catch (error) {
        console.warn('LocalStorage read error, falling back to memory storage:', error);
        useLocalStorage = false;
        serialized = memoryStorage.get(key) || null;
      }
    } else {
      // Use in-memory storage
      serialized = memoryStorage.get(key) || null;
    }
    
    if (serialized === null) {
      return defaultValue;
    }
    
    const parsed = JSON.parse(serialized) as StorageValue<K>;
    return parsed;
  } catch (error) {
    console.error('Failed to load state:', error);
    return defaultValue;
  }
}

/**
 * Remove a value from storage
 * 
 * @param key - Storage key to remove
 * @returns true if removal was successful, false otherwise
 */
export function removeState(key: StorageKey): boolean {
  try {
    if (useLocalStorage) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn('LocalStorage remove error:', error);
        useLocalStorage = false;
        memoryStorage.delete(key);
      }
    } else {
      memoryStorage.delete(key);
    }
    return true;
  } catch (error) {
    console.error('Failed to remove state:', error);
    return false;
  }
}

/**
 * Clear all storage
 * 
 * @returns true if clear was successful, false otherwise
 */
export function clearStorage(): boolean {
  try {
    if (useLocalStorage) {
      try {
        localStorage.clear();
      } catch (error) {
        console.warn('LocalStorage clear error:', error);
        useLocalStorage = false;
        memoryStorage.clear();
      }
    } else {
      memoryStorage.clear();
    }
    return true;
  } catch (error) {
    console.error('Failed to clear storage:', error);
    return false;
  }
}
