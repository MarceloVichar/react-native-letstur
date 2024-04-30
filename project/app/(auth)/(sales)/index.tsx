import SaleCard from '@components/sales/SaleCard';
import useNavigationExitOnBack from '@hooks/useNavigationExitOnBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, SearchBar } from '@rneui/themed';
import { Sale, Sales } from '@schemas/sale';
import axiosInstance from '@utils/axios-instance';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export default function Events() {
  useNavigationExitOnBack();

  const [sales, setSales] = useState<Sale[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
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
        {loading ? (
          <ActivityIndicator size="large" className="my-12" />
        ) : (
          sales.map((sale, index) => <SaleCard key={index} sale={sale} refresh={fetchEvents} />)
        )}
      </ScrollView>
    </View>
  );
}
