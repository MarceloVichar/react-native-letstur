import { Stack } from 'expo-router';
import React from 'react';

export default function SalesStack() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="sales-index" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: 'Detalhes da venda' }} />
      <Stack.Screen name="create" options={{ title: 'Nova venda' }} />
    </Stack>
  );
}
