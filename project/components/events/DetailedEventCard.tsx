import { Card } from '@rneui/themed';
import React from 'react';
import { Text } from 'react-native';

import { formatCurrency, formatDateTime } from '../../utils/helpers';

export default function DetailedEventCard({ event }: any) {
  const eventInfos = [
    { label: 'Partida', value: formatDateTime(event?.departureDateTime) },
    { label: 'Retorno', value: formatDateTime(event?.arrivalDateTime) },
    { label: 'Lugares totais', value: event?.totalSeats },
    { label: 'Lugares disponíveis', value: event?.availableSeats },
    { label: 'Preço', value: formatCurrency(event?.tour?.priceCents) },
    { label: 'Guia de passeio', value: event?.tourGuide?.name },
    { label: 'Veículo', value: event?.vehicle?.name },
    { label: 'Motorista', value: event?.driver?.name },
    { label: 'Criado em', value: formatDateTime(event?.createdAt) },
    { label: 'Atualizado em', value: formatDateTime(event?.updatedAt) },
  ];

  return (
    <Card>
      <Card.Title>{event?.tour?.name}</Card.Title>
      <Card.Divider />
      {eventInfos.map((info, index) => (
        <Text key={index} style={{ marginBottom: 20, fontSize: 16 }}>
          {info.label}: {info.value || 'Não informado'}
        </Text>
      ))}
    </Card>
  );
}
