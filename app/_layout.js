import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useState, useEffect } from 'react';
import * as SplashScreenExpo from 'expo-splash-screen';
import SplashScreen from '../components/SplashScreen';
import '../global.css';

// Prevent native splash screen from auto-hiding
SplashScreenExpo.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Hide native splash immediately so custom splash shows
        await SplashScreenExpo.hideAsync();

        // Keep custom splash for 3 seconds (as per requirements)
        await new Promise(resolve => setTimeout(resolve, 3000));
        setAppReady(true);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appReady) {
      // Hide custom splash and show welcome screen
      setShowSplash(false);
    }
  }, [appReady]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2D5F3F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Ilmify - Islamic Quiz & Tutor',
            headerShown: false
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
