import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomDrawer from './CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from '../bottomNav/TabNavigator';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} initialRouteName='Home'>
            <Drawer.Screen name='Home' component={TabNavigator} options={{ headerShown: false }} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator

const styles = StyleSheet.create({})