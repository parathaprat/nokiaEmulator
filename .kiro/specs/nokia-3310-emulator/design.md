# Design Document: Nokia 3310 Emulator

## Overview

The Nokia 3310 Emulator is a single-page React application built with TypeScript and Vite. The architecture follows a component-based design with clear separation between presentation (UI components), state management (React Context), and business logic (custom hooks and utilities). The emulator simulates the Nokia 3310's physical appearance, screen rendering, input system, and application ecosystem entirely in the browser without external dependencies.

### Key Design Principles

1. **Component Modularity**: Each visual and logical unit is a self-contained React component
2. **Unidirectional Data Flow**: State flows down through props, events bubble up through callbacks
3. **Context for Cross-Cutting Concerns**: Input handling and emulator state use React Context
4. **Type Safety**: Full TypeScript coverage with explicit interfaces for all data structures
5. **Extensibility**: New apps can be added by implementing a standard interface and registering in the app registry

## Architecture

### High-Level Component Hierarchy

```
App
└── Emulator
    ├── InputContext.Provider
    │   └── EmulatorStateProvider
    │       └── PhoneShell
    │           ├── NokiaScreen
    │           │   ├── StatusBar
    │           │   ├── ContentArea (renders active app)
    │           │   └── SoftkeyBar
    │           └── Keypad
    └── KeyboardListener
```

### Data Flow

1. **Input Flow**: Keyboard/Mouse → InputContext → Active App → State Update → Re-render
2. **Navigation Flow**: App Action → EmulatorState → Update Active App → Screen Transition
3. **Persistence Flow**: State Change → Storage Utility → LocalStorage → Reload → Hydrate State

### Technology Stack

- **Framework**: React 18+ with functional components and hooks
- **Language**: TypeScript 5+ with strict mode enabled
- **Build Tool**: Vite 5+ for fast development and optimized production builds
- **Styling**: TailwindCSS for utility-first styling with custom configuration for Nokia theme
- **State Management**: React Context API + useReducer for complex state + local useState for component state
- **Storage**: Browser LocalStorage API wrapped in utility functions
- **Audio**: HTML5 Audio API for keypress sounds

## Components and Interfaces

### Core Components

#### 1. Emulator (Root Component)

**Purpose**: Top-level orchestrator that provides contexts and centers the phone shell

**Props**: None (root component)

**State**: None (delegates to contexts)

**Responsibilities**:
- Wraps the app in InputContext and EmulatorStateProvider
- Renders PhoneShell
- Applies global layout (centering, background)
- Attaches keyboard event listeners

#### 2. PhoneShell

**Purpose**: Visual representation of the Nokia 3310 physical device

**Props**:
```typescript
interface PhoneShellProps {
  children?: React.ReactNode;
}
```

