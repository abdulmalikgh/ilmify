import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text } from 'react-native';
import WelcomeScreen from '../components/WelcomeScreen';
import SignUpScreen from '../components/SignUpScreen';
import SignInScreen from '../components/SignInScreen';
import EmailVerificationScreen from '../components/EmailVerificationScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import ResetPasswordScreen from '../components/ResetPasswordScreen';
import OnboardingFlow from '../components/OnboardingFlow';
import MainNavigation from '../components/MainNavigation';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [userData, setUserData] = useState(null);
  const [tempEmail, setTempEmail] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

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
    setIsNewUser(true); // Mark as new user for onboarding
    setCurrentScreen('emailVerification');
  };

  const handleEmailVerified = () => {
    // Set user data and show onboarding for new users
    setUserData({
      email: tempEmail,
      username: tempEmail.split('@')[0],
      fullName: tempEmail.split('@')[0].replace(/[._]/g, ' '),
      isVerified: true,
      isGuest: false
    });
    setCurrentScreen('onboarding');
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
    // Show onboarding for testing
    setCurrentScreen('onboarding');
  };

  // Onboarding completion
  const handleOnboardingComplete = (onboardingData) => {
    console.log('Onboarding completed:', onboardingData);
    // Save onboarding data to user profile
    setUserData(prev => ({
      ...prev,
      interests: onboardingData.interests,
      knowledgeLevel: onboardingData.knowledgeLevel,
      hasCompletedOnboarding: true
    }));
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

  if (currentScreen === 'onboarding') {
    return (
      <>
        <StatusBar style="auto" />
        <OnboardingFlow
          userName={userData?.fullName || 'Friend'}
          onComplete={handleOnboardingComplete}
        />
      </>
    );
  }

  if (currentScreen === 'mainApp') {
    return <MainNavigation userData={userData} />;
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
