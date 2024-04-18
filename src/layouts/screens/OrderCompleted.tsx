import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

const OrderCompleted = () => {
    return (
        <View style={styles.container}>
            {/* <Text>OrderCompleted</Text> */}
            <Image source={require('../../Images/order-complete.png')} style={styles.image} />
            <Text style={styles.text}>Your Order is completed</Text>
        </View>
    )
}

export default OrderCompleted

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#49AA67',
        paddingTop: 50,

    },
    image: {
        height: width * 0.55,
        width: width * 0.6,
        alignSelf: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: width * 0.06,
        fontWeight: '500',
        color: 'white',
        marginTop:20,
    },
})