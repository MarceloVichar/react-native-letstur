import { Card } from '@rneui/themed';
import { EventType } from '@schemas/event';
import { formatCurrency, formatDateTime } from '@utils/helpers';
import React from 'react';
import { Text } from 'react-native';

interface DetailedEventCardProps {
  event: EventType;
}

export default function DetailedEventCard({ event }: DetailedEventCardProps) {
  const eventInfos = [
    { label: 'Partida', value: formatDateTime(event?.departureDateTime) },
    { label: 'Retorno', value: formatDateTime(event?.arrivalDateTime) },
    { label: 'Lugares totais', value: event?.totalSeats },
    { label: 'Lugares disponíveis', value: event?.availableSeats },
    { label: 'Preço', value: formatCurrency(event?.tour?.priceCents || 0) },
    { label: 'Guia de passeio', value: event?.tourGuide?.name },
    { label: 'Veículo', value: event?.vehicle?.model },
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
