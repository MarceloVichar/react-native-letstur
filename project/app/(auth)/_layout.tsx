import { ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}