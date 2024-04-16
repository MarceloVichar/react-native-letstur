import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import DetailedEventCard from '../../../components/events/DetailedEventCard';
import { EventData } from '../../../data/EventData';
import EventsMock from '../../../mocks/EventsMock';

export default function EventDetail() {
  const params = useLocalSearchParams();
  const eventId = params.id;
  const event: EventData | undefined = EventsMock.find((e) => eventId === e.id?.toString());

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
