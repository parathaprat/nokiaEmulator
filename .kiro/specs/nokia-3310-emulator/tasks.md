# Implementation Plan

- [x] 1. Initialize project structure and dependencies
  - Create Vite React + TypeScript project named `nokia-3310-emulator`
  - Install and configure TailwindCSS with custom Nokia theme colors
  - Create folder structure: `src/components`, `src/apps`, `src/core`, `src/hooks`, `src/types`, `src/assets`, `src/styles`
  - Set up global CSS reset and dark background styling
  - Configure TypeScript with strict mode enabled
  - _Requirements: 14.1, 14.2, 14.5_

- [x] 2. Implement core type definitions
  - Create `src/types/input.types.ts` with `NokiaKeyAction` type and input-related interfaces
  - Create `src/types/app.types.ts` with `AppDefinition`, `NokiaAppProps`, and app-related interfaces
  - Create `src/types/storage.types.ts` with `StorageSchema` interface
  - _Requirements: 3.6, 4.6_

- [x] 3. Build InputContext system
  - Create `src/core/InputContext.tsx` with context provider and hook
  - Implement `dispatchInput` function that broadcasts key actions to registered handlers
  - Implement handler registration/unregistration with stack-based priority
  - Create keyboard event listener mapping physical keys to `NokiaKeyAction` values
  - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 4. Build EmulatorState management
  - Create `src/core/EmulatorState.tsx` with context provider and hook
  - Implement state structure with `activeAppId`, `navigationStack`, and `softkeys`
  - Implement `openApp` function that pushes to navigation stack and updates active app
  - Implement `goBack` function that pops navigation stack
  - Implement `goHome` function that clears stack and returns to home
  - Implement `setSoftkeys` function for updating softkey labels
  - _Requirements: 4.2, 4.3, 4.4, 4.5_

- [x] 5. Create storage utilities
  - Create `src/core/storage.ts` with `saveState` and `loadState` functions
  - Implement localStorage wrapper with error handling for quota exceeded
  - Implement fallback to in-memory storage when localStorage unavailable
  - Add type-safe storage keys based on `StorageSchema`
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 6. Build PhoneShell component
  - Create `src/components/PhoneShell.tsx` with visual phone body styling
  - Apply dimensions (260px × 540px), rounded corners, gradient background
  - Implement CSS Grid layout with screen area (top 40%) and keypad area (bottom 60%)
  - Add box shadows and borders for 3D plastic effect
  - Implement responsive scaling for smaller viewports while maintaining aspect ratio
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 13.1, 13.2, 13.3_

- [x] 7. Build NokiaScreen component and sub-components
- [x] 7.1 Create StatusBar component
  - Create `src/components/StatusBar.tsx` with signal, time, and battery display
  - Implement signal bars rendering (0-4 bars based on prop)
  - Implement battery icon that changes based on percentage
  - Format time display in HH:MM format
  - _Requirements: 2.2_

- [x] 7.2 Create SoftkeyBar component
  - Create `src/components/SoftkeyBar.tsx` with left and right label areas
  - Implement two-column flex layout with labels at edges
  - Style labels to match Nokia font and positioning
  - _Requirements: 2.4_

- [x] 7.3 Create NokiaScreen component
  - Create `src/components/NokiaScreen.tsx` that composes StatusBar, content area, and SoftkeyBar
  - Apply monochrome LCD styling (greenish-gray background, dark text)
  - Set dimensions to 336px × 192px (4x scale of 84×48)
  - Implement inset shadow for recessed screen effect
  - Use monospaced font (Courier New or custom pixel font)
  - Render children in scrollable content area
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 13.4_

- [x] 8. Build Keypad component
  - Create `src/components/Keypad.tsx` with all Nokia 3310 buttons
  - Implement CSS Grid layout for button positioning (directional pad, numeric grid, function buttons)
  - Create buttons for: UP, DOWN, LEFT, RIGHT, SELECT, CALL, END, CLEAR, 0-9, *, #
  - Add click handlers that call `onKeyPress` prop with corresponding `NokiaKeyAction`
  - Apply visual feedback (active state) on button press
  - Style buttons to match Nokia aesthetic
  - _Requirements: 3.1, 3.2_

