import React, { useEffect } from 'react';
import type { NokiaAppProps } from '../types/app.types';
import { useInput } from '../core/InputContext';
import type { NokiaKeyAction } from '../types/input.types';

/**
 * HomeScreen component - The default home screen of the Nokia 3310 emulator
 * Displays the NOKIA branding and current date
 */
const HomeScreen: React.FC<NokiaAppProps> = ({ setSoftkeys, openApp }) => {
  const { registerKeyHandler, unregisterKeyHandler } = useInput();

  // Set softkey labels when component mounts
  useEffect(() => {
    setSoftkeys('Menu', 'Names');
  }, [setSoftkeys]);

  // Register key handler
  useEffect(() => {
    const handleKey = (action: NokiaKeyAction) => {
      switch (action) {
        case 'SOFT_LEFT':
        case 'SELECT':
        case 'UP':
        case 'DOWN':
        case 'LEFT':
        case 'RIGHT':
          // Any key press opens main menu from home screen
          openApp('menu');
          break;
        case 'SOFT_RIGHT':
          // Open contacts
          openApp('contacts');
          break;
      }
    };

    registerKeyHandler(handleKey);

    // Cleanup: unregister when component unmounts
    return () => {
      unregisterKeyHandler(handleKey);
    };
  }, [registerKeyHandler, unregisterKeyHandler, openApp]);

  // Get current date formatted as "Day DD Mon"
  const getCurrentDate = () => {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    
    return `${dayName} ${day} ${month}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* NOKIA branding - large centered text */}
      <div className="text-4xl font-bold mb-4 tracking-wider">
        NOKIA
      </div>
      
      {/* Current date */}
      <div className="text-sm">
        {getCurrentDate()}
      </div>
    </div>
  );
};

export default HomeScreen;
