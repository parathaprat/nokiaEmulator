# Requirements Document

## Introduction

This document specifies the requirements for a browser-based Nokia 3310 emulator. The Emulator System shall provide an interactive, visually authentic recreation of the Nokia 3310 mobile phone, including its monochrome screen, keypad navigation, and core applications. The system shall run entirely in modern web browsers without requiring backend services or real firmware.

## Glossary

- **Emulator System**: The complete web application that simulates Nokia 3310 functionality
- **Phone Shell**: The visual representation of the Nokia 3310 physical device body
- **Nokia Screen**: The 84x48 monochrome display area scaled for readability
- **Keypad**: The input interface consisting of directional keys, numeric keys, and function keys
- **Input Dispatcher**: The system component that translates keyboard and mouse events into Nokia key actions
- **App Framework**: The internal system for registering, launching, and managing built-in applications
- **Emulator State**: The runtime state manager that tracks active applications and navigation history
- **Status Bar**: The top screen area displaying signal strength, time, and battery level
- **Softkeys**: The two context-sensitive buttons (left and right) whose labels change based on active screen
- **Snake Game**: The fully functional Snake game application
- **Core Apps**: The set of built-in applications (Menu, Contacts, Messages, Settings)

## Requirements

### Requirement 1: Visual Phone Shell

**User Story:** As a user, I want to see a realistic Nokia 3310 phone body on my screen, so that I feel like I'm using an authentic device.

#### Acceptance Criteria

1. THE Emulator System SHALL render the Phone Shell with dimensions approximately 540px height by 260px width
2. THE Phone Shell SHALL display a rounded rectangular body with speaker area, screen area, and keypad area
3. THE Phone Shell SHALL apply visual styling that mimics plastic material including shadows and borders
4. THE Emulator System SHALL center the Phone Shell on the page with a contrasting background
5. WHEN the viewport size changes, THE Phone Shell SHALL maintain its aspect ratio and remain centered

### Requirement 2: Monochrome Screen Display

**User Story:** As a user, I want to see a monochrome screen that looks like the original Nokia display, so that the emulator feels authentic.

#### Acceptance Criteria

1. THE Nokia Screen SHALL render a display area with an aspect ratio approximating the original 84x48 pixel dimensions scaled up for readability
2. THE Nokia Screen SHALL display a Status Bar at the top showing signal strength indicator, current time, and battery level indicator
3. THE Nokia Screen SHALL display a main content area that renders application-specific content
4. THE Nokia Screen SHALL display two Softkey labels at the bottom (left and right positions)
5. THE Nokia Screen SHALL use monospaced or pixel-style font rendering with greenish-gray colors on dark background

### Requirement 3: Keypad Input System

**User Story:** As a user, I want to interact with the emulator using both on-screen buttons and my keyboard, so that I can navigate and control the device conveniently.

#### Acceptance Criteria

1. THE Keypad SHALL render visual buttons for directional keys (Up, Down, Left, Right), Select, Call, End, Clear, digits 0-9, Star, and Hash
2. WHEN a user clicks an on-screen Keypad button, THE Input Dispatcher SHALL translate the click into the corresponding Nokia key action
3. WHEN a user presses an arrow key, THE Input Dispatcher SHALL translate it to UP, DOWN, LEFT, or RIGHT action
4. WHEN a user presses Enter key, THE Input Dispatcher SHALL translate it to SELECT action
5. WHEN a user presses Escape key, THE Input Dispatcher SHALL translate it to BACK action
6. THE Input Dispatcher SHALL provide a unified interface that delivers key actions to the active application

### Requirement 4: Application Framework

**User Story:** As a user, I want to navigate between different apps like on a real Nokia phone, so that I can access various features.

#### Acceptance Criteria

1. THE App Framework SHALL maintain a registry of available applications including their identifiers, names, and components
2. THE Emulator State SHALL track the currently active application identifier
3. THE Emulator State SHALL maintain a navigation stack for hierarchical screen navigation
4. WHEN a user requests to open an application, THE Emulator State SHALL activate that application and update the navigation stack
5. WHEN a user requests to go back, THE Emulator State SHALL pop the navigation stack and return to the previous screen
6. THE App Framework SHALL provide each application with a standard interface for handling key input and setting Softkey labels

### Requirement 5: Home Screen

**User Story:** As a user, I want to see a home screen when the emulator starts, so that I have a starting point for navigation.

#### Acceptance Criteria

1. WHEN the Emulator System starts, THE Emulator System SHALL display the Home Screen as the active application
2. THE Home Screen SHALL display the carrier name "NOKIA" and current time
3. WHEN the user presses the left Softkey on Home Screen, THE Emulator System SHALL open the Main Menu
4. THE Home Screen SHALL set the left Softkey label to "Menu"
5. THE Home Screen SHALL set the right Softkey label to "Names" or similar context-appropriate text

### Requirement 6: Main Menu Navigation

**User Story:** As a user, I want to see a menu of available apps, so that I can choose which app to open.

#### Acceptance Criteria

1. THE Main Menu SHALL display a list of available applications including Messages, Contacts, Snake, Settings, and About
2. WHEN the user presses UP or DOWN keys in Main Menu, THE Main Menu SHALL move the selection highlight to the previous or next item
3. WHEN the user presses SELECT or left Softkey in Main Menu, THE Emulator System SHALL open the selected application
4. WHEN the user presses right Softkey in Main Menu, THE Emulator System SHALL return to Home Screen
5. THE Main Menu SHALL set Softkey labels to "Select" (left) and "Back" (right)

