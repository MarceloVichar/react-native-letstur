import React from "react";
import {Image, ImageBackground, Text, View} from "react-native";
import LoginForm from "../../elements/auth/LoginForm";

export default function login() {
    return (
        <View className="flex-1">
            <ImageBackground
                source={require("../../assets/login-background.jpg")}
                resizeMode="cover"
                className="flex-1 justify-center items-center px-4 gap-4"
            >
                <Image source={require("../../assets/logo.png")} resizeMode="contain"
                       className="w-48 h-auto absolute top-0"/>
                <View className="w-full bg-base-200 p-4 rounded-lg">
                    <LoginForm/>
                </View>
            </ImageBackground>
        </View>
    );
}