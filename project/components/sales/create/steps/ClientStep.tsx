import { Button, Input } from '@rneui/themed';
import { CreateSale, CustomerSchema } from '@schemas/sale';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

interface ClientPickStepProps {
  nextStep: () => void;
  previousStep: () => void;
  saleData: CreateSale;
  updateSaleData: (data: CreateSale) => void;
}

export default function ClientStep({
  nextStep,
  previousStep,
  updateSaleData,
  saleData,
}: ClientPickStepProps) {
  const [mutableSaleData, setMutableSaleData] = useState<CreateSale>(saleData);
  const [isValid, setIsValid] = useState(false);

  const handleNextStep = () => {
    updateSaleData(mutableSaleData);
    nextStep();
  };

  useEffect(() => {
    const result = CustomerSchema.safeParse(mutableSaleData.customer);
    setIsValid(result.success);
  }, [mutableSaleData.customer]);

  return (
    <View className="flex-1 gap-4">
      <ScrollView className="flex-1 ">
        <Input
          label="* Nome"
          className="w-full"
          value={mutableSaleData.customer.name}
          onChangeText={(value) =>
            setMutableSaleData((prev) => ({ ...prev, customer: { ...prev.customer, name: value } }))
          }
        />
        <Input
          label="* Email"
          className="w-full"
          value={mutableSaleData.customer.email || ''}
          onChangeText={(value) =>
            setMutableSaleData((prev) => ({
              ...prev,
              customer: { ...prev.customer, email: value },
            }))
          }
        />
        <Input
          label="* Documento"
          className="w-full"
          value={mutableSaleData.customer.document || ''}
          onChangeText={(value) =>
            setMutableSaleData((prev) => ({
              ...prev,
              customer: { ...prev.customer, document: value },
            }))
          }
        />
        <Input
          label="Telefone"
          className="w-full"
          value={mutableSaleData.customer.phone || ''}
          onChangeText={(value) =>
            setMutableSaleData((prev) => ({
              ...prev,
              customer: { ...prev.customer, phone: value },
            }))
          }
        />
      </ScrollView>
      <View className="flex-row justify-between ">
        <Button title="Anterior" type="clear" onPress={previousStep} />
        <Button disabled={!isValid} title="Próximo" onPress={handleNextStep} />
      </View>
    </View>
  );
}
