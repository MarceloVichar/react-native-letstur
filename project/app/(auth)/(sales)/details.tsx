import DetailedSaleCard from '@components/sales/DetailedSaleCard';
import { Sale, SaleSchema } from '@schemas/sale';
import axiosInstance from '@utils/axios-instance';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export default function SaleDetail() {
  const params = useLocalSearchParams();
  const saleId = params.id;
  const [sale, setSale] = useState<Sale | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    setLoading(true);
    await axiosInstance
      .get(`/company/sales/${saleId}`)
      .then((response) => {
        const event = SaleSchema.parse(response.data);
        setSale(event);
      })
      .catch(() => {
        showMessage({ message: 'Erro ao buscar evento.', type: 'danger' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!sale && !loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Venda não encontrada</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="mb-4">
        {loading ? (
          <ActivityIndicator size="large" className="my-12" />
        ) : (
          sale && <DetailedSaleCard sale={sale} />
        )}
      </ScrollView>
    </View>
  );
}
