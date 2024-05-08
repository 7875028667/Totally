import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from "./src/layouts/navigation/AppNavigation";
import SplashScreen from 'react-native-splash-screen';
import { Appearance } from 'react-native';

export default function App() {
    useEffect(()=>{
        Appearance.setColorScheme('light')
        setTimeout(() =>{
            SplashScreen.hide()
        },3000)
    })
    return (
        <NavigationContainer>
            <AppNavigation />
        </NavigationContainer>
    );
}
