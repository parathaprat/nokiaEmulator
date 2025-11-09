import type { AppDefinition } from '../types/app.types';
import HomeScreen from '../apps/HomeScreen';
import MainMenu from '../apps/MainMenu';
import { MessagesApp } from '../apps/Messages/MessagesApp';
import { ContactsApp } from '../apps/Contacts/ContactsApp';
import { SettingsApp } from '../apps/Settings/SettingsApp';
import { SnakeApp } from '../apps/Snake/SnakeApp';

/**
 * Central registry of all available applications in the emulator
 * Apps with launchable: true will appear in the main menu
 */
export const APP_REGISTRY: AppDefinition[] = [
  {
    id: 'home',
    name: 'Home',
    component: HomeScreen,
    launchable: false,
  },
  {
    id: 'menu',
    name: 'Menu',
    component: MainMenu,
    launchable: false,
  },
  {
    id: 'messages',
    name: 'Messages',
    icon: '✉️',
    component: MessagesApp,
    launchable: true,
  },
  {
    id: 'contacts',
    name: 'Contacts',
    icon: '👤',
    component: ContactsApp,
    launchable: true,
  },
  {
    id: 'snake',
    name: 'Snake',
    icon: '🐍',
    component: SnakeApp,
    launchable: true,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '⚙️',
    component: SettingsApp,
    launchable: true,
  },
];

/**
 * Helper function to retrieve an app definition by its ID
 * @param appId - The unique identifier of the app
 * @returns The app definition if found, undefined otherwise
 */
export function getAppById(appId: string): AppDefinition | undefined {
  return APP_REGISTRY.find((app) => app.id === appId);
}

/**
 * Helper function to get all launchable apps (apps that appear in the main menu)
 * @returns Array of app definitions that are launchable
 */
export function getLaunchableApps(): AppDefinition[] {
  return APP_REGISTRY.filter((app) => app.launchable);
}
