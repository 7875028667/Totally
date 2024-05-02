import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../component/Header'

const OrderHistory = () => {
  return (
    <View style={styles.container}>
        <Header title='Order History' showBellIcon={true}/>
      <Text>OrderHistory</Text>
    </View>
  )
}

export default OrderHistory

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'#ffffff'
    }
})