import React from "react";
import {ScrollView, View} from "react-native";
import EventsMock from "../../../mocks/EventsMock";
import {SearchBar} from "@rneui/themed";
import EventCard from "../../../components/events/EventCard";

export default function Events() {
    const events = EventsMock

    return (
        <View className="flex-1">
            <SearchBar placeholder="Buscar eventos por passeio" className="mb-4" lightTheme/>
            <ScrollView className="mb-4">
                {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </ScrollView>
        </View>
    );
}