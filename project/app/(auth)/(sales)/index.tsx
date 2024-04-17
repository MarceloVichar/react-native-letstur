import { Button, SearchBar } from '@rneui/themed';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import SaleCard from '../../../components/sales/SaleCard';
import { SaleData } from '../../../data/SaleData';
import SalesMock from '../../../mocks/SalesMock';

export default function Events() {
  const sales: SaleData[] = SalesMock;

  return (
    <View className="flex-1">
      <View>
        <Button title="Nova venda" type="clear" onPress={() => router.push('/(sales)/create')} />
        <SearchBar placeholder="Buscar por cliente" className="mb-4" lightTheme />
      </View>
      <ScrollView className="mb-4">
        {sales.map((sale, index) => (
          <SaleCard key={index} sale={sale} />
        ))}
      </ScrollView>
    </View>
  );
}
