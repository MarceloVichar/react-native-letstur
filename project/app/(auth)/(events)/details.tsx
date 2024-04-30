import DetailedEventCard from '@components/events/DetailedEventCard';
import { EventSchema, EventType } from '@schemas/event';
import axiosInstance from '@utils/axios-instance';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export default function EventDetail() {
  const params = useLocalSearchParams();
  const eventId = params.id;
  const [event, setEvent] = useState<EventType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    setLoading(true);
    await axiosInstance
      .get(`/company/events/${eventId}`)
      .then((response) => {
        const event = EventSchema.parse(response.data);
        setEvent(event);
      })
      .catch(() => {
        showMessage({ message: 'Erro ao buscar evento.', type: 'danger' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!event && !loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Evento não encontrado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="mb-4">
        {loading ? (
          <ActivityIndicator size="large" className="my-12" />
        ) : (
          event && <DetailedEventCard event={event} />
        )}
      </ScrollView>
    </View>
  );
}
