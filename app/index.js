import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import { View, Text } from 'react-native';

export default function Home() {
  const [userMode, setUserMode] = useState(null); // null | 'signIn' | 'signUp' | 'guest'

  const handleSignIn = () => {
    setUserMode('signIn');
    // TODO: Navigate to Sign In screen
    console.log('Navigate to Sign In');
  };

  const handleCreateAccount = () => {
    setUserMode('signUp');
    // TODO: Navigate to Create Account screen
    console.log('Navigate to Create Account');
  };

  const handleContinueAsGuest = () => {
    setUserMode('guest');
    // TODO: Navigate to main app with guest mode
    console.log('Continue as Guest');
  };

  // Show temporary placeholder after selection
  if (userMode) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D5F3F' }}>
        <StatusBar style="light" />
        <Text style={{ color: 'white', fontSize: 20 }}>
          {userMode === 'signIn' && 'Sign In Screen (Coming Soon)'}
          {userMode === 'signUp' && 'Create Account Screen (Coming Soon)'}
          {userMode === 'guest' && 'Guest Mode - Loading App...'}
        </Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <WelcomeScreen
        onSignIn={handleSignIn}
        onCreateAccount={handleCreateAccount}
        onContinueAsGuest={handleContinueAsGuest}
      />
    </>
  );
}
