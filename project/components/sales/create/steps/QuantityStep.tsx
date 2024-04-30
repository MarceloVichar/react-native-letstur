import DetailedEventCard from '@components/events/DetailedEventCard';
import { Button, Text } from '@rneui/themed';
import { EventType } from '@schemas/event';
import { CreateSale } from '@schemas/sale';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

interface QuantityPickStepProps {
  nextStep: () => void;
  previousStep: () => void;
  saleData: CreateSale;
  updateSaleData: (data: CreateSale) => void;
}

export default function QuantityPickStep({
  nextStep,
  previousStep,
  saleData,
  updateSaleData,
}: QuantityPickStepProps) {
  const [quantity, setQuantity] = useState(1);
  const selectedEvent: EventType | undefined = saleData?.eventSales[0]?.event;

  if (!selectedEvent) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Evento não encontrado</Text>
      </View>
    );
  }

  const handleNextStep = () => {
    const eventSaleData = {
      eventId: selectedEvent.id,
      event: selectedEvent,
      quantity,
      passengers: [],
    };
    updateSaleData({ ...saleData, eventSales: [eventSaleData] });
    nextStep();
  };

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
        <Button title="Próximo" onPress={handleNextStep} />
      </View>
    </View>
  );
}
