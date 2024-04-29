import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import DetailedEventCard from '../../../components/events/DetailedEventCard';
import { EventSchema, EventType } from '../../../schemas/event';
import axiosInstance from '../../../utils/axios-intance';

export default function EventDetail() {
  const params = useLocalSearchParams();
  const eventId = params.id;
  const [event, setEvent] = useState<EventType | undefined>(undefined);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    await axiosInstance
      .get(`/company/events/${eventId}`)
      .then((response) => {
        const event = EventSchema.parse(response.data);
        setEvent(event);
      })
      .catch(() => {
        showMessage({ message: 'Erro ao buscar evento.', type: 'danger' });
      });
  };

  if (!event) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Evento não encontrado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="mb-4">
        <DetailedEventCard event={event} />
      </ScrollView>
    </View>
  );
}