**Styling**:
- Dimensions: 260px width × 540px height
- Border radius: 24px for rounded corners
- Background: Linear gradient (#c5d5e4 to #a8b8c8) to mimic plastic
- Box shadow: Multiple layers for depth
- Internal layout: CSS Grid with areas for screen (top 40%) and keypad (bottom 60%)

**Responsibilities**:
- Render the phone body container
- Position NokiaScreen and Keypad in their respective areas
- Apply responsive scaling when viewport is smaller than phone dimensions

#### 3. NokiaScreen

**Purpose**: Simulates the 84x48 monochrome LCD display

**Props**:
```typescript
interface NokiaScreenProps {
  title?: string;
  softLeft?: string;
  softRight?: string;
  showScrollbar?: boolean;
  children: React.ReactNode;
}
```

**Styling**:
- Background: #9ca89c (greenish-gray LCD color)
- Border: Inset shadow to simulate recessed screen
- Font: 'Courier New' or custom pixel font
- Text color: #0f380f (dark green/black)
- Dimensions: 336px × 192px (4x scale of 84×48)

**Responsibilities**:
- Render StatusBar at top
- Render children in main content area with scrolling if needed
- Render SoftkeyBar at bottom with dynamic labels
- Apply monochrome visual effects

#### 4. StatusBar

**Purpose**: Display signal, time, and battery indicators

**Props**:
```typescript
interface StatusBarProps {
  signal: number; // 0-4 bars
  battery: number; // 0-100 percentage
  time: string; // HH:MM format
}
```

**Rendering**:
- Left: Signal bars (█ repeated based on signal strength)
- Center: Time display
- Right: Battery icon (changes based on percentage)

#### 5. SoftkeyBar

**Purpose**: Display context-sensitive softkey labels

**Props**:
```typescript
interface SoftkeyBarProps {
  leftLabel?: string;
  rightLabel?: string;
}
```

**Layout**: Two-column flex layout with labels at left and right edges

#### 6. Keypad

**Purpose**: Visual and interactive keypad with all Nokia 3310 buttons

**Props**:
```typescript
interface KeypadProps {
  onKeyPress: (action: NokiaKeyAction) => void;
}
```

**Button Layout**:
```
    [↑]
[←] [●] [→]
    [↓]

[1]  [2]  [3]
[4]  [5]  [6]
[7]  [8]  [9]
[*]  [0]  [#]

[📞] [C] [📵]
```

**Responsibilities**:
- Render all buttons with appropriate labels/icons
- Handle click events and call onKeyPress with corresponding action
- Apply visual feedback (active state) on press
- Use CSS Grid for button positioning

### Context Providers

#### 7. InputContext

**Purpose**: Centralized input event dispatcher

**Context Value**:
```typescript
interface InputContextValue {
  dispatchInput: (action: NokiaKeyAction) => void;
  registerKeyHandler: (handler: KeyHandler) => void;
  unregisterKeyHandler: (handler: KeyHandler) => void;
}

type NokiaKeyAction =
  | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
  | 'SELECT'
  | 'SOFT_LEFT' | 'SOFT_RIGHT'
  | 'BACK'
  | 'CALL' | 'END'
  | 'DIGIT_0' | 'DIGIT_1' | 'DIGIT_2' | 'DIGIT_3' | 'DIGIT_4'
  | 'DIGIT_5' | 'DIGIT_6' | 'DIGIT_7' | 'DIGIT_8' | 'DIGIT_9'
  | 'STAR' | 'HASH';
```

**Implementation**:
- Maintains a stack of key handlers (most recent handler receives input first)
- Keyboard event listener maps physical keys to NokiaKeyAction
- Plays keypress sound on each input (if enabled)

**Keyboard Mapping**:
- Arrow keys → UP/DOWN/LEFT/RIGHT
- Enter → SELECT
- Escape → BACK
- Q/A → SOFT_LEFT
- E/D → SOFT_RIGHT
- 0-9 → DIGIT_0 through DIGIT_9
- * → STAR
- # → HASH

#### 8. EmulatorStateProvider

**Purpose**: Manages active app, navigation stack, and global emulator state

**Context Value**:
```typescript
interface EmulatorStateContextValue {
  activeAppId: string;
  navigationStack: string[];
  openApp: (appId: string) => void;
  goBack: () => void;
  goHome: () => void;
  setSoftkeys: (left?: string, right?: string) => void;
  softkeys: { left?: string; right?: string };
}
```

**State Structure**:
```typescript
interface EmulatorState {
  activeAppId: string;
  navigationStack: string[]; // Stack of app IDs
  softkeys: {
    left?: string;
    right?: string;
  };
}
```

**Navigation Rules**:
- `openApp(id)`: Push current app to stack, set new app as active
- `goBack()`: Pop stack, set previous app as active (or home if stack empty)
- `goHome()`: Clear stack, set home as active

### Application Interface

#### 9. App Component Interface

**Purpose**: Standard interface that all apps must implement

**Props**:
```typescript
interface NokiaAppProps {
  onKey: (action: NokiaKeyAction) => void;
  setSoftkeys: (left?: string, right?: string) => void;
  openApp: (appId: string) => void;
  goBack: () => void;
}
```

**Lifecycle**:
- Apps receive `onKey` callback for all input events
- Apps call `setSoftkeys` to update softkey labels when screen changes
- Apps call `openApp` to navigate to another app
- Apps call `goBack` to return to previous screen

**Registration**:
```typescript
interface AppDefinition {
  id: string;
  name: string;
  icon?: string;
  component: React.ComponentType<NokiaAppProps>;
  launchable: boolean; // If true, appears in main menu
}
```

## Data Models

### App Registry

**File**: `src/core/appRegistry.ts`

```typescript
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
```

### Snake Game State

**File**: `src/apps/Snake/snakeTypes.ts`

```typescript
interface Position {
  x: number;
  y: number;
}

interface SnakeGameState {
  snake: Position[]; // Head at index 0
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  food: Position;
  score: number;
  gameStatus: 'playing' | 'paused' | 'gameOver';
  gridWidth: number;
  gridHeight: number;
}
```

### Storage Schema

**File**: `src/core/storage.ts`

```typescript
interface StorageSchema {
  'settings.soundEnabled': boolean;
  'snake.highScore': number;
  'emulator.lastActiveApp': string;
}
```

## Application Designs

### HomeScreen

**Visual Layout**:
```
┌────────────────┐
│ ▂▂▂  12:34  ▓│ ← Status bar
├────────────────┤
│                │
│     NOKIA      │ ← Large centered text
│                │
│   Sat 8 Nov    │ ← Date
│                │
├────────────────┤
│ Menu      Names│ ← Softkeys
└────────────────┘
```

**Key Handling**:
- SOFT_LEFT → Open main menu
- SOFT_RIGHT → Open contacts
- UP/DOWN → Cycle through notifications (future feature)

### MainMenu

**Visual Layout**:
```
┌────────────────┐
│ ▂▂▂  12:34  ▓│
├────────────────┤
│ > Messages     │ ← Selected item
│   Contacts     │
│   Snake        │
│   Settings     │
│   About        │
├────────────────┤
│ Select    Back │
└────────────────┘
```

**State**:
```typescript
interface MenuState {
  selectedIndex: number;
  items: AppDefinition[];
}
```

**Key Handling**:
- UP → Decrement selectedIndex (wrap around)
- DOWN → Increment selectedIndex (wrap around)
- SELECT or SOFT_LEFT → Open selected app
- SOFT_RIGHT → Go back to home

### MessagesApp

**Visual Layout** (Inbox):
```
┌────────────────┐
│ ▂▂▂  12:34  ▓│
├────────────────┤
│ Messages       │ ← Title
│                │
│ > Mom          │ ← Selected
│   Where are... │
│   Alice        │
│   Meeting at...│
├────────────────┤
│ Options   Back │
└────────────────┘
```

**Mock Data**:
```typescript
interface Message {
  id: string;
  sender: string;
  preview: string;
  content: string;
  timestamp: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Mom',
    preview: 'Where are you?',
    content: 'Where are you? Call me when you get this.',
    timestamp: '10:23',
  },
  // ... more messages
];
```

**Screens**:
1. Inbox list (default)
2. Message detail (when SELECT pressed)
3. Options menu (when SOFT_LEFT pressed in inbox)

### ContactsApp

**Visual Layout**:
```
┌────────────────┐
│ ▂▂▂  12:34  ▓│
├────────────────┤
│ Contacts       │
│                │
│ > Alice        │
│   Bob          │
│   Charlie      │
│   Mom          │
├────────────────┤
│ View      Back │
└────────────────┘
```

**Mock Data**:
```typescript
interface Contact {
  id: string;
  name: string;
  phone: string;
}

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Alice', phone: '555-0101' },
  { id: '2', name: 'Bob', phone: '555-0102' },
  // ... more contacts
];
```

### SettingsApp

**Visual Layout**:
```
┌────────────────┐
│ ▂▂▂  12:34  ▓│
├────────────────┤
│ Settings       │
│                │
│ > Sound: ON    │
│   Display      │
│   About phone  │
│                │
├────────────────┤
│ Change    Back │
└────────────────┘
```

**Settings State**:
```typescript
interface Settings {
  soundEnabled: boolean;
  // Future: contrast, language, etc.
}
```

### SnakeApp

**Visual Layout** (Playing):
```
┌────────────────┐
│ ▂▂▂  12:34  ▓│
├────────────────┤
│ Score: 5       │
│ ┌────────────┐ │
│ │  ●         │ │
│ │  ●  ○      │ │ ← Grid (28×16 cells)
│ │  ●         │ │   ● = snake, ○ = food
│ │            │ │
│ └────────────┘ │
├────────────────┤
│ Pause     Exit │
└────────────────┘
```

**Game Logic** (useSnakeGame hook):

```typescript
interface SnakeGameHook {
  gameState: SnakeGameState;
  handleInput: (action: NokiaKeyAction) => void;
  resetGame: () => void;
}

// Game loop:
// 1. Every 200ms, move snake one cell in current direction
// 2. Check if head position equals food position → grow snake, spawn new food, increment score
// 3. Check if head collides with body or boundary → game over
// 4. Update state and trigger re-render
```

**Key Handling**:
- UP/DOWN/LEFT/RIGHT → Change direction (cannot reverse)
- SOFT_LEFT → Toggle pause
- SOFT_RIGHT → Exit to menu

**Rendering**:
- Use CSS Grid with 28 columns × 16 rows
- Each cell is a small div (12px × 12px)
- Snake cells have dark background
- Food cell has different background
- Empty cells are transparent

## Error Handling

### Input Errors

**Scenario**: Invalid key action received
**Handling**: Log warning to console, ignore invalid action, continue normal operation

**Scenario**: Multiple rapid key presses
**Handling**: Debounce input with 50ms threshold to prevent double-triggers

### Navigation Errors

**Scenario**: Attempt to open non-existent app
**Handling**: Log error, stay on current app, show no visual feedback

**Scenario**: Navigation stack becomes empty
**Handling**: Default to home screen, never allow empty active app

### Storage Errors

**Scenario**: LocalStorage quota exceeded
**Handling**: Catch exception, log warning, continue without persistence

**Scenario**: LocalStorage unavailable (private browsing)
**Handling**: Detect on startup, use in-memory fallback, show no error to user

### Game Errors

**Scenario**: Snake game loop fails
**Handling**: Catch exception in game loop, set game status to 'gameOver', allow retry

## Testing Strategy

### Unit Tests

**Components to Test**:
1. **Keypad**: Verify all buttons render, click handlers fire with correct actions
2. **NokiaScreen**: Verify props render correctly (title, softkeys, children)
3. **StatusBar**: Verify signal/battery/time display correctly
4. **InputContext**: Verify key mapping logic, handler registration
5. **EmulatorState**: Verify navigation logic (openApp, goBack, goHome)
6. **Storage utilities**: Verify save/load with mocked localStorage

**Testing Library**: React Testing Library + Vitest

**Example Test**:
```typescript
describe('Keypad', () => {
  it('should call onKeyPress with SELECT when center button clicked', () => {
    const mockHandler = vi.fn();
    render(<Keypad onKeyPress={mockHandler} />);
    
    const selectButton = screen.getByRole('button', { name: /select/i });
    fireEvent.click(selectButton);
    
    expect(mockHandler).toHaveBeenCalledWith('SELECT');
  });
});
```

### Integration Tests

**Scenarios to Test**:
1. **Navigation Flow**: Home → Menu → App → Back → Home
2. **Input Flow**: Keyboard press → InputContext → Active app receives event
3. **Softkey Updates**: App calls setSoftkeys → SoftkeyBar updates labels
4. **Persistence**: Change setting → Reload page → Setting persists

### Manual Testing

**Test Cases**:
1. Visual appearance matches Nokia 3310 aesthetic
2. All keypad buttons respond to clicks
3. Keyboard shortcuts work as expected
4. Snake game plays smoothly without lag
5. Responsive layout works on mobile viewport
6. Audio plays on keypress (when enabled)
7. Settings persist across page reload

### Build Validation

**Checks**:
1. `npm run build` completes without errors
2. No TypeScript errors in any file
3. No console errors in production build
4. Bundle size is reasonable (< 500KB gzipped)
5. All assets load correctly in production build

## Performance Considerations

### Rendering Optimization

- Use `React.memo` for Keypad and StatusBar (rarely change)
- Use `useMemo` for app registry lookups
- Avoid inline function definitions in render methods
- Use CSS transforms for animations (hardware accelerated)

### Snake Game Performance

- Use `requestAnimationFrame` for smooth game loop
- Limit re-renders by batching state updates
- Use CSS Grid instead of canvas for simpler rendering
- Cap frame rate at 200ms per update (5 FPS) to match original game speed

### Asset Loading

- Preload audio files on app mount
- Use lazy loading for app components (React.lazy) if bundle size grows
- Optimize images/icons with appropriate formats and sizes

## Accessibility Considerations

While the emulator simulates a physical device with specific interaction patterns, we should still provide basic accessibility:

- All interactive elements are keyboard accessible
- Buttons have appropriate ARIA labels
- Focus indicators are visible
- Color contrast meets WCAG AA standards for text
- Screen reader users receive feedback on navigation changes

## Future Extensibility

### Adding New Apps

1. Create new component implementing `NokiaAppProps` interface
2. Add entry to `APP_REGISTRY` with unique ID
3. Set `launchable: true` to appear in main menu
4. Implement key handling and softkey management
5. No changes needed to core framework

### Adding New Features

- **Ringtones**: Add audio files, create ringtone selector in Settings
- **Games**: Follow Snake pattern, register in app registry
- **Themes**: Add theme context, allow color scheme switching
- **Animations**: Add CSS transitions for screen changes
- **Multiplayer Snake**: Use WebRTC or WebSocket for peer-to-peer gameplay

### Code Organization for Growth

```
src/
├── components/       # Reusable UI components
├── apps/            # Application components
│   ├── HomeScreen/
│   ├── MainMenu/
│   ├── Messages/
│   ├── Contacts/
│   ├── Settings/
│   └── Snake/
├── core/            # Core framework code
│   ├── InputContext.tsx
│   ├── EmulatorState.tsx
│   ├── appRegistry.ts
│   └── storage.ts
├── hooks/           # Custom React hooks
│   ├── useKeyboardListener.ts
│   ├── useSound.ts
│   └── usePersistedState.ts
├── types/           # TypeScript type definitions
│   ├── app.types.ts
│   ├── input.types.ts
│   └── storage.types.ts
├── assets/          # Static assets
│   ├── sounds/
│   └── fonts/
└── styles/          # Global styles
    └── globals.css
```

## Deployment

### Build Configuration

**Vite Config** (`vite.config.ts`):
```typescript
export default defineConfig({
  plugins: [react()],
  base: './', // For relative paths (GitHub Pages compatible)
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
});
```

### Hosting Options

1. **GitHub Pages**: Static hosting, free, easy deployment
2. **Netlify**: Automatic builds from Git, free tier available
3. **Vercel**: Optimized for React, free tier available
4. **Any static host**: Just upload the `dist` folder

### Environment Requirements

- Modern browser with ES6+ support
- LocalStorage enabled (optional, graceful degradation)
- Audio playback capability (optional)
- No server-side requirements
- No database requirements