- [x] 9. Create app registry
  - Create `src/core/appRegistry.ts` with `APP_REGISTRY` array
  - Define registry entries for: home, menu, messages, contacts, snake, settings
  - Include app metadata: id, name, icon, component reference, launchable flag
  - Export helper function to get app by ID
  - _Requirements: 4.1_

- [x] 10. Build Emulator root component
  - Create `src/components/Emulator.tsx` as top-level orchestrator
  - Wrap app in InputContext.Provider and EmulatorStateProvider
  - Render PhoneShell with NokiaScreen and Keypad
  - Attach keyboard event listener using custom hook
  - Apply centering layout and background styling
  - Connect active app from EmulatorState to NokiaScreen content area
  - _Requirements: 1.4, 3.3, 3.4, 3.5, 13.3_

- [x] 11. Implement HomeScreen app
  - Create `src/apps/HomeScreen.tsx` implementing `NokiaAppProps` interface
  - Display "NOKIA" text centered with large font
  - Display current date below carrier name
  - Set softkey labels: left = "Menu", right = "Names"
  - Handle SOFT_LEFT key to open main menu
  - Handle SOFT_RIGHT key to open contacts
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 12. Implement MainMenu app
  - Create `src/apps/MainMenu.tsx` with list of launchable apps from registry
  - Implement selection state with UP/DOWN navigation
  - Render app list with icons and names, highlight selected item
  - Set softkey labels: left = "Select", right = "Back"
  - Handle UP/DOWN keys to move selection with wrap-around
  - Handle SELECT or SOFT_LEFT to open selected app
  - Handle SOFT_RIGHT to go back to home
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 13. Implement Messages app
- [x] 13.1 Create mock message data
  - Create `src/apps/Messages/mockData.ts` with array of fake messages
  - Include fields: id, sender, preview, content, timestamp
  - Create at least 5 sample messages
  - _Requirements: 7.1_

- [x] 13.2 Implement Messages inbox screen
  - Create `src/apps/Messages/MessagesApp.tsx` with inbox list view
  - Render list of messages with sender and preview text
  - Implement selection state with UP/DOWN navigation
  - Set softkey labels: left = "Options", right = "Back"
  - Handle SELECT to open message detail screen
  - Handle SOFT_RIGHT to go back
  - _Requirements: 7.1, 7.2, 7.4, 7.5_

- [x] 13.3 Implement message detail and options screens
  - Add message detail screen showing full content
  - Add options menu screen with Reply, Delete, Back items
  - Handle SOFT_LEFT in inbox to show options menu
  - Handle navigation between screens within Messages app
  - _Requirements: 7.2, 7.3, 7.5_

- [x] 14. Implement Contacts app
- [x] 14.1 Create mock contact data
  - Create `src/apps/Contacts/mockData.ts` with array of fake contacts
  - Include fields: id, name, phone
  - Create at least 6 sample contacts
  - _Requirements: 8.1_

- [x] 14.2 Implement Contacts list and detail screens
  - Create `src/apps/Contacts/ContactsApp.tsx` with contact list view
  - Render list of contact names with selection highlight
  - Implement UP/DOWN navigation through contacts
  - Set softkey labels: left = "View", right = "Back"
  - Handle SELECT to show contact detail card
  - Handle SOFT_RIGHT to go back
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 15. Implement Settings app
- [x] 15.1 Create Settings state management
  - Create `src/apps/Settings/settingsState.ts` with settings interface
  - Implement sound toggle state with persistence to localStorage
  - Load initial settings from storage on mount
  - _Requirements: 9.3, 12.1, 12.3_

