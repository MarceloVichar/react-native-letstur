import { Button, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import EventsMock from '../../../../mocks/EventsMock';
import DetailedEventCard from '../../../events/DetailedEventCard';

interface QuantityPickStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

export default function QuantityPickStep({ nextStep, previousStep }: QuantityPickStepProps) {
  const [quantity, setQuantity] = useState(1);
  const selectedEvent = EventsMock[0];

  return (
    <View className="flex-1 gap-4">
      <View className="flex-1">
        <ScrollView className="flex-1 ">
          <DetailedEventCard event={selectedEvent} />
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginTop: 20,
          }}>
          <Button
            buttonStyle={{ paddingLeft: 16, paddingRight: 16 }}
            disabled={quantity <= 1}
            title="-"
            onPress={() => setQuantity(quantity - 1)}
          />
          <Text h4>{quantity}</Text>
          <Button
            buttonStyle={{ paddingLeft: 16, paddingRight: 16 }}
            disabled={quantity >= selectedEvent.availableSeats}
            title="+"
            onPress={() => setQuantity(quantity + 1)}
          />
        </View>
      </View>
      <View className="flex-row justify-between ">
        <Button title="Anterior" type="clear" onPress={previousStep} />
        <Button title="Próximo" onPress={nextStep} />
      </View>
    </View>
  );
}
