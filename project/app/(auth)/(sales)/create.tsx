import ClientStep from '@components/sales/create/steps/ClientStep';
import EventPickStep from '@components/sales/create/steps/EventPickStep';
import PassengersStep from '@components/sales/create/steps/PassengersStep';
import QuantityPickStep from '@components/sales/create/steps/QuantityStep';
import { CreateSale, CreateSaleSchema } from '@schemas/sale';
import axiosInstance from '@utils/axios-instance';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export default function CreateSalePage() {
  const [saleData, setSaleData] = useState<CreateSale>({
    customer: {
      name: '',
      document: '',
      email: '',
      phone: '',
    },
    eventSales: [],
  });

  const [sending, setSending] = useState(false);

  useEffect(() => {
    console.log('log no form', saleData);
  }, [saleData]);

  const nextStep = () => {
    setCurrentStepIndex(currentStepIndex + 1);
  };

  const previousStep = () => {
    setCurrentStepIndex(currentStepIndex - 1);
  };

  const onSubmit = () => {
    const data = CreateSaleSchema.parse(saleData);
    setSending(true);
    axiosInstance
      .post('/company/sales', data)
      .then(() => {
        showMessage({ message: 'Venda criada com sucesso', type: 'success' });
        router.push('/(auth)/(sales)');
      })
      .catch(() => {
        showMessage({ message: 'Erro ao criar venda', type: 'danger' });
      })
      .finally(() => {
        setSending(false);
      });
  };

  const steps = [
    {
      title: 'Evento',
      component: (props: any) => <EventPickStep {...props} />,
      props: { nextStep, saleData, updateSaleData: setSaleData },
    },
    {
      title: 'Quantidade',
      component: (props: any) => <QuantityPickStep {...props} />,
      props: { nextStep, previousStep, saleData, updateSaleData: setSaleData },
    },
    {
      title: 'Cliente',
      component: (props: any) => <ClientStep {...props} />,
      props: { nextStep, previousStep, saleData, updateSaleData: setSaleData },
    },
    {
      title: 'Passageiros',
      component: (props: any) => <PassengersStep {...props} />,
      props: { previousStep, onSubmit, saleData, updateSaleData: setSaleData, sending },
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
