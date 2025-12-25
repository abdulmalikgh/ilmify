import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* Hero Section */}
      <View className="bg-islamic-primary p-6 pb-12">
        <Text className="text-white text-3xl font-bold text-center mb-2">
          As-salamu alaykum
        </Text>
        <Text className="text-islamic-light text-center text-base">
          Welcome to Ilmify - Your Islamic Learning Platform
        </Text>
      </View>

      {/* Main Content */}
      <View className="p-4 -mt-8">
        <Card className="mb-4 bg-white" elevation={4}>
          <Card.Content className="p-4">
            <Text className="text-2xl font-bold text-islamic-primary mb-2 text-center">
              Coming Soon
            </Text>
            <Text className="text-gray-600 text-center">
              Islamic Quiz and Tutor platform is under development
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}
