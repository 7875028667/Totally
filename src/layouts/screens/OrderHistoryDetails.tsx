import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import { postMethod } from '../../utils/helper';
import Loader from '../../component/Loader';

const OrderHistoryDetails = ({ route }) => {
  const orderId = route.params
  console.log(orderId);

  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
      setLoading(true)
      const body = {
        order_id: orderId.data
      }
      const api: any = await postMethod(`api/order-details`, body)
      if (api.status == 200) {
        // console.log('apiaa', api.data.data);
        setCustomerDetails(api.data.data)
        setLoading(false)
      } else {
        console.log('error in orderdetails', api.data.message);
        setLoading(false)
      }
    } catch (error) {
      console.log('error in orderdetail api', error);
      setLoading(false)
    }
  }
  // console.log('customerDetails?.order_details',customerDetails?.order_details);
  
  return (
    <View style={styles.container}>
      <Header title='Order History Details' showBellIcon={true} />
      <ScrollView style={{ marginTop: 20 }}>
        <View style={styles.customerDetails}>
          <Text style={styles.customerText}>Customer Details :-</Text>

          <Text style={styles.customerName}>Customer Name : {customerDetails?.customer_name}</Text>

          <Text style={styles.customerName}>Customer Address : {customerDetails?.billing_address}</Text>

          <Text style={styles.customerName}>Order Date : {customerDetails?.order_date}</Text>

        </View>


        <View style={{ marginLeft: 10, marginTop: 20 }}>
          <Text style={styles.customerText}>Order Details :-</Text>
          <Text style={styles.customerName}>Order Number : {customerDetails?.order_number}</Text>
          {
            customerDetails?.order_details?.map((item: any, index) => {
              return (
                <View style={styles.orderDetails} key={index}>
                  <Text style={styles.productStyle}>Product Name : {item.product_name}</Text>
                  <Text style={styles.productStyle}>Quantity : {item.quantity}</Text>
                  <Text style={styles.productStyle}>Total Amount : {item.total_amount}</Text>
                  <Text style={styles.productStyle}>Unit Price : {item.unit_price}</Text>
                </View>
              )
            })
          }

        </View>
      </ScrollView>
      <Loader visible={loading} />
    </View>
  )
}

export default OrderHistoryDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff'
  },
  customerDetails: {
    width: '90%',
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center'
  },
  customerText: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 16,
    fontWeight: '600',
    color: '#000000'
  },
  customerName: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 14,
    fontWeight: '400',
    color: '#000000'
  },
  orderDetails: {
    margin: 10,
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal:10,
    borderRadius:8
  },
  productStyle:{
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginVertical:5
  }
})