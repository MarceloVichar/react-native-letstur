import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Image, View} from 'react-native';
import Events from './events';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
            <View className="flex w-full justify-center px-16">
                <Image source={require("../../assets/logo.png")} resizeMode="contain" className="w-full h-auto"/>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default function OperatorArea() {

    return (
        <Drawer.Navigator
            drawerContent={(props: any) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Eventos" component={Events}/>
        </Drawer.Navigator>
    );
}