import React, { createContext, useContext, useState, useCallback } from 'react';

// EmulatorState interface
interface EmulatorState {
  activeAppId: string;
  navigationStack: string[];
  softkeys: {
    left?: string;
    right?: string;
  };
}

// Context value interface
interface EmulatorStateContextValue {
  activeAppId: string;
  navigationStack: string[];
  softkeys: {
    left?: string;
    right?: string;
  };
  openApp: (appId: string) => void;
  goBack: () => void;
  goHome: () => void;
  setSoftkeys: (left?: string, right?: string) => void;
}

// Create the context
const EmulatorStateContext = createContext<EmulatorStateContextValue | undefined>(undefined);

// Provider props
interface EmulatorStateProviderProps {
  children: React.ReactNode;
}

// Default home app ID
const HOME_APP_ID = 'home';

export const EmulatorStateProvider: React.FC<EmulatorStateProviderProps> = ({ children }) => {
  // Initialize state with home screen as active app
  const [state, setState] = useState<EmulatorState>({
    activeAppId: HOME_APP_ID,
    navigationStack: [],
    softkeys: {},
  });

  // Open a new app - pushes current app to stack and activates new app
  const openApp = useCallback((appId: string) => {
    setState(prevState => {
      // Push current app to navigation stack
      const newStack = [...prevState.navigationStack, prevState.activeAppId];
      
      return {
        ...prevState,
        activeAppId: appId,
        navigationStack: newStack,
        softkeys: {}, // Reset softkeys when changing apps
      };
    });
  }, []);

  // Go back - pops navigation stack and returns to previous app
  const goBack = useCallback(() => {
    setState(prevState => {
      // If stack is empty, stay on current app (or go home)
      if (prevState.navigationStack.length === 0) {
        // If not already on home, go to home
        if (prevState.activeAppId !== HOME_APP_ID) {
          return {
            ...prevState,
            activeAppId: HOME_APP_ID,
            softkeys: {},
          };
        }
        // Already on home with empty stack, do nothing
        return prevState;
      }

      // Pop the last app from stack
      const newStack = [...prevState.navigationStack];
      const previousAppId = newStack.pop()!;

      return {
        ...prevState,
        activeAppId: previousAppId,
        navigationStack: newStack,
        softkeys: {},
      };
    });
  }, []);

  // Go home - clears stack and returns to home screen
  const goHome = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      activeAppId: HOME_APP_ID,
      navigationStack: [],
      softkeys: {},
    }));
  }, []);

  // Update softkey labels
  const setSoftkeys = useCallback((left?: string, right?: string) => {
    setState(prevState => ({
      ...prevState,
      softkeys: {
        left,
        right,
      },
    }));
  }, []);

  const value: EmulatorStateContextValue = {
    activeAppId: state.activeAppId,
    navigationStack: state.navigationStack,
    softkeys: state.softkeys,
    openApp,
    goBack,
    goHome,
    setSoftkeys,
  };

  return (
    <EmulatorStateContext.Provider value={value}>
      {children}
    </EmulatorStateContext.Provider>
  );
};

// Custom hook to use the EmulatorStateContext
export const useEmulatorState = (): EmulatorStateContextValue => {
  const context = useContext(EmulatorStateContext);
  
  if (context === undefined) {
    throw new Error('useEmulatorState must be used within an EmulatorStateProvider');
  }
  
  return context;
};
