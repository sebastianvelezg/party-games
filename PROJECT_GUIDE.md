# Party Games App - Developer Guide

## 🎯 Project Overview

This is a React Native party games app built with Expo and TypeScript. The app is designed to be a multi-game platform where you can easily add new party games.

## 📁 Project Structure

```
party-games/
├── app/                          # Expo Router screens (file-based routing)
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── index.tsx            # Home screen (game list)
│   │   ├── explore.tsx          # Settings screen
│   │   └── _layout.tsx          # Tab navigation layout
│   ├── games/                    # Individual game screens
│   │   └── impostor/
│   │       └── index.tsx        # Impostor game screen
│   └── _layout.tsx              # Root layout
│
├── src/                          # Application source code
│   ├── components/
│   │   └── ui/                  # Reusable UI components
│   │       ├── button.tsx       # Custom button component
│   │       ├── card.tsx         # Card wrapper component
│   │       ├── game-card.tsx    # Game display card
│   │       ├── setting-item.tsx # Settings list item
│   │       └── index.ts         # Component exports
│   │
│   ├── config/
│   │   ├── theme.ts             # App-wide theme (colors, typography, spacing)
│   │   └── games.ts             # Game registry (add new games here!)
│   │
│   ├── games/                    # Game logic (separate from screens)
│   │   └── [future game folders]
│   │
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   │
│   └── utils/
│       └── storage.ts           # AsyncStorage utilities
│
├── assets/                       # Static assets (images, fonts)
├── package.json
└── tsconfig.json
```

## 🎮 How to Add a New Game

Adding a new game is simple! Follow these steps:

### 1. Register the Game

Edit `src/config/games.ts` and add your game to the `GAMES` array:

```typescript
{
  id: 'your-game-id',
  name: 'Your Game Name',
  description: 'Short description of your game',
  minPlayers: 2,
  maxPlayers: 8,
  icon: 'game-controller',  // Any Ionicons name
  color: colors.gameColors.teal,  // Choose from theme colors
  route: '/games/your-game',
}
```

### 2. Create the Game Screen

Create a new folder and screen file:
```
app/games/your-game/index.tsx
```

Use this template:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/src/components/ui/button';
import { colors, typography, spacing } from '@/src/config/theme';

export default function YourGameScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gameColors.teal, '#3AB5AD']}
        style={styles.header}
      >
        <Text style={styles.title}>🎮 Your Game Name</Text>
        <Text style={styles.subtitle}>Game description</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Add your game UI here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
});
```

### 3. Add Game Logic (Optional)

If your game has complex logic, create a folder in `src/games/`:

```
src/games/your-game/
├── logic.ts       # Game state and logic
├── data.ts        # Game data (categories, questions, etc.)
└── utils.ts       # Helper functions
```

That's it! Your game will automatically appear on the home screen.

## 🎨 Theme System

The app uses a centralized theme system in `src/config/theme.ts`.

### Available Colors

```typescript
// Primary colors
colors.primary
colors.secondary
colors.accent

// Game colors (for different game cards)
colors.gameColors.purple
colors.gameColors.pink
colors.gameColors.teal
colors.gameColors.orange
colors.gameColors.green
colors.gameColors.blue

// UI colors
colors.background
colors.surface
colors.text
colors.textSecondary
```

### Typography

```typescript
typography.fontSize.xs        // 12
typography.fontSize.sm        // 14
typography.fontSize.base      // 16
typography.fontSize.lg        // 18
typography.fontSize.xl        // 20
typography.fontSize['2xl']    // 24
typography.fontSize['3xl']    // 30
typography.fontSize['4xl']    // 36

typography.fontWeight.regular
typography.fontWeight.medium
typography.fontWeight.semibold
typography.fontWeight.bold
```

### Spacing

```typescript
spacing.xs      // 4
spacing.sm      // 8
spacing.md      // 16
spacing.lg      // 24
spacing.xl      // 32
spacing['2xl']  // 48
spacing['3xl']  // 64
```

## 🔧 Available Components

### Button

```typescript
<Button
  title="Click Me"
  onPress={() => {}}
  variant="primary"    // primary, secondary, outline, ghost
  size="medium"        // small, medium, large
  fullWidth
  haptics
/>
```

### Card

```typescript
<Card variant="elevated" padding={16}>
  <Text>Content</Text>
</Card>
```

### GameCard

```typescript
<GameCard
  game={gameObject}
  onPress={() => router.push('/games/...')}
/>
```

### SettingItem

```typescript
<SettingItem
  icon="volume-high"
  title="Sound Effects"
  description="Enable sounds"
  value={soundEnabled}
  onValueChange={setValue}
  type="toggle"  // toggle or button
/>
```

## 💾 Storage Utilities

### Settings

```typescript
import { settingsStorage } from '@/src/utils/storage';

// Load settings
const settings = await settingsStorage.get();

// Save settings
await settingsStorage.save({ soundEnabled: true });

// Reset to defaults
await settingsStorage.reset();
```

### Game History

```typescript
import { gameHistoryStorage } from '@/src/utils/storage';

// Get all sessions
const history = await gameHistoryStorage.getAll();

// Add a session
await gameHistoryStorage.add({
  id: '...',
  gameId: 'impostor',
  gameName: 'The Impostor',
  players: ['Alice', 'Bob'],
  date: new Date().toISOString(),
});

// Clear history
await gameHistoryStorage.clear();
```

### Recent Players

```typescript
import { recentPlayersStorage } from '@/src/utils/storage';

// Get recent player names
const players = await recentPlayersStorage.get();

// Add player names
await recentPlayersStorage.add(['Alice', 'Bob', 'Charlie']);
```

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## 📝 TypeScript Types

All types are defined in `src/types/index.ts`:

- `Game` - Game metadata
- `AppSettings` - App settings structure
- `GameSession` - Game history entry
- `Player` - Player information

## 🎯 Next Steps

Now that the foundation is built, you can:

1. **Implement "The Impostor" game**
   - Player setup screen
   - Word distribution logic
   - Timer component
   - Game flow screens

2. **Add more games**
   - Truth or Dare
   - Never Have I Ever
   - Charades
   - etc.

3. **Enhance the app**
   - Add animations
   - Implement sound effects
   - Add achievements
   - Create custom categories
   - Add multiplayer sync

## 🔍 Key Features

- **Modular architecture** - Easy to add new games
- **Type-safe** - Full TypeScript support
- **Persistent storage** - Settings and history saved
- **Haptic feedback** - Better user experience
- **Theme system** - Consistent styling
- **Reusable components** - Build faster

## 🤝 Contributing

When adding new features:
1. Follow the existing code structure
2. Use TypeScript types
3. Add components to `src/components/ui/`
4. Keep game logic separate from UI
5. Use the theme system for styling
6. Test on both iOS and Android

Happy coding! 🎉
