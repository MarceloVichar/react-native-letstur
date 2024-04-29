import DetailedSaleCard from '@components/sales/DetailedSaleCard';
import { Sale, SaleSchema } from '@schemas/sale';
import axiosInstance from '@utils/axios-instance';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export default function SaleDetail() {
  const params = useLocalSearchParams();
  const saleId = params.id;
  const [sale, setSale] = useState<Sale | undefined>(undefined);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    await axiosInstance
      .get(`/company/sales/${saleId}`)
      .then((response) => {
        const event = SaleSchema.parse(response.data);
        setSale(event);
      })
      .catch(() => {
        showMessage({ message: 'Erro ao buscar evento.', type: 'danger' });
      });
  };

  if (!sale) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Venda não encontrada</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="mb-4">
        <DetailedSaleCard sale={sale} />
      </ScrollView>
    </View>
  );
}
