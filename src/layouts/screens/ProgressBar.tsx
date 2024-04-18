import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DrawerNavigator from '../navigation/drawer/DrawerNavigator'




export default function ProgressBar() {
    return (
        <>
            <DrawerNavigator />
            <View>
                <Text>ProgressBar</Text>
                <View style={{ marginBottom: 50 }}>
                    <ScrollView>
                        <AnimatedCircularProgress
                            size={120}
                            width={15}
                            fill={50}
                            tintColor="red"
                            onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor="blue" />
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    progress: {
        backgroundColor: 'red'
    },
    progress2: {
        backgroundColor: 'purple'
    },
})