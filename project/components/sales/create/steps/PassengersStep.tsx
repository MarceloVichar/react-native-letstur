import { Button, Divider, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

interface ClientStepProps {
  onSubmit: () => void;
  previousStep: () => void;
}

export default function PassengersStep({ onSubmit, previousStep }: ClientStepProps) {
  const [quantity, setQuantity] = useState(5);

  const renderInputFields = () => {
    return Array.from({ length: quantity }, (_, index) => (
      <View key={index} className="bg-white py-2">
        <Input label={`Nome ${index + 1}`} className="w-full" />
        <Input label={`Documento ${index + 1}`} className="w-full" />
        <Divider />
      </View>
    ));
  };

  return (
    <View className="flex-1 gap-4">
      <ScrollView className="flex-1 gap-2">{renderInputFields()}</ScrollView>
      <View className="flex-row justify-between ">
        <Button title="Anterior" type="clear" onPress={previousStep} />
        <Button title="Finalizar" onPress={onSubmit} />
      </View>
    </View>
  );
}
