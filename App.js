import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { HabitProvider } from './context/HabitContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <HabitProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </HabitProvider>
    </SafeAreaProvider>
  );
}
