import React from "react";

import {Stack} from "expo-router";

export default function EventsStack() {
    return (
            <Stack initialRouteName="index">
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="details" options={{title: "Detalhes do evento", }} />
            </Stack>
    );
}

// export default Stack