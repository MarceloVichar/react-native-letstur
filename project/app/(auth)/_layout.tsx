import React from 'react';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {Image, View} from 'react-native';
import {router} from "expo-router";
import {Drawer} from "expo-router/drawer";

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
            <View className="flex w-full items-center">
                <Image source={require("../../assets/logo.png")} resizeMode="contain" className="w-28 h-auto"/>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem label="Sair" onPress={() => router.push('/')} labelStyle={{color: 'red'}}
                        style={{backgroundColor: 'white', marginTop: 24}}/>
        </DrawerContentScrollView>
    );
}

export default function OperatorArea() {

    return (
        <Drawer
            drawerContent={(props: any) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#33C8B6',

                }
            }}
        >
            <Drawer.Screen
                name="(events)"
                options={{
                    drawerLabel: "Eventos",
                    title: "Eventos",
                }}
            />
            <Drawer.Screen
                name="sales/index"
                options={{
                    drawerLabel: "Vendas",
                    title: "Vendas",
                }}
            />
        </Drawer>
    );
}