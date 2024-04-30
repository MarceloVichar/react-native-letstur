import { Button, Divider, Input } from '@rneui/themed';
import { CreateSale } from '@schemas/sale';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

interface ClientStepProps {
  onSubmit: () => void;
  previousStep: () => void;
  saleData: CreateSale;
  updateSaleData: (data: CreateSale) => void;
  sending: boolean;
}

export default function PassengersStep({
  onSubmit,
  previousStep,
  saleData,
  updateSaleData,
  sending,
}: ClientStepProps) {
  const quantity = saleData.eventSales.reduce((acc, eventSale) => acc + eventSale.quantity, 0);
  const [passengers, setPassengers] = useState(
    Array.from({ length: quantity }, () => ({ name: '', document: '' }))
  );

  const handleInputChange = (index: number, field: string, value: string) => {
    const newPassengers = [...passengers];
    // @ts-ignore
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const renderInputFields = () => {
    return passengers.map((passenger, index) => (
      <View key={index} className="bg-base-100 py-4" style={{ backgroundColor: 'white' }}>
        <Input
          label={`Nome ${index + 1}`}
          key={`name-${index}`}
          className="w-full"
          value={passenger.name}
          onChangeText={(value) => handleInputChange(index, 'name', value)}
        />
        <Input
          label={`Documento ${index + 1}`}
          key={`document-${index}`}
          className="w-full"
          value={passenger.document}
          onChangeText={(value) => handleInputChange(index, 'document', value)}
        />
        <Divider />
      </View>
    ));
  };

  const dataIsValid = passengers.every((passenger) => passenger.name && passenger.document);

  const handleSubmit = () => {
    if (saleData.eventSales.length > 0) {
      const updatedEventSales = [...saleData.eventSales];
      updatedEventSales[0].passengers = passengers;
      updateSaleData({ ...saleData, eventSales: updatedEventSales });
    }
    onSubmit();
  };

  return (
    <View className="flex-1 gap-4">
      <ScrollView className="flex-1 gap-2">{renderInputFields()}</ScrollView>
      <View className="flex-row justify-between ">
        <Button title="Anterior" type="clear" onPress={previousStep} />
        <Button
          loading={sending}
          disabled={!dataIsValid}
          title="Finalizar"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}
