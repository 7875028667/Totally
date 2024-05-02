import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
// import IonIcon from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';
import { getMethod, postMethod } from '../../utils/helper';
import Loader from '../../component/Loader';


const { width, height } = Dimensions.get('window');
const statusData = [
  {
    image: require('../../Images/transport-image.png'),
    time: 'Today - 10:00am',
    status: 'Package Deliver',
    btn: 'Deliver',
    statuscode: 4

  },
  {
    image: require('../../Images/transport-image.png'),
    time: 'Today - 10:00am',
    status: 'Package Transit',
    btn: 'Transit',
    statuscode: 3

  },
  {
    image: require('../../Images/transport-image.png'),
    time: 'Today - 10:00am',
    status: 'Package Picked Up',
    btn: 'Picked Up',
    statuscode: 2
  },
  {
    image: require('../../Images/transport-image.png'),
    time: 'Today - 10:00am',
    status: 'Package Assigned',
    btn: 'Assign',
    statuscode: 1

  },
];

const PackageInformation = ({ navigation, route }: any) => {
  const orderIdd = route.params;
  
  const [loading, setLoading] = useState(false)
  const [packageinfoDataa, setPackageinfoDataa] = useState([])

  useEffect(() => {
    handleProcessPickup()
  }, [])

  const handleProcessPickup = async () => {
    try {
      setLoading(true)
      const requestBody = {
        order_id:orderIdd
      }
      const api: any = await postMethod(`api/package-info`,requestBody)
      if (api.status == 200) {
        setPackageinfoDataa(api?.data.data.info)
        // console.log('api?.data.data.info', api?.data.data.info);
        // console.log('api?.data', api?.data);
        setLoading(false)

        if (api?.data.data.info.package_status == 'Package deliver') {
          navigation.navigate('OrderCompleted');
        }
      }
    } catch (error) {
      console.log('error while proces pickup api', error);
      setLoading(false)

    }
  }


  const handleTrackingData = async (item: any, index: number) => {
    try {
      setLoading(true)
      const currentTime = new Date();
      const year = currentTime.getFullYear();
      const month = ('0' + (currentTime.getMonth() + 1)).slice(-2);
      const day = ('0' + currentTime.getDate()).slice(-2);
      const hours = ('0' + currentTime.getHours()).slice(-2);
      const minutes = ('0' + currentTime.getMinutes()).slice(-2);
      const seconds = ('0' + currentTime.getSeconds()).slice(-2);

      const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const status = {
        package_status: item.statuscode,
        current_date: formattedTime,
        order_id:orderIdd
      };
      

      const api: any = await postMethod(`api/package-information`, status)
      if (api.status === 200) {
        setLoading(false)
        handleProcessPickup()
      } else {
        console.log('status not 200', api.data.message)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log('error while packageinfo api', error);

    }
  }

  const isButtonDisabled = (status, expectedStatus) => {
    const statusIndex = statusData.findIndex(item => item.status?.toLowerCase() === status?.toLowerCase());
    const expectedStatusIndex = statusData.findIndex(item => item.status?.toLowerCase() === expectedStatus?.toLowerCase());



    return statusIndex <= expectedStatusIndex;
  };


  return (
    <View style={styles.container}>
      <Header title='Package Information' showBellIcon={false} />
      <ScrollView>
        <View style={styles.tracking}>
          <View>
            <Text style={styles.trackHead}>Tracking History</Text>
          </View>
          <View style={styles.status}>
            {statusData.map((item, index) => {
              // const isDisabled = completedItems.includes(index); 
              const status = packageinfoDataa?.package_status;
              const isDisabled = isButtonDisabled(status, item.status);
              return (
                <View key={index} style={[styles.statusView]}>
                  <View style={styles.statusImages}>
                    <Image source={require('../../Images/arrow.png')} style={styles.arrowImage} />
                    <Image source={item.image} style={styles.transportImage} />
                  </View>
                  <View style={styles.statusText}>
                    <View style={{ alignSelf: 'center' }}>
                      {/* <Text style={[styles.transportTime, isDisabled && { opacity: 1 }]}>
                        {
                          packageinfoDataa?.package_status == 'Package assigned' ? packageinfoDataa?.assign_date :
                            packageinfoDataa?.package_status == 'Package picked up' ? packageinfoDataa?.pickup_date :
                              packageinfoDataa?.package_status == 'Package transit' ? packageinfoDataa?.transit_date :
                                packageinfoDataa?.package_status == 'Package deliver' ? packageinfoDataa?.deliver_date :
                                  null}
                      </Text> */}
                      <Text style={[styles.transportText, isDisabled && { opacity: 1 }]}>{item.status}</Text>
                    </View>
                    <View style={styles.completeBtnView}>
                      <TouchableOpacity
                        style={[styles.completeBtn, isDisabled && { opacity: 1 }]}
                        onPress={() => handleTrackingData(item, index)}
                        disabled={isDisabled}
                      >
                        <Text style={styles.completeBtnText}>{item.btn}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={[styles.informationView, { marginTop: 15 }]}>
          <View>
            <Text style={styles.infoHead}>Product Information</Text>
          </View>
          <View style={styles.fromTo}>
            <View style={{ }}>
              <Text style={{ color: '#9A9191', fontWeight: '500', fontSize: width * 0.04 }}>Delivery Address:</Text>
              <Text style={{ color: '#4F4D4D', fontSize: width * 0.035, fontWeight: '600', marginTop:10 }}>{packageinfoDataa?.delivery_address}</Text>
            </View>
          </View>
          <View style={{ paddingVertical: 10,borderBottomColor: '#9A9191', borderBottomWidth: 0.45,}}>
            <View style={styles.times}>
              <Text style={styles.timesText}>Time & Date : </Text>
              <Text style={styles.timesText}>{packageinfoDataa?.assign_date}</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.informationView}>
          <View>
            <Text style={styles.infoHead}>Delivery Information</Text>
          </View>
          <View style={styles.pickDelivery}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: '#9A9191', fontWeight: '500' }}>Pickup Address:</Text>
              <Text style={{ color: '#4F4D4D', fontSize: width * 0.035, fontWeight: '600' }}>{packageinfoDataa?.pickup_address}</Text>
            </View>
          </View>
        </View> */}
      </ScrollView>
      <Loader visible={loading} />
    </View>
  );
};

export default PackageInformation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    height: '100%',
  },
  upperView: {
    backgroundColor: '#49AA67',
    height: height * 0.17,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: height * 0.03,
    paddingLeft: width * 0.03,
    paddingRight: width * 0.03,
  },
  icon: {
    alignSelf: 'flex-start',
  },
  tracking: {
    backgroundColor: 'white',
    padding: 20,
  },
  trackHead: {
    fontSize: width * 0.053,
    color: 'black',
    fontWeight: '700',
    marginBottom: 10,
  },
  status: {},
  statusView: {
    display: 'flex',
    flexDirection: 'row',
  },
  transportImage: {
    height: width * 0.12,
    width: width * 0.12,
  },
  arrowImage: {
    height: width * 0.046,
    width: width * 0.02,
    alignSelf: 'center',
  },
  transportText: {
    color: 'black',
    fontSize: width * 0.045,
    alignSelf: 'center',
    opacity: 0.5,
    fontWeight: '600'
  },
  statusImages: {
    marginRight: 20,
  },
  statusText: {
    marginRight: 20,
    display: 'flex',
    flexDirection: 'row',
    // borderBottomColor: 'grey',
    // borderBottomWidth: 0.5,
    paddingBottom: 10,
    width: width * 0.65,
    justifyContent: 'space-between',
  },
  completeBtnText: {
    fontSize: width * 0.035,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600'

  },
  completeBtnView: {
    alignSelf: 'center',
  },
  completeBtn: {
    backgroundColor: '#EBE206',
    borderRadius: 5,
    width: 60,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5


  },
  transportTime: {
    color: '#9A9191',
    fontSize: width * 0.028,
    opacity: 0.5,
    fontWeight: '500'
  },

  informationView: {
    backgroundColor: '#F9F9F9',
    padding: 8,
    width: width * 0.9,
    marginLeft: '5%',
    marginBottom: 20,
  },
  fromTo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomColor: '#9A9191',
    // borderBottomWidth: 0.45,
    paddingBottom: 15
  },
  infoHead: {
    color: 'black',
    paddingBottom: 10,
    fontWeight: '700',
    fontSize: width * 0.040
  },
  times: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingTop:20
  },
  timesText: {
    fontSize: width * 0.035
  },
  pickDelivery: {
    // borderBottomColor: '#9A9191',
    // borderBottomWidth: 0.45,
    // paddingBottom: 15
  },
});


