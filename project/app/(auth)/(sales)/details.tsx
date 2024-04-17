import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import DetailedSaleCard from '../../../components/sales/DetailedSaleCard';
import { SaleData } from '../../../data/SaleData';
import SalesMock from '../../../mocks/SalesMock';

export default function SaleDetail() {
  const params = useLocalSearchParams();
  const saleId = params.id;
  const sale: SaleData | undefined = SalesMock.find((e) => saleId === e.id?.toString());

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
