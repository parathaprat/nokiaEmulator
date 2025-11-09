# Nokia 3310 Emulator 📱

A browser-based Nokia 3310 emulator built with React, TypeScript, and Vite. Experience the nostalgia of the iconic Nokia 3310 with its classic monochrome display, T9 text input, and the legendary Snake game!

![Nokia 3310 Emulator](https://img.shields.io/badge/Nokia-3310-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 📱 Authentic Nokia Experience
- **Monochrome LCD Display** - Classic green-tinted screen with authentic Nokia styling
- **Physical Keypad** - Clickable buttons with realistic styling and feedback
- **Status Bar** - Signal strength, battery indicator, and time display
- **Softkey Navigation** - Context-sensitive menu buttons

### 🎮 Built-in Applications
- **🏠 Home Screen** - Classic Nokia branding with date display
- **📱 Messages** - Create, read, and manage SMS messages with T9 text input
- **👤 Contacts** - Full phonebook with add, edit, and delete functionality
- **⚙️ Settings** - Sound controls, volume adjustment, and about information
- **🐍 Snake Game** - The legendary Snake game with high score tracking

### ⌨️ Input Methods
- **Mouse/Touch** - Click any button on the virtual keypad
- **Keyboard Shortcuts**:
  - `Arrow Keys` - Navigate menus and control Snake
  - `Enter` - Select/confirm
  - `Escape` - Go back
  - `0-9` - Number keys
  - `* #` - Special keys
  - `Q/A` - Left softkey
  - `E/D` - Right softkey

### 💾 Data Persistence
- All data (messages, contacts, settings, high scores) automatically saved to browser LocalStorage
- Graceful degradation if LocalStorage is unavailable

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/nokia-3310-emulator.git
cd nokia-3310-emulator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Navigation
1. **Home Screen** - Press any key or click "Menu" to open the main menu
2. **Main Menu** - Use arrow keys or click to navigate, Enter to select
3. **Apps** - Each app has its own navigation (check softkey labels at bottom of screen)

### Playing Snake
1. Open Menu → Select Snake
2. Use arrow keys to control the snake
3. Eat the food (⚪) to grow and score points
4. Avoid hitting walls or yourself
5. Game speeds up as you score more points

### Creating Messages
1. Open Menu → Messages → New Message
2. Use number keys with T9-style multi-tap input
3. Press a number multiple times to cycle through letters
4. Example: Press 2 three times for "C"

### Managing Contacts
1. Open Menu → Contacts
2. Add new contacts with name and phone number
3. Edit or delete existing contacts
4. Navigate with arrow keys

## 🛠️ Tech Stack

- **React 19.1** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7.1** - Build tool and dev server
- **TailwindCSS 3** - Utility-first CSS
- **LocalStorage API** - Data persistence

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

This is a static site that can be deployed to any static hosting service:

### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder to gh-pages branch
```

### Netlify
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import your repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

## 📁 Project Structure

```
nokia-3310-emulator/
├── src/
│   ├── apps/              # Application components
│   │   ├── HomeScreen.tsx
│   │   ├── MainMenu.tsx
│   │   ├── Messages/
│   │   ├── Contacts/
│   │   ├── Settings/
│   │   └── Snake/
│   ├── components/        # UI components
│   │   ├── Emulator.tsx
│   │   ├── PhoneShell.tsx
│   │   ├── NokiaScreen.tsx
│   │   ├── Keypad.tsx
│   │   ├── StatusBar.tsx
│   │   └── SoftkeyBar.tsx
│   ├── core/             # Core logic
│   │   ├── InputContext.tsx
│   │   ├── EmulatorState.tsx
│   │   ├── appRegistry.tsx
│   │   └── storage.ts
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript definitions
│   ├── styles/           # Global styles
│   └── assets/           # Static assets
├── public/               # Public assets
└── DEPLOYMENT.md         # Deployment guide
```

## 🎨 Features in Detail

### T9 Text Input
Multi-tap text input system mimicking the original Nokia 3310:
- Press number keys multiple times to cycle through letters
- Automatic word spacing
- Backspace support

### Snake Game
Classic Snake implementation with:
- Smooth directional controls
- Collision detection
- Score tracking
- Speed progression
- High score persistence

### Responsive Design
- Scales appropriately on different screen sizes
- Touch-friendly on mobile devices
- Keyboard shortcuts for desktop users

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by the iconic Nokia 3310
- Built as a nostalgic tribute to early 2000s mobile phones
- No affiliation with Nokia Corporation

## 📸 Screenshots

*Add screenshots of your emulator here*

## 🔗 Links

- [Live Demo](#) - Add your deployed URL here
- [Report Bug](https://github.com/YOUR_USERNAME/nokia-3310-emulator/issues)
- [Request Feature](https://github.com/YOUR_USERNAME/nokia-3310-emulator/issues)

---

Made with ❤️ and nostalgia
