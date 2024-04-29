import LoginForm from '@components/auth/LoginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export default function Index() {
  useFocusEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        showMessage({ message: 'Você já está autenticado.', type: 'warning' });
        router.push('/(auth)/(events)');
      }
    };

    checkToken();
  });

  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../assets/login-background.jpg')}
        resizeMode="cover"
        className="flex-1 justify-center items-center px-4">
        <Image
          source={require('../assets/logo.png')}
          resizeMode="contain"
          className="w-32 h-auto"
        />
        <View className="flex-1 w-full bg-white p-4 rounded-lg">
          <LoginForm />
        </View>
      </ImageBackground>
    </View>
  );
}
