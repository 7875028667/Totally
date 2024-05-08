import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';
import { getMethod } from '../../utils/helper';
import { useFocusEffect } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const Notification = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const [notificationData, setNotificationData] = useState([])

  // console.log('notificationData', notificationData);

  useFocusEffect(
    React.useCallback(() => {
      getNotificationData();
      return () => {
        // Optionally, you can return a cleanup function
      };
    }, [])
  );

  const getNotificationData = async () => {
    try {
      setLoading(true)
      const api: any = await getMethod(`api/notification`)
      if (api.status === 200) {
        setNotificationData(api.data.data.notification)
        setLoading(false)
      } else {
        console.log('error in status code of notification api', api.data.message);
        setLoading(false)
      }
    } catch (error) {
      console.log('error while notification api', error);
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Header title='Notifications' showBellIcon={false} />
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={notificationData}
          keyExtractor={(item, index) => item?.order_id.toString()}
          renderItem={({ item }) => {
            // console.log('item',item);
            //onPress={() => navigation.navigate('Map', { data: item })}
            return (
              <Pressable style={styles.notificationBox} >
                <Text style={[styles.notificationmsg, {
                  color:
                    item?.order_status === 1 ? '#12A805' :
                      item?.order_status === 2 ? '#000000' :
                        item?.order_status === 3 ? '#F20000' : ''
                }]}>{item.message}</Text>
              </Pressable>
            )
          }}
          ListEmptyComponent={() => {
            return(
              <View style={{flex:1,}}>
                <Text style={{textAlign:'center', marginTop: height / 5, fontSize:20, fontWeight:'600', color:'#000000'}}>You Dont Have Any Notification</Text>
              </View>
            )
          }}
        />
      </View>
    </View >
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%'
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