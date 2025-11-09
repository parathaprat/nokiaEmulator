import React, { useEffect, useState } from 'react';
import type { NokiaAppProps } from '../types/app.types';
import { useInput } from '../core/InputContext';
import type { NokiaKeyAction } from '../types/input.types';
import { getLaunchableApps } from '../core/appRegistry';

/**
 * MainMenu component - Displays a list of launchable apps
 * Allows navigation with UP/DOWN keys and selection with SELECT or SOFT_LEFT
 */
const MainMenu: React.FC<NokiaAppProps> = ({ setSoftkeys, openApp, goBack }) => {
  const { registerKeyHandler, unregisterKeyHandler } = useInput();
  const launchableApps = getLaunchableApps();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Set softkey labels when component mounts
  useEffect(() => {
    setSoftkeys('Select', 'Back');
  }, [setSoftkeys]);

  // Register key handler
  useEffect(() => {
    const handleKey = (action: NokiaKeyAction) => {
      switch (action) {
        case 'UP':
          // Move selection up with wrap-around
          setSelectedIndex((prev) => 
            prev === 0 ? launchableApps.length - 1 : prev - 1
          );
          break;
        case 'DOWN':
          // Move selection down with wrap-around
          setSelectedIndex((prev) => 
            prev === launchableApps.length - 1 ? 0 : prev + 1
          );
          break;
        case 'SELECT':
        case 'SOFT_LEFT':
          // Open the selected app
          if (launchableApps[selectedIndex]) {
            openApp(launchableApps[selectedIndex].id);
          }
          break;
        case 'SOFT_RIGHT':
          // Go back to home
          goBack();
          break;
      }
    };

    registerKeyHandler(handleKey);

    // Cleanup: unregister when component unmounts
    return () => {
      unregisterKeyHandler(handleKey);
    };
  }, [registerKeyHandler, unregisterKeyHandler, openApp, goBack, selectedIndex, launchableApps]);

  return (
    <div className="flex flex-col h-full p-2">
      {/* Title */}
      <div className="text-lg font-bold mb-2 border-b border-current pb-1">
        Menu
      </div>
      
      {/* App list */}
      <div className="flex-1 overflow-y-auto">
        {launchableApps.map((app, index) => (
          <div
            key={app.id}
            className={`flex items-center gap-2 py-1 px-2 ${
              index === selectedIndex ? 'bg-[#0f380f] text-[#9ca89c]' : ''
            }`}
          >
            {/* Selection indicator */}
            <span className="w-2">
              {index === selectedIndex ? '>' : ' '}
            </span>
            
            {/* App icon */}
            {app.icon && <span className="text-base">{app.icon}</span>}
            
            {/* App name */}
            <span className="text-sm">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
