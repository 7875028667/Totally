import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { getMethod } from '../../utils/helper'
import Loader from '../../component/Loader'



const { width, height } = Dimensions.get('window');


const OrderHistory = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [orderHistoryData, setOrderHistoryData] = useState([])

  // console.log('orderHistoryData', orderHistoryData);


  useEffect(() => {
    getOrderDetails()
  }, [])

  const getOrderDetails = async () => {
    try {
      setLoading(true)
      const api: any = await getMethod(`api/order-history`)
      if (api.status == 200) {
        setOrderHistoryData(api?.data?.data?.order_history)
        // console.log('api',api.data.data.order_history);
        setLoading(false)
      } else {
        console.log('error in status of order-history api', api.data.message);
        setLoading(false)
      }
    } catch (error) {
      console.log('error in order-history api', error);
      setLoading(false)
    }

  }

  return (
    <View style={styles.container}>
      <Header title='Order History' showBellIcon={true} />
      <View style={{marginTop:20}}>
        <Text style={{textAlign:'center', fontSize:22, color:'#000000', fontWeight:'600', marginBottom:20 }}>Last 50 Days Order History</Text>
        <FlatList
          data={orderHistoryData}
          keyExtractor={(item, index) => item?.order_number.toString()}
          renderItem={({ item }) => {
            // console.log('item',item);
            return (
              <Pressable style={styles.notificationBox} onPress={() => navigation.navigate('OrderHistoryDetails',{data:item.order_id})}>
                <Text style={[styles.notificationmsg, {
                  color:
                    item.order_status == 'Completed' ? '#12A805' : '#F20000'
                }]}>Order Id : {item.order_number}   {item.order_status}</Text>
                <Text style={{color:'#000000', fontSize:16, fontWeight:'500', marginTop:10}}>Delivery Date : {item.delivery_date}</Text>
              </Pressable>
            )
          }}
          ListEmptyComponent={() => {
            return(
              <View style={{flex:1,}}>
                <Text style={{textAlign:'center', marginTop: height / 5, fontSize:20, fontWeight:'600', color:'#000000'}}>Order History Not Found</Text>
              </View>
            )
          }}
        />
      </View>
      <Loader visible={loading} />
    </View>
  )
}

export default OrderHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  firstText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  notificationBox: {
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    marginVertical: 15,
    borderRadius: 10,
    elevation: 4
  },
  notificationmsg: {
    fontSize: 16,
    fontWeight: '600'
  }
})