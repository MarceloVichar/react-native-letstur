import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import ClientStep from '../../../components/sales/create/steps/ClientStep';
import EventPickStep from '../../../components/sales/create/steps/EventPickStep';
import PassengersStep from '../../../components/sales/create/steps/PassengersStep';
import QuantityPickStep from '../../../components/sales/create/steps/QuantityStep';

export default function CreateSale() {
  const nextStep = () => {
    setCurrentStepIndex(currentStepIndex + 1);
  };

  const previousStep = () => {
    setCurrentStepIndex(currentStepIndex - 1);
  };

  const onSubmit = () => {};

  const steps = [
    {
      title: 'Evento',
      component: (props: any) => <EventPickStep {...props} />,
      props: { nextStep },
    },
    {
      title: 'Quantidade',
      component: (props: any) => <QuantityPickStep {...props} />,
      props: { nextStep, previousStep },
    },
    {
      title: 'Cliente',
      component: (props: any) => <ClientStep {...props} />,
      props: { nextStep, previousStep },
    },
    {
      title: 'Passageiros',
      component: (props: any) => <PassengersStep {...props} />,
      props: { previousStep, onSubmit },
    },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(steps[currentStepIndex]);

  useEffect(() => {
    setCurrentStep(steps[currentStepIndex]);
  }, [currentStepIndex]);

  return (
    <View className="flex-1 p-2">
      <Text className="text-center text-lg font-bold">{currentStep?.title}</Text>
      <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
        {currentStep?.component(currentStep.props)}
      </ScrollView>
    </View>
  );
}
