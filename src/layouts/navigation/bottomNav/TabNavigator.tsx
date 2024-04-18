import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HistoryAndTask from '../../screens/HistoryAndTask'
import ProfileDetails from '../../screens/ProfileDetails'
import Icon from 'react-native-vector-icons/Ionicons';
import NewLeave from '../../screens/NewLeave'
import Profile from '../../screens/Profile'


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: '#49AA67', }
            }}
        >
            <Tab.Screen name="HistoryAndTask"
                component={HistoryAndTask}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon name="home" color={focused ? '#ffff' : '#d3d3d3'} size={24} />
                    )
                }}
            />

            <Tab.Screen name="NewLeave"
                component={NewLeave}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon name="arrow-up-circle" color={focused ? '#ffff' : '#d3d3d3'} size={30} />
                    )
                }}
            />


            <Tab.Screen name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon name="person" color={focused ? '#ffff' : '#d3d3d3'} size={24} />
                    )
                }}
            />

        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})