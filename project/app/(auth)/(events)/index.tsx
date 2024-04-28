import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from '@rneui/themed';
import { router, useFocusEffect } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import EventCard from '../../../components/events/EventCard';
import { EventData } from '../../../data/EventData';
import EventsMock from '../../../mocks/EventsMock';

export default function Events() {
  const events: EventData[] = EventsMock;

  useFocusEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if (!token) {
        showMessage({ message: 'Você não está autenticado.', type: 'warning' });
        router.push('/');
      }
    };

    checkToken();
  });

  return (
    <View className="flex-1">
      <SearchBar placeholder="Buscar eventos por passeio" className="mb-4" lightTheme />
      <ScrollView className="mb-4">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </ScrollView>
    </View>
  );
}
