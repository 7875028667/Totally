import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HistoryAndTask from '../../screens/HistoryAndTask'
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from '../../screens/Profile'
import Delivery from '../../screens/Delivery'


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: 'green' }
            }}
        >
            <Tab.Screen name="HistoryAndTask"
                component={HistoryAndTask}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ marginTop: 10 }}>
                            <Icon name="home" color={focused ? '#ffff' : '#d3d3d3'} size={24} />
                        </View>
                    ),
                }}
            />

            <Tab.Screen name="Delivery"
                component={Delivery}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ marginTop: 10 }}>
                            <Icon name="arrow-up-circle" color={focused ? '#ffff' : '#d3d3d3'} size={25} />
                        </View>
                    ),
                }}
            />


            <Tab.Screen name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ marginTop: 10, }}>
                            <Icon name="person" color={focused ? '#ffff' : '#d3d3d3'} size={24} />
                        </View>
                    ),
                }}
            />

        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})