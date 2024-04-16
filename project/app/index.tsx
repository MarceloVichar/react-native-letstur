import React from "react";
import {Image, ImageBackground, View} from "react-native";
import LoginForm from "../components/auth/LoginForm";

export default function Index() {
    return (
        <View className="flex-1">
            <ImageBackground
                source={require("../assets/login-background.jpg")}
                resizeMode="cover"
                className="flex-1 justify-center items-center px-4"
            >
                <Image source={require("../assets/logo.png")} resizeMode="contain"
                       className="w-32 h-auto"/>
                <View className="w-full bg-base-200 p-4 rounded-lg">
                    <LoginForm/>
                </View>
            </ImageBackground>
        </View>
    );
}