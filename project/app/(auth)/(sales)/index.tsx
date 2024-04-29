import SaleCard from '@components/sales/SaleCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, SearchBar } from '@rneui/themed';
import { Sale, Sales } from '@schemas/sale';
import axiosInstance from '@utils/axios-instance';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export default function Events() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [search, setSearch] = useState<string>('');

  useFocusEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        showMessage({ message: 'Você não está autenticado.', type: 'warning' });
        router.push('/');
      }
    };

    checkToken();
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEvents();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const fetchEvents = async () => {
    await axiosInstance
      .get('/company/sales', {
        params: {
          filter: {
            customer: search,
          },
          perPage: 200,
        },
      })
      .then((response) => {
        const sales = Sales.parse(response.data?.data);
        setSales(sales);
      })
      .catch(() => {
        showMessage({ message: 'Erro ao buscar vendas.', type: 'danger' });
      });
  };

  return (
    <View className="flex-1">
      <View>
        <Button title="Nova venda" type="clear" onPress={() => router.push('/(sales)/create')} />
        <SearchBar
          placeholder="Buscar por cliente"
          className="mb-4"
          lightTheme
          value={search}
          onChangeText={(value) => setSearch(value)}
        />
      </View>
      <ScrollView className="mb-4">
        {sales.map((sale, index) => (
          <SaleCard key={index} sale={sale} />
        ))}
      </ScrollView>
    </View>
  );
}
