import React, { useEffect } from 'react';
import { InputProvider, useInput } from '../core/InputContext';
import { EmulatorStateProvider, useEmulatorState } from '../core/EmulatorState';
import { PhoneShell } from './PhoneShell';
import { NokiaScreen } from './NokiaScreen';
import { Keypad } from './Keypad';
import { getAppById } from '../core/appRegistry';
import type { NokiaKeyAction } from '../types/input.types';

/**
 * Inner component that uses the contexts
 * This component renders the active app and connects all the pieces
 */
const EmulatorContent: React.FC = () => {
  const { dispatchInput, registerKeyHandler, unregisterKeyHandler } = useInput();
  const { activeAppId, softkeys, openApp, goBack, setSoftkeys } = useEmulatorState();

  // Get the active app from the registry
  const activeApp = getAppById(activeAppId);

  // Note: We don't register a handler here because each app registers its own handler
  // The InputContext manages a stack of handlers, and the most recent one gets called

  // Handle keypad button presses
  const handleKeypadPress = (action: NokiaKeyAction) => {
    dispatchInput(action);
  };

  // Render the active app component
  const renderActiveApp = () => {
    if (!activeApp) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-center">App not found</p>
        </div>
      );
    }

    const AppComponent = activeApp.component;

    return (
      <AppComponent
        onKey={(action: NokiaKeyAction) => {
          // Apps can handle keys directly through this callback
          console.log('App handling key:', action);
        }}
        setSoftkeys={setSoftkeys}
        openApp={openApp}
        goBack={goBack}
      />
    );
  };

  return (
    <div className="emulator-container w-full h-full flex items-center justify-center">
      <PhoneShell>
        <NokiaScreen
          softLeft={softkeys.left}
          softRight={softkeys.right}
        >
          {renderActiveApp()}
        </NokiaScreen>
        <Keypad onKeyPress={handleKeypadPress} />
      </PhoneShell>
    </div>
  );
};

/**
 * Emulator root component
 * Top-level orchestrator that provides contexts and centers the phone shell
 */
export const Emulator: React.FC = () => {
  return (
    <InputProvider>
      <EmulatorStateProvider>
        <EmulatorContent />
      </EmulatorStateProvider>
    </InputProvider>
  );
};
