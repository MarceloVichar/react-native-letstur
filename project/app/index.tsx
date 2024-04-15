import React, {useEffect} from "react";
import {ImageBackground, Text, View} from "react-native";
import {router} from "expo-router";
import {ThemeProvider} from "@rneui/themed";

export default function index() {
    useEffect(() => {
        setTimeout(() => {
            router.replace('/auth/login');
        }, 100);
    }, []);

    return (
        <ThemeProvider>
        <View className="flex-1">
            <ImageBackground
                source={require("../assets/login-background.jpg")}
                resizeMode="cover"
                className="flex-1 justify-center items-center"
            >
                <Text className="text-7xl text-red-500">inicio</Text>
            </ImageBackground>
        </View>
            </ThemeProvider>
    );
}