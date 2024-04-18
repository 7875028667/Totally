import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { CombinedDefaultTheme } from './src/utils/theme';
import AppNavigation from "./src/layouts/navigation/AppNavigation";
import SplashScreen from 'react-native-splash-screen'

export default function App() {
    useEffect(()=>{
        setTimeout(() =>{
            SplashScreen.hide()
        },5000)
    })
    return (
        <NavigationContainer>
            <AppNavigation />
        </NavigationContainer>
    );
}
