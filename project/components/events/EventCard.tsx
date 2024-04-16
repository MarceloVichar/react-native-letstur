import { Button, Card } from '@rneui/themed';
import { router } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { formatCurrency, formatDateTime } from '../../utils/helpers';

export default function EventCard({ event }: any) {
  const eventInfos = [
    { label: 'Partida', value: formatDateTime(event?.departureDateTime) },
    { label: 'Retorno', value: formatDateTime(event?.arrivalDateTime) },
    { label: 'Lugares totais', value: event?.totalSeats },
    { label: 'Lugares disponíveis', value: event?.availableSeats },
    { label: 'Preço', value: formatCurrency(event?.tour?.priceCents) },
  ];

  return (
    <Card>
      <Card.Title>{event?.tour?.name}</Card.Title>
      <Card.Divider />
      {eventInfos.map((info, index) => (
        <Text key={index} style={{ marginBottom: 10 }}>
          {info.label}: {info.value}
        </Text>
      ))}
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="VER DETALHES"
        onPress={() =>
          router.push({
            pathname: 'details',
            params: { id: event?.id },
          })
        }
      />
    </Card>
  );
}
