import { Card, ListItem } from '@rneui/themed';
import { EventsType, EventType } from '@schemas/event';
import { CreateSale } from '@schemas/sale';
import axiosInstance from '@utils/axios-instance';
import { formatCurrency, formatDateTime } from '@utils/helpers';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

interface EventItemProps {
  event: EventType;
  nextStep: (event: any) => void;
  saleData: CreateSale;
  select: (data: EventType) => void;
}

function EventItem({ event, select }: EventItemProps) {
  return (
    <TouchableOpacity onPress={() => select(event)}>
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
  nextStep: () => void;
  saleData: CreateSale;
  updateSaleData: (data: CreateSale) => void;
}

export default function EventPickStep({ nextStep, saleData, updateSaleData }: EventListProps) {
  const [events, setEvents] = React.useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    await axiosInstance
      .get('/company/events', {
        params: {
          filter: {
            departure_start_date: new Date().toISOString(),
          },
          perPage: 200,
        },
      })
      .then((response) => {
        const events = EventsType.parse(response.data?.data);
        setEvents(events);
      })
      .catch(() => {
        showMessage({ message: 'Erro ao buscar eventos.', type: 'danger' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const selectEvent = (event: EventType) => {
    const eventSaleData = {
      eventId: event.id,
      event,
      quantity: 0,
      passengers: [],
    };
    updateSaleData({ ...saleData, eventSales: [eventSaleData] });
    nextStep();
  };

  return (
    <View className="flex-1" style={{ flex: 1 }}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" className="my-12" />
        ) : (
          events.map((event, index) => (
            <EventItem
              key={index}
              event={event}
              nextStep={nextStep}
              saleData={saleData}
              select={selectEvent}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
