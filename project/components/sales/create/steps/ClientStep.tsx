import { Button, Input } from '@rneui/themed';
import React from 'react';
import { ScrollView, View } from 'react-native';

interface QuantityPickStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

export default function ClientStep({ nextStep, previousStep }: QuantityPickStepProps) {
  return (
    <View className="flex-1 gap-4">
      <ScrollView className="flex-1 ">
        <Input label="Nome" className="w-full" />
        <Input label="Email" className="w-full" />
        <Input label="Documento" className="w-full" />
        <Input label="Telefone" className="w-full" />
      </ScrollView>
      <View className="flex-row justify-between ">
        <Button title="Anterior" type="clear" onPress={previousStep} />
        <Button title="Próximo" onPress={nextStep} />
      </View>
    </View>
  );
}
