import React from "react";
import {View} from "react-native";
import {Button, Icon, Input} from "@rneui/themed";
import {router} from "expo-router";

export default function LoginForm() {
    return (
        <View className="flex-1">
            <Input placeholder="Digite seu email" label="Email" className="w-full" leftIcon={<Icon name="email"/>}/>
            <Input placeholder="Digite sua senha" label="Senha" secureTextEntry={true} className="w-full"
                   leftIcon={<Icon name="password"/>}/>
            <Button radius={"sm"} type="solid" color="primary" onPress={() => router.push('/(auth)/(events)')}>
                Entrar
            </Button>
        </View>
    );
}