import { Badge, BottomSheet, Card, Icon, ListItem } from '@rneui/themed';
import { Sale } from '@schemas/sale';
import axiosInstance from '@utils/axios-instance';
import { formatCurrency, formatDateTime } from '@utils/helpers';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

interface EventCardProps {
  sale: Sale;
  refresh: () => void;
}

export default function SaleCard({ sale, refresh }: EventCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge value="Pendente" status="warning" />;
      default:
        return <Badge value="Confirmado" status="success" />;
    }
  };
  const saleInfos = [
    { label: 'Cliente', value: sale?.customer?.name },
    { label: 'Valor total', value: formatCurrency(sale.totalValueCents) },
    { label: 'Vendido em', value: formatDateTime(sale?.createdAt) },
    { label: 'Status', value: getStatusBadge(sale?.status) },
  ];

  const handleDelete = async (saleId: number) => {
    await axiosInstance
      .delete(`/company/sales/${saleId}`)
      .then(() => {
        showMessage({ message: 'Venda removida com sucesso.', type: 'success' });
        setIsDeleting(false);
        refresh();
      })
      .catch((err) => {
        showMessage({ message: 'Erro ao remover venda.', type: 'danger' });
      });
  };

  return (
    <Card>
      <Card.Title>{sale?.voucher}</Card.Title>
      <Card.Divider />
      {saleInfos.map((info, index) => (
        <Text key={index} style={{ marginBottom: 20 }}>
          {info.label}: {info.value}
        </Text>
      ))}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
        <Icon
          name="visibility"
          onPress={() => router.push({ pathname: '(sales)/details', params: { id: sale?.id } })}
        />
        {sale?.status === 'pending' && <Icon name="delete" onPress={() => setIsDeleting(true)} />}
      </View>
      <BottomSheet isVisible={isDeleting} onBackdropPress={() => setIsDeleting(false)}>
        <ListItem
          onPress={() => handleDelete(sale.id || 0)}
          containerStyle={{ backgroundColor: 'red' }}>
          <ListItem.Content>
            <ListItem.Title style={{ color: 'white' }}>Remover venda</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={() => setIsDeleting(false)}>
          <ListItem.Content>
            <ListItem.Title>Cancelar</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </Card>
  );
}
