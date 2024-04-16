import { Badge, BottomSheet, Card, Icon, ListItem } from '@rneui/themed';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { SaleData } from '../../data/SaleData';
import { formatCurrency, formatDateTime } from '../../utils/helpers';

interface EventCardProps {
  sale: SaleData;
}

export default function SaleCard({ sale }: EventCardProps) {
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
        <Icon name="delete" onPress={() => setIsDeleting(true)} />
      </View>
      <BottomSheet isVisible={isDeleting} onBackdropPress={() => setIsDeleting(false)}>
        <ListItem containerStyle={{ backgroundColor: 'red' }}>
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
