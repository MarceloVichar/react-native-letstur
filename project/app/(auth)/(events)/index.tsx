import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from '@rneui/themed';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import EventCard from '../../../components/events/EventCard';
import { EventsType, EventType } from '../../../schemas/event';
import axiosInstance from '../../../utils/axios-intance';

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState<string>('');

  useFocusEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        showMessage({ message: 'Você não está autenticado.', type: 'warning' });
        router.push('/');
      }
    };

    checkToken();
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEvents();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const fetchEvents = async () => {
    await axiosInstance
      .get('/company/events', {
        params: {
          filter: {
            tour: search,
            departure_start_date: new Date().toISOString(),
          },
          perPage: 200,
        },
      })
      .then((response) => {
        const events = EventsType.parse(response.data?.data);
        setEvents(events);
      })
      .catch(() => {
        showMessage({ message: 'Erro ao buscar eventos.', type: 'danger' });
      });
  };

  return (
    <View className="flex-1">
      <SearchBar
        placeholder="Buscar eventos por passeio"
        className="mb-4"
        lightTheme
        value={search}
        onChangeText={(value) => setSearch(value)}
      />
      <ScrollView className="mb-4">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </ScrollView>
    </View>
  );
}
