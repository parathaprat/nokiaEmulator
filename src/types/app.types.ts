/**
 * Props interface that all Nokia apps must implement
 */
export interface NokiaAppProps {
  setSoftkeys: (left?: string, right?: string) => void;
  openApp: (appId: string) => void;
  goBack: () => void;
}

/**
 * App definition for the app registry
 */
export interface AppDefinition {
  id: string;
  name: string;
  icon?: string;
  component: React.ComponentType<NokiaAppProps>;
  launchable: boolean; // If true, appears in main menu
}
