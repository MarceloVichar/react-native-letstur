import { Card, ListItem } from '@rneui/themed';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import EventsMock from '../../../../mocks/EventsMock';
import { EventType } from '../../../../schemas/event';
import { formatCurrency, formatDateTime } from '../../../../utils/helpers';

interface EventItemProps {
  event: EventType;
  nextStep: (event: any) => void;
}

function EventItem({ event, nextStep }: EventItemProps) {
  return (
    <TouchableOpacity onPress={() => nextStep(event)}>
      <Card>
        <Card.Title>{event.tour?.name}</Card.Title>
        <Card.Divider />
        <ListItem>
          <ListItem.Content>
            <ListItem.Subtitle>
              Partida: {formatDateTime(event.departureDateTime)}
            </ListItem.Subtitle>
            <ListItem.Subtitle>
              Retorno: {formatDateTime(event.departureDateTime)}
            </ListItem.Subtitle>
            <ListItem.Subtitle>Lugares disponíveis: {event.availableSeats}</ListItem.Subtitle>
            <ListItem.Subtitle>
              Valor: {formatCurrency(event.tour?.priceCents || 0)}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Card>
    </TouchableOpacity>
  );
}

interface EventListProps {
  nextStep: (event: any) => void;
}

export default function EventPickStep({ nextStep }: EventListProps) {
  return (
    <ScrollView className="flex-1">
      {EventsMock.map((event, index) => (
        <EventItem key={index} event={event} nextStep={nextStep} />
      ))}
    </ScrollView>
  );
}
