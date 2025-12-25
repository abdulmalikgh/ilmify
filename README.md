# Ilmify - Islamic Quiz & Tutor Platform

An Islamic learning platform built with React Native, featuring quizzes and tutoring services.

## Tech Stack

- **React Native** with **Expo** - Cross-platform mobile development
- **Expo Router** - File-based navigation
- **NativeWind** - Tailwind CSS for React Native
- **React Native Paper** - Material Design components
- **JavaScript** - No TypeScript for rapid development

## Islamic Theme Colors

The app uses a custom Islamic color palette:
- **Primary Green**: `#2D5F3F` - Deep Islamic green
- **Secondary Gold**: `#D4AF37` - Traditional Islamic gold
- **Light**: `#E8F5E9` - Light green background
- **Dark**: `#1B4332` - Dark green text

Access these colors in your components using: `bg-islamic-primary`, `text-islamic-secondary`, etc.

## Project Structure

```
ilmify/
├── app/                  # Expo Router screens
│   ├── _layout.js       # Root layout with navigation
│   ├── index.js         # Home screen
│   ├── quiz.js          # Quiz screen
│   └── tutor.js         # Tutor screen
├── components/          # Reusable components (empty for now)
├── assets/              # Images, fonts, etc.
├── global.css           # Tailwind CSS imports
├── tailwind.config.js   # Tailwind configuration
└── app.json             # Expo configuration

## Getting Started

### 1. Install Dependencies (Already Done!)
All packages are already installed. If you need to reinstall:
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
```

This will open Expo DevTools in your browser.

### 3. Run on Device/Simulator

**For iOS:**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

**For Web:**
```bash
npm run web
```

### 4. Using Expo Go App (Recommended for beginners)
1. Install **Expo Go** app on your phone (iOS/Android)
2. Run `npm start`
3. Scan the QR code with your phone camera (iOS) or Expo Go app (Android)

## Using NativeWind (Tailwind CSS)

Style components using className with Tailwind classes:

```jsx
<View className="flex-1 bg-islamic-primary p-4">
  <Text className="text-white text-2xl font-bold">Hello</Text>
</View>
```

## Using React Native Paper

Import and use Material Design components:

```jsx
import { Button, Card } from 'react-native-paper';

<Card>
  <Card.Content>
    <Button mode="contained">Press me</Button>
  </Card.Content>
</Card>
```

## Next Steps

1. **Add Assets**: Create icon.png, splash.png, and adaptive-icon.png in the `assets` folder
2. **Build Features**: Add more quiz categories, tutor booking functionality
3. **Backend**: Integrate with Firebase or Supabase for data storage
4. **Authentication**: Add user login/signup
5. **State Management**: Add Zustand or Redux for complex state

## Common Issues

### Metro Bundler Cache Issues
If you encounter any issues, try clearing the cache:
```bash
npm start -- --clear
```

### Port Already in Use
Kill the process using port 8081:
```bash
npx kill-port 8081
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Expo Router](https://expo.github.io/router/docs/)

---

**May Allah bless your learning journey!** 
