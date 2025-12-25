import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text } from 'react-native';
import WelcomeScreen from '../components/WelcomeScreen';
import SignUpScreen from '../components/SignUpScreen';
import SignInScreen from '../components/SignInScreen';
import EmailVerificationScreen from '../components/EmailVerificationScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import ResetPasswordScreen from '../components/ResetPasswordScreen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [userData, setUserData] = useState(null);
  const [tempEmail, setTempEmail] = useState('');

  // Navigation handlers
  const handleSignIn = () => {
    setCurrentScreen('signIn');
  };

  const handleCreateAccount = () => {
    setCurrentScreen('signUp');
  };

  const handleContinueAsGuest = () => {
    setUserData({ isGuest: true, username: 'Guest' });
    setCurrentScreen('mainApp');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleForgotPassword = () => {
    setCurrentScreen('forgotPassword');
  };

  // Sign Up flow
  const handleSignUpSuccess = (data) => {
    console.log('Sign up successful:', data);
    setTempEmail(data.email);
    setCurrentScreen('emailVerification');
  };

  const handleEmailVerified = () => {
    // Set user as authenticated
    setUserData({
      email: tempEmail,
      username: tempEmail.split('@')[0],
      fullName: 'New User',
      isVerified: true,
      isGuest: false
    });
    setCurrentScreen('mainApp');
  };

  // Sign In flow
  const handleSignInSuccess = (data) => {
    console.log('Sign in successful:', data);
    setUserData({
      email: data.email,
      username: data.username,
      fullName: data.fullName,
      isVerified: true,
      isGuest: false
    });
    setCurrentScreen('mainApp');
  };

  // Forgot Password flow
  const handleForgotPasswordSuccess = (email) => {
    setTempEmail(email);
    // In real app, user would click link in email
    // For demo, go to reset password screen
    setTimeout(() => {
      setCurrentScreen('resetPassword');
    }, 500);
  };

  const handleResetPasswordSuccess = () => {
    setCurrentScreen('signIn');
  };

  // Screen rendering
  if (currentScreen === 'welcome') {
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

  if (currentScreen === 'signUp') {
    return (
      <>
        <StatusBar style="light" />
        <SignUpScreen
          onBack={handleBackToWelcome}
          onSignInPress={handleSignIn}
          onSuccess={handleSignUpSuccess}
        />
      </>
    );
  }

  if (currentScreen === 'emailVerification') {
    return (
      <>
        <StatusBar style="auto" />
        <EmailVerificationScreen
          email={tempEmail}
          onBack={() => setCurrentScreen('signUp')}
          onVerified={handleEmailVerified}
        />
      </>
    );
  }

  if (currentScreen === 'signIn') {
    return (
      <>
        <StatusBar style="light" />
        <SignInScreen
          onBack={handleBackToWelcome}
          onSignUpPress={handleCreateAccount}
          onForgotPassword={handleForgotPassword}
          onSuccess={handleSignInSuccess}
        />
      </>
    );
  }

  if (currentScreen === 'forgotPassword') {
    return (
      <>
        <StatusBar style="light" />
        <ForgotPasswordScreen
          onBack={() => setCurrentScreen('signIn')}
          onSuccess={handleForgotPasswordSuccess}
        />
      </>
    );
  }

  if (currentScreen === 'resetPassword') {
    return (
      <>
        <StatusBar style="auto" />
        <ResetPasswordScreen
          onSuccess={handleResetPasswordSuccess}
        />
      </>
    );
  }

  if (currentScreen === 'mainApp') {
    // Main app placeholder - will be replaced with actual app
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D5F3F', padding: 20 }}>
        <StatusBar style="light" />
        <Text style={{ color: 'white', fontSize: 24, marginBottom: 20, fontWeight: 'bold' }}>
          Welcome to Ilmify!
        </Text>
        <Text style={{ color: '#D4AF37', fontSize: 18, marginBottom: 10 }}>
          {userData?.isGuest ? 'Guest Mode' : `Hello, ${userData?.fullName || userData?.username}!`}
        </Text>
        <Text style={{ color: '#E8F5E9', fontSize: 14, textAlign: 'center' }}>
          {userData?.isGuest
            ? 'You have limited access. Sign up for full features.'
            : 'Main app will be integrated here'}
        </Text>
      </View>
    );
  }

  // Default fallback
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
