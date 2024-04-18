import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';



const { width, height } = Dimensions.get('window');
const Notification = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title='Notifications' showBellIcon={false} />
        <View style={styles.notificationMainView}>
          {/* ---------------FOR TODAY RECIEVED------------------------------- */}
          <View style={styles.dayWise}>
            <Text style={styles.date}>Today</Text>
            <View style={styles.notiView}>
              <View style={styles.orderDetail}>
                <Text style={[styles.orderDetailHead, { color: '#12A805', }]}>Order  no. #256 is receive</Text>
                <Text style={styles.orderDetails}>Your package is home with the reciplent</Text>
              </View>
              <View style={styles.notiTime}>
                <Text style={styles.notiTime}>9:00am</Text>
              </View>
            </View>
          </View>
          {/* ---------------FOR TODAY------------------------------- */}
          {/* ---------------FOR YESTERDAY RECIEVED------------------------------- */}
          <View style={styles.dayWise}>
            <Text style={styles.date}>Yesterday</Text>
            <View style={styles.notiView}>
              <View style={styles.orderDetail}>
                <Text style={[styles.orderDetailHead, { color: '#12A805', }]}>Order  no. #256 is receive</Text>
                <Text style={styles.orderDetails}>Your package is home with the reciplent</Text>
              </View>
              <View style={styles.notiTime}>
                <Text style={styles.notiTime}>9:00am</Text>
              </View>
            </View>
            {/* ---------------FOR YESTERDAY RECIEVED------------------------------- */}
            {/* ---------------FOR YESTERDAY COMPLETED------------------------------- */}
            <View style={styles.notiView}>
              <View style={styles.orderDetail}>
                <Text style={[styles.orderDetailHead, { color: 'black', }]}>Order  no. #256 is completed</Text>
                <Text style={styles.orderDetails}>Your package is home with the reciplent</Text>
              </View>
              <View style={styles.notiTime}>
                <Text style={styles.notiTime}>9:00am</Text>
              </View>
            </View>
          </View>
          {/* ---------------FOR YESTERDAY COMPLETED------------------------------- */}
          {/* ---------------FOR YESTERDAY CANCELLED------------------------------- */}
          <View style={styles.notiView}>
            <View style={styles.orderDetail}>
              <Text style={[styles.orderDetailHead, { color: 'red', }]}>Order  no. #256 is cancelled</Text>
              <Text style={styles.orderDetails}>Your package is home with the reciplent</Text>
            </View>
            <View style={styles.notiTime}>
              <Text style={styles.notiTime}>9:00am</Text>
            </View>
          </View>
          {/* ---------------FOR YESTERDAY CANCELLED------------------------------- */}

          {/* ---------------FOR DATE RECIEVED------------------------------- */}
          <View style={styles.dayWise}>
            <Text style={styles.date}>20-08-2023</Text>
            <View style={styles.notiView}>
              <View style={styles.orderDetail}>
                <Text style={[styles.orderDetailHead, { color: '#12A805', }]}>Order  no. #256 is receive</Text>
                <Text style={styles.orderDetails}>Your package is home with the reciplent</Text>
              </View>
              <View style={styles.notiTime}>
                <Text style={styles.notiTime}>9:00am</Text>
              </View>
            </View>
            {/* ---------------FOR DATE RECIEVED------------------------------- */}
            {/* ---------------FOR DATE COMPLETED------------------------------- */}
            <View style={styles.notiView}>
              <View style={styles.orderDetail}>
                <Text style={[styles.orderDetailHead, { color: 'black', }]}>Order  no. #256 is completed</Text>
                <Text style={styles.orderDetails}>Your package is home with the reciplent</Text>
              </View>
              <View style={styles.notiTime}>
                <Text style={styles.notiTime}>9:00am</Text>
              </View>
            </View>
          </View>
          {/* ---------------FOR DATE COMPLETED------------------------------- */}
          {/* ---------------FOR DATE CANCELLED------------------------------- */}
          <View style={styles.notiView}>
            <View style={styles.orderDetail}>
              <Text style={[styles.orderDetailHead, { color: 'red', }]}>Order  no. #256 is cancelled</Text>
              <Text style={styles.orderDetails}>Your package is home with the reciplent</Text>
            </View>
            <View style={styles.notiTime}>
              <Text style={styles.notiTime}>9:00am</Text>
            </View>
          </View>
          {/* ---------------FOR DATE CANCELLED------------------------------- */}


        </View>
      </ScrollView >
    </View >
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%'
  },
  upperView: {
    backgroundColor: '#49AA67',
    height: height * 0.17,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingTop: height * 0.03,
    paddingLeft: width * 0.03,
    paddingRight: width * 0.03,

  },
  icon: {
    alignSelf: 'flex-start',
  },
  notificationMainView: {
    // backgroundColor: 'red',
    padding: 10,
  },
  notiView: {
    backgroundColor: '#E2E2E2',
    display: 'flex',
    flexDirection: 'row',
    width: width * 0.9,
    alignSelf: 'center',
    padding: 6,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  date: {
    color: '#777777',
    marginLeft: 8,
    marginBottom: 5,
    fontSize: width * 0.04,

  },
  orderDetail: {
    width: width * 0.74,
    paddingLeft: 5,
    paddingRight: 5,
  },
  notiTime: {
    fontSize: width * 0.03,
    alignSelf: 'center'
  },
  orderDetailHead: {
    fontSize: width * 0.037,


  },
  orderDetails: {
    color: '#848282',
    fontSize: width * 0.03,
  },
  dayWise: {
    marginTop: 20,
  },
})