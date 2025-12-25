import { View, Text, ActivityIndicator } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#2D5F3F',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Islamic Geometric Pattern Background */}
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.1
      }}>
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
            bottom: 100,
            left: 40,
            width: 80,
            height: 80,
            borderWidth: 2,
            borderColor: '#D4AF37',
            transform: [{ rotate: '30deg' }]
          }}
        />
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
      </View>

      {/* Main Content */}
      <View style={{ alignItems: 'center', zIndex: 1 }}>
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
      </View>

      {/* Footer */}
      <Text style={{
        position: 'absolute',
        bottom: 30,
        fontSize: 12,
        color: '#E8F5E9',
        textAlign: 'center',
        paddingHorizontal: 20
      }}>
        In the name of Allah, the Most Gracious, the Most Merciful
      </Text>
    </View>
  );
}
