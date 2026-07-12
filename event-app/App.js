import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventInfoScreen from './src/screens/event-info';
import { useFonts } from 'expo-font';
import { IrishGrover_400Regular } from '@expo-google-fonts/irish-grover';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    // Automatically navigate to EventInfoScreen
    navigation.replace('EventInfo');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Text>Navigating to EventInfo...</Text>
    </View>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    IrishGrover: IrishGrover_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="EventInfo" 
          component={EventInfoScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
