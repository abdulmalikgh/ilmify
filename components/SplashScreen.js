import { View, Text, ActivityIndicator, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const patternRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Gentle rotation for patterns
    Animated.loop(
      Animated.timing(patternRotate, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = patternRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#2D5F3F',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Islamic Geometric Pattern Background */}
      <Animated.View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.1,
        transform: [{ rotate }]
      }}>
        {/* Top Right - Star Pattern */}
        <View
          style={{
            position: 'absolute',
            top: 50,
            right: 30,
            width: 100,
            height: 100,
            borderWidth: 2,
            borderColor: '#D4AF37',
            borderRadius: 50,
            transform: [{ rotate: '45deg' }]
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 60,
            right: 40,
            width: 80,
            height: 80,
            borderWidth: 2,
            borderColor: '#D4AF37',
            borderRadius: 40,
          }}
        />

        {/* Bottom Left - Square Pattern */}
        <View
          style={{
            position: 'absolute',
            bottom: 100,
            left: 40,
            width: 80,
            height: 80,
            borderWidth: 2,
            borderColor: '#D4AF37',
            transform: [{ rotate: '30deg' }]
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 110,
            left: 50,
            width: 60,
            height: 60,
            borderWidth: 2,
            borderColor: '#E8F5E9',
            transform: [{ rotate: '30deg' }]
          }}
        />

        {/* Center Left - Circle */}
        <View style={{
          position: 'absolute',
          top: '40%',
          left: '10%',
          width: 60,
          height: 60,
          borderWidth: 2,
          borderColor: '#E8F5E9',
          borderRadius: 30
        }} />

        {/* Top Left - Diamond */}
        <View style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: 50,
          height: 50,
          borderWidth: 2,
          borderColor: '#D4AF37',
          transform: [{ rotate: '45deg' }]
        }} />

        {/* Bottom Right - Octagon effect */}
        <View style={{
          position: 'absolute',
          bottom: '25%',
          right: '20%',
          width: 70,
          height: 70,
          borderWidth: 2,
          borderColor: '#E8F5E9',
          transform: [{ rotate: '22.5deg' }]
        }} />
        <View style={{
          position: 'absolute',
          bottom: '25%',
          right: '20%',
          width: 70,
          height: 70,
          borderWidth: 2,
          borderColor: '#D4AF37',
          transform: [{ rotate: '67.5deg' }]
        }} />
      </Animated.View>

      {/* Main Content */}
      <Animated.View style={{
        alignItems: 'center',
        zIndex: 1,
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }]
      }}>
        {/* Logo Placeholder - Text Based */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: '#D4AF37',
            marginBottom: 5
          }}>
            إِلْمِفَايْ
          </Text>
          <Text style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: '#FFFFFF',
            letterSpacing: 4
          }}>
            ILMIFY
          </Text>
        </View>

        {/* App Name */}
        <Text style={{
          fontSize: 16,
          color: '#E8F5E9',
          marginTop: 10,
          textAlign: 'center'
        }}>
          Islamic Quiz & Tutor Platform
        </Text>

        {/* Loading Indicator */}
        <ActivityIndicator size="large" color="#D4AF37" style={{ marginTop: 40 }} />
      </Animated.View>

      {/* Footer */}
      <Animated.View style={{
        position: 'absolute',
        bottom: 30,
        alignItems: 'center',
        opacity: fadeAnim
      }}>
        <Text style={{
          fontSize: 12,
          color: '#E8F5E9',
          textAlign: 'center',
          paddingHorizontal: 20,
          marginBottom: 8
        }}>
          In the name of Allah, the Most Gracious, the Most Merciful
        </Text>
        <Text style={{
          fontSize: 10,
          color: '#A5D6A7',
          textAlign: 'center'
        }}>
          Version 1.0.0
        </Text>
      </Animated.View>
    </View>
  );
}
