import React, { createContext, useContext, useCallback, useRef, useEffect } from 'react';
import type { NokiaKeyAction, KeyHandler, InputContextValue } from '../types/input.types';
import { useSound } from '../hooks/useSound';

// Create the context
const InputContext = createContext<InputContextValue | undefined>(undefined);

// Provider props
interface InputProviderProps {
  children: React.ReactNode;
}

// Keyboard mapping from physical keys to NokiaKeyAction
const KEYBOARD_MAP: Record<string, NokiaKeyAction> = {
  'ArrowUp': 'UP',
  'ArrowDown': 'DOWN',
  'ArrowLeft': 'LEFT',
  'ArrowRight': 'RIGHT',
  'Enter': 'SELECT',
  'Escape': 'BACK',
  'q': 'SOFT_LEFT',
  'Q': 'SOFT_LEFT',
  'a': 'SOFT_LEFT',
  'A': 'SOFT_LEFT',
  'e': 'SOFT_RIGHT',
  'E': 'SOFT_RIGHT',
  'd': 'SOFT_RIGHT',
  'D': 'SOFT_RIGHT',
  '0': 'DIGIT_0',
  '1': 'DIGIT_1',
  '2': 'DIGIT_2',
  '3': 'DIGIT_3',
  '4': 'DIGIT_4',
  '5': 'DIGIT_5',
  '6': 'DIGIT_6',
  '7': 'DIGIT_7',
  '8': 'DIGIT_8',
  '9': 'DIGIT_9',
  '*': 'STAR',
  '#': 'HASH',
};

export const InputProvider: React.FC<InputProviderProps> = ({ children }) => {
  // Stack of key handlers - most recent handler is at the end
  const handlersRef = useRef<KeyHandler[]>([]);
  
  // Debounce tracking to prevent double-triggers
  const lastInputTimeRef = useRef<number>(0);
  const DEBOUNCE_MS = 50;
  
  // Sound hook for audio feedback
  const { playKeypress } = useSound();

  // Dispatch input to the most recent handler
  const dispatchInput = useCallback((action: NokiaKeyAction) => {
    const now = Date.now();
    
    // Debounce rapid key presses
    if (now - lastInputTimeRef.current < DEBOUNCE_MS) {
      return;
    }
    lastInputTimeRef.current = now;

    // Play keypress sound (respects settings)
    try {
      playKeypress();
    } catch (error) {
      // Silently handle audio errors - don't block input
      console.debug('Audio playback error:', error);
    }

    // Get the most recent handler (top of stack)
    const handlers = handlersRef.current;
    if (handlers.length > 0) {
      const topHandler = handlers[handlers.length - 1];
      try {
        topHandler(action);
      } catch (error) {
        console.error('Error in key handler:', error);
      }
    }
  }, [playKeypress]);

  // Register a new key handler (push to stack)
  const registerKeyHandler = useCallback((handler: KeyHandler) => {
    handlersRef.current.push(handler);
  }, []);

  // Unregister a key handler (remove from stack)
  const unregisterKeyHandler = useCallback((handler: KeyHandler) => {
    handlersRef.current = handlersRef.current.filter(h => h !== handler);
  }, []);

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const action = KEYBOARD_MAP[event.key];
      
      if (action) {
        // Prevent default browser behavior for mapped keys
        event.preventDefault();
        dispatchInput(action);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatchInput]);

  const value: InputContextValue = {
    dispatchInput,
    registerKeyHandler,
    unregisterKeyHandler,
  };

  return (
    <InputContext.Provider value={value}>
      {children}
    </InputContext.Provider>
  );
};

// Custom hook to use the InputContext
export const useInput = (): InputContextValue => {
  const context = useContext(InputContext);
  
  if (context === undefined) {
    throw new Error('useInput must be used within an InputProvider');
  }
  
  return context;
};
