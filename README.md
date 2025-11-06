# 🎉 Party Games App

A collection of fun party games for iOS and Android, featuring social deduction games like "The Impostor" and more mini-games to come!

## 📱 Features

### Current Games

**The Impostor** - A social deduction game where players must identify who doesn't know the secret word

- Add multiple players
- Choose categories and number of impostors
- Private word/role viewing system
- Built-in timer for discussion rounds
- Clean, intuitive card-based UI

### Coming Soon

- More party games and modes
- Custom categories
- Score tracking
- Game history

## 🚀 Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **React Navigation** - Screen navigation
- **AsyncStorage** - Local data persistence
- **React Native Reanimated** - Smooth animations

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your phone (for testing)

## 🛠️ Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/party-games-app.git
cd party-games-app
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npx expo start
```

4. Run on your device
   - Download Expo Go from App Store or Google Play
   - Scan the QR code from the terminal
   - The app will load on your device

## 🎮 How to Play "The Impostor"

1. **Setup Phase**
   - Add all player names
   - Select a category (Animals, Movies, Food, etc.)
   - Choose number of impostors

2. **Word Distribution**
   - Each player takes the phone privately
   - Tap to reveal their word or "IMPOSTOR" role
   - Tap again to hide and pass to next player

3. **Discussion Phase**
   - Timer starts
   - Players ask questions and discuss to find the impostor
   - Impostor tries to blend in without knowing the word

4. **Voting Phase**
   - Players vote on who they think is the impostor
   - Reveal roles and determine winner

## 📁 Project Structure

```
party-games-app/
├── src/
│   ├── components/
│   │   ├── Card.js
│   │   ├── Timer.js
│   │   ├── PlayerInput.js
│   │   └── GameButton.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── PlayerSetupScreen.js
│   │   ├── CategorySelectScreen.js
│   │   ├── WordRevealScreen.js
│   │   ├── GamePlayScreen.js
│   │   └── ResultsScreen.js
│   ├── games/
│   │   └── impostor/
│   │       ├── ImpostorGame.js
│   │       └── categories.js
│   ├── utils/
│   │   └── storage.js
│   └── navigation/
│       └── AppNavigator.js
├── assets/
│   ├── images/
│   └── fonts/
├── app.json
├── App.js
└── package.json
```

## 🧪 Development

### Running on iOS Simulator

```bash
npx expo run:ios
```

### Running on Android Emulator

```bash
npx expo run:android
```

### Building for Production

**iOS:**
```bash
eas build --platform ios
```

**Android:**
```bash
eas build --platform android
```

## 🎨 Customization

### Adding New Categories

Edit `src/games/impostor/categories.js`:

```javascript
export const categories = {
  animals: ['Dog', 'Cat', 'Elephant', ...],
  movies: ['Avatar', 'Titanic', ...],
  // Add your custom category here
  custom: ['Word1', 'Word2', ...]
}
```

### Styling

All styling uses React Native StyleSheet. Main theme colors can be modified in the component files.

## 📝 Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