### Requirement 7: Messages Application

**User Story:** As a user, I want to browse a messages inbox, so that I can see how message navigation would work on the original device.

#### Acceptance Criteria

1. THE Messages Application SHALL display a list of simulated message entries with sender names and preview text
2. WHEN the user presses SELECT on a message entry, THE Messages Application SHALL display the full message content
3. WHEN the user presses left Softkey in message list, THE Messages Application SHALL display an options menu with items like Reply, Delete, and Back
4. WHEN the user presses right Softkey in Messages Application, THE Emulator System SHALL return to the previous screen
5. THE Messages Application SHALL set appropriate Softkey labels for each screen state

### Requirement 8: Contacts Application

**User Story:** As a user, I want to browse a contacts list, so that I can see how contact management would work on the original device.

#### Acceptance Criteria

1. THE Contacts Application SHALL display a list of simulated contact entries with names
2. WHEN the user presses SELECT on a contact entry, THE Contacts Application SHALL display the contact details card
3. WHEN the user presses UP or DOWN keys in contact list, THE Contacts Application SHALL move the selection to the previous or next contact
4. WHEN the user presses right Softkey in Contacts Application, THE Emulator System SHALL return to the previous screen
5. THE Contacts Application SHALL set appropriate Softkey labels for each screen state

### Requirement 9: Settings Application

**User Story:** As a user, I want to access settings to customize the emulator behavior, so that I can control features like sound.

#### Acceptance Criteria

1. THE Settings Application SHALL display a list of setting categories including Ringtones, Display, and About Phone
2. WHEN the user presses SELECT on a setting category, THE Settings Application SHALL display the sub-menu for that category
3. THE Settings Application SHALL provide a toggle for enabling or disabling sound effects
4. WHEN the user presses right Softkey in Settings Application, THE Emulator System SHALL return to the previous screen
5. THE Settings Application SHALL set appropriate Softkey labels for each screen state

### Requirement 10: Snake Game

**User Story:** As a user, I want to play a fully functional Snake game, so that I can experience the iconic Nokia game.

#### Acceptance Criteria

1. THE Snake Game SHALL render a game grid sized appropriately to fit within the Nokia Screen display area
2. WHEN the Snake Game is active, THE Snake Game SHALL update the snake position at regular intervals (approximately 200 milliseconds)
3. WHEN the user presses directional keys during gameplay, THE Snake Game SHALL change the snake's movement direction accordingly
4. WHEN the snake collides with itself or a boundary, THE Snake Game SHALL end the game and display a game over screen
5. THE Snake Game SHALL display the current score during gameplay
6. WHEN the user presses left Softkey during gameplay, THE Snake Game SHALL pause the game
7. WHEN the user presses right Softkey during gameplay or game over, THE Emulator System SHALL exit to the previous screen
8. WHEN the game ends, THE Snake Game SHALL provide options to retry or exit via Softkey labels

### Requirement 11: Audio Feedback

**User Story:** As a user, I want to hear keypress sounds when I interact with the keypad, so that the experience feels more realistic.

#### Acceptance Criteria

1. WHEN the user presses any Keypad button, THE Emulator System SHALL play a short beep sound
2. THE Emulator System SHALL provide audio files in MP3 or WAV format for keypress sounds
3. WHEN sound is disabled in Settings, THE Emulator System SHALL not play keypress sounds
4. THE Emulator System SHALL load audio assets from the assets directory

### Requirement 12: State Persistence

**User Story:** As a user, I want the emulator to remember my settings and progress, so that I don't lose my preferences when I reload the page.

#### Acceptance Criteria

1. THE Emulator System SHALL persist user settings including sound enabled/disabled state to browser local storage
2. THE Emulator System SHALL persist Snake Game high score to browser local storage
3. WHEN the Emulator System starts, THE Emulator System SHALL load persisted state from browser local storage
4. THE Emulator System SHALL provide storage utility functions for saving and loading state with fallback values
5. WHEN persisted state is not available, THE Emulator System SHALL use default values

### Requirement 13: Responsive Layout

**User Story:** As a user, I want the emulator to work on different screen sizes, so that I can use it on various devices.

#### Acceptance Criteria

1. WHEN the viewport width is less than the Phone Shell width, THE Emulator System SHALL scale the Phone Shell proportionally to fit
2. THE Phone Shell SHALL maintain its aspect ratio across all viewport sizes
3. THE Emulator System SHALL ensure the Phone Shell remains centered horizontally and vertically on the page
4. THE Nokia Screen SHALL remain readable at all supported viewport sizes

### Requirement 14: Build and Deployment

**User Story:** As a developer, I want the project to build successfully without errors, so that I can deploy it to production.

#### Acceptance Criteria

1. THE Emulator System SHALL be built using Vite bundler with React and TypeScript
2. WHEN the build command is executed, THE Emulator System SHALL compile without TypeScript errors
3. THE Emulator System SHALL support offline operation without requiring backend services
4. THE Emulator System SHALL run in modern web browsers including Chrome, Firefox, Safari, and Edge
5. THE Emulator System SHALL include TailwindCSS or CSS modules for styling applied consistently throughout
