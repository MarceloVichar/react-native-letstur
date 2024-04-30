import EventCard from '@components/events/EventCard';
import useNavigationExitOnBack from '@hooks/useNavigationExitOnBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from '@rneui/themed';
import { EventsType, EventType } from '@schemas/event';
import axiosInstance from '@utils/axios-instance';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export default function Events() {
  useNavigationExitOnBack();

  const [events, setEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
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
        {loading ? (
          <ActivityIndicator size="large" className="my-12" />
        ) : (
          events.map((event, index) => <EventCard key={index} event={event} />)
        )}
      </ScrollView>
    </View>
  );
}
