import { SearchBar } from '@rneui/themed';
import React from 'react';
import { ScrollView, View } from 'react-native';

import SaleCard from '../../../components/sales/SaleCard';
import { SaleData } from '../../../data/SaleData';
import SalesMock from '../../../mocks/SalesMock';

export default function Events() {
  const sales: SaleData[] = SalesMock;

  return (
    <View className="flex-1">
      <SearchBar placeholder="Buscar por cliente" className="mb-4" lightTheme />
      <ScrollView className="mb-4">
        {sales.map((sale, index) => (
          <SaleCard key={index} sale={sale} />
        ))}
      </ScrollView>
    </View>
  );
}
