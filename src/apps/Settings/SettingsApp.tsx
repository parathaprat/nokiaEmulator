import { useEffect, useState } from 'react';
import type { NokiaAppProps } from '../../types/app.types';
import type { NokiaKeyAction } from '../../types/input.types';
import { useInput } from '../../core/InputContext';
import { useSettings } from './settingsState';

type ScreenType = 'menu' | 'ringtones' | 'display' | 'about';

interface MenuItem {
  id: string;
  label: string;
  screen?: ScreenType;
  getValue?: () => string;
}

export function SettingsApp({ setSoftkeys, goBack }: NokiaAppProps) {
  const { registerKeyHandler, unregisterKeyHandler } = useInput();
  const { settings, toggleSound } = useSettings();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('menu');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Define menu items
  const menuItems: MenuItem[] = [
    {
      id: 'ringtones',
      label: 'Ringtones',
      screen: 'ringtones',
    },
    {
      id: 'sound',
      label: 'Sound',
      getValue: () => settings.soundEnabled ? 'ON' : 'OFF',
    },
    {
      id: 'display',
      label: 'Display',
      screen: 'display',
    },
    {
      id: 'about',
      label: 'About Phone',
      screen: 'about',
    },
  ];

  // Set softkeys based on current screen
  useEffect(() => {
    if (currentScreen === 'menu') {
      setSoftkeys('Change', 'Back');
    } else {
      setSoftkeys('', 'Back');
    }
  }, [currentScreen, setSoftkeys]);

  // Register key handler
  useEffect(() => {
    const handleKey = (action: NokiaKeyAction) => {
      if (currentScreen === 'menu') {
        switch (action) {
          case 'UP':
            setSelectedIndex((prev) => 
              prev > 0 ? prev - 1 : menuItems.length - 1
            );
            break;
          case 'DOWN':
            setSelectedIndex((prev) => 
              prev < menuItems.length - 1 ? prev + 1 : 0
            );
            break;
          case 'SELECT':
          case 'SOFT_LEFT': {
            const selectedItem = menuItems[selectedIndex];
            
            // Handle sound toggle
            if (selectedItem.id === 'sound') {
              toggleSound();
            }
            // Handle navigation to sub-screens
            else if (selectedItem.screen) {
              setCurrentScreen(selectedItem.screen);
            }
            break;
          }
          case 'SOFT_RIGHT':
          case 'BACK':
            goBack();
            break;
        }
      } else {
        // Handle sub-screens
        switch (action) {
          case 'SOFT_RIGHT':
          case 'BACK':
            setCurrentScreen('menu');
            break;
        }
      }
    };

    registerKeyHandler(handleKey);

    return () => {
      unregisterKeyHandler(handleKey);
    };
  }, [currentScreen, selectedIndex, menuItems, toggleSound, registerKeyHandler, unregisterKeyHandler, goBack]);

  return (
    <div className="flex flex-col h-full p-2 text-xs">
      {currentScreen === 'menu' && (
        <>
          <div className="font-bold mb-2">Settings</div>
          <div className="flex-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className={`mb-1 p-1 ${
                  index === selectedIndex ? 'bg-[#0f380f] text-[#9ca89c]' : ''
                }`}
              >
                <span>{index === selectedIndex ? '> ' : '  '}</span>
                <span>{item.label}</span>
                {item.getValue && (
                  <span className="float-right">{item.getValue()}</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {currentScreen === 'ringtones' && (
        <>
          <div className="font-bold mb-2">Ringtones</div>
          <div className="flex-1 overflow-y-auto">
            <div className="mb-2">
              <div className="p-1">Nokia Tune</div>
              <div className="p-1">Ascending</div>
              <div className="p-1">Badinerie</div>
              <div className="p-1">Grande Valse</div>
            </div>
          </div>
        </>
      )}

      {currentScreen === 'display' && (
        <>
          <div className="font-bold mb-2">Display</div>
          <div className="flex-1 overflow-y-auto">
            <div className="mb-2">
              <div className="p-1">Contrast: Normal</div>
              <div className="p-1">Backlight: 15 sec</div>
            </div>
          </div>
        </>
      )}

      {currentScreen === 'about' && (
        <>
          <div className="font-bold mb-2">About Phone</div>
          <div className="flex-1 overflow-y-auto">
            <div className="mb-2">
              <div className="p-1">Model: Nokia 3310</div>
              <div className="p-1">Version: 5.11</div>
              <div className="p-1 mt-2 text-center">
                Browser Emulator
              </div>
              <div className="p-1 text-center">
                (c) 2024
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
