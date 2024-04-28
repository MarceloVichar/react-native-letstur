import { createTheme, ThemeProvider } from '@rneui/themed';
import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';

const theme = createTheme({
  lightColors: {
    primary: '#33C8B6',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
});

export default function _layout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <FlashMessage position="bottom" />
    </ThemeProvider>
  );
}