- [x] 15.2 Implement Settings screens
  - Create `src/apps/Settings/SettingsApp.tsx` with settings menu
  - Display list of setting categories: Ringtones, Display, About Phone
  - Implement sound toggle with ON/OFF display
  - Set softkey labels: left = "Change", right = "Back"
  - Handle SELECT to open sub-menu for selected category
  - Handle SOFT_RIGHT to go back
  - Update storage when settings change
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 16. Implement Snake game
- [x] 16.1 Create Snake game types and state
  - Create `src/apps/Snake/snakeTypes.ts` with Position, SnakeGameState interfaces
  - Define game grid dimensions (28 × 16 cells)
  - Define game status enum: playing, paused, gameOver
  - _Requirements: 10.1_

- [x] 16.2 Implement Snake game logic hook
  - Create `src/apps/Snake/useSnakeGame.ts` custom hook
  - Implement game loop with 200ms interval using setInterval or requestAnimationFrame
  - Implement snake movement logic (move head, follow body)
  - Implement direction change logic (prevent reversing)
  - Implement collision detection (walls, self)
  - Implement food spawning and consumption
  - Implement score tracking
  - Implement pause/resume functionality
  - _Requirements: 10.2, 10.3, 10.4, 10.5_

- [x] 16.3 Implement Snake game UI
  - Create `src/apps/Snake/SnakeApp.tsx` with game rendering
  - Render game grid using CSS Grid (28 columns × 16 rows)
  - Render snake cells with dark background
  - Render food cell with distinct styling
  - Display current score at top of screen
  - Set softkey labels: left = "Pause", right = "Exit"
  - Handle UP/DOWN/LEFT/RIGHT keys to change direction
  - Handle SOFT_LEFT to toggle pause
  - Handle SOFT_RIGHT to exit to menu
  - _Requirements: 10.1, 10.6, 10.7_

- [x] 16.4 Implement game over and retry flow
  - Display game over screen when collision occurs
  - Show final score on game over screen
  - Set softkey labels: left = "Retry", right = "Exit"
  - Handle SOFT_LEFT to reset and restart game
  - Handle SOFT_RIGHT to exit to menu
  - Persist high score to localStorage
  - _Requirements: 10.4, 10.8, 12.2_

- [x] 17. Implement audio feedback system
- [x] 17.1 Add audio assets
  - Add keypress beep sound file to `src/assets/sounds/` (MP3 or WAV format)
  - Ensure audio file is short (< 100ms) and appropriate volume
  - _Requirements: 11.2, 11.4_

- [x] 17.2 Create sound hook
  - Create `src/hooks/useSound.ts` custom hook
  - Implement audio playback using HTML5 Audio API
  - Check settings state for sound enabled/disabled
  - Preload audio files on mount
  - _Requirements: 11.1, 11.3_

- [x] 17.3 Integrate sound with input system
  - Update InputContext to play keypress sound on each dispatchInput call
  - Only play sound when settings.soundEnabled is true
  - Handle audio playback errors gracefully
  - _Requirements: 11.1, 11.3_

- [x] 18. Wire up App.tsx and main.tsx
  - Create `src/App.tsx` that renders Emulator component in centered container
  - Update `src/main.tsx` to render App component
  - Apply global background styling (dark gradient)
  - Ensure all contexts are properly nested
  - _Requirements: 1.4, 13.3_

- [x] 19. Add final polish and optimizations
  - Apply React.memo to Keypad and StatusBar components
  - Add CSS transitions for screen changes
  - Ensure focus indicators are visible for accessibility
  - Add ARIA labels to interactive elements
  - Verify responsive behavior on mobile viewports
  - Test all keyboard shortcuts
  - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [x] 20. Create build configuration and verify deployment readiness
  - Configure `vite.config.ts` with base path for static hosting
  - Run `npm run build` and verify no TypeScript errors
  - Test production build locally
  - Verify all assets load correctly in production build
  - Check bundle size is reasonable
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_
