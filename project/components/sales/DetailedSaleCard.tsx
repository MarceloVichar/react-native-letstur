import { Badge, Card } from '@rneui/themed';
import React from 'react';
import { Text, View } from 'react-native';

import { EventSale, SaleData } from '../../data/SaleData';
import { formatCurrency, formatDateTime } from '../../utils/helpers';

interface DetailedEventCardProps {
  sale: SaleData;
}

export default function DetailedSaleCard({ sale }: DetailedEventCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge value="Pendente" status="warning" />;
      default:
        return <Badge value="Confirmado" status="success" />;
    }
  };

  const areas = [
    {
      title: 'Informações da venda',
      data: [
        { label: 'Voucher', value: sale?.voucher },
        { label: 'Data', value: formatDateTime(sale?.createdAt) },
        { label: 'Valor total', value: formatCurrency(sale.totalValueCents) },
        { label: 'Status', value: getStatusBadge(sale?.status) },
      ],
    },
    {
      title: 'Informações do cliente',
      data: [
        { label: 'Nome', value: sale?.customer?.name },
        { label: 'Documento', value: sale?.customer?.name },
        { label: 'Email', value: sale?.customer?.email },
        { label: 'Telefone', value: sale?.customer?.phone },
      ],
    },
  ];

  const eventSaleInfos = (eventSale: EventSale) => {
    return [
      { label: 'Quantidade', value: eventSale.quantity },
      { label: 'Valor total', value: formatCurrency(eventSale.totalValueCents) },
      { label: 'ID do evento', value: eventSale.event?.id },
      { label: 'Passeio', value: eventSale.event?.tour?.name },
      { label: 'Partida', value: formatDateTime(eventSale.event?.departureDateTime) },
      { label: 'Retorno', value: formatDateTime(eventSale.event?.arrivalDateTime) },
    ];
  };

  return (
    <View>
      {areas.map((area, i) => (
        <Card key={i}>
          <Card.Title>{area.title}</Card.Title>
          <Card.Divider />
          {area.data.map((info, index) => (
            <Text key={index} style={{ marginBottom: 20 }}>
              {info.label}: {info.value}
            </Text>
          ))}
        </Card>
      ))}
      <Card>
        <Card.Title>Eventos</Card.Title>
        {sale?.events?.map((event, eIndex) => (
          <View key={eIndex}>
            <Card.Divider />
            {eventSaleInfos(event).map((info, index) => (
              <Text key={index} style={{ marginBottom: 20 }}>
                {info.label}: {info.value}
              </Text>
            ))}
          </View>
        ))}
      </Card>
    </View>
  );
}
