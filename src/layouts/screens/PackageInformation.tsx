import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';
// import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const PackageInformation = ({ navigation }: any) => {
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  return (
    <View style={styles.container}>
      <Header title='Package Information' showBellIcon={true} /> 
      <ScrollView>
        <View style={styles.tracking}>
          <View>
            <Text style={styles.trackHead}>Tracking History</Text>
          </View>
          <View style={styles.status}>
            {statusData.map((item, index) => {
              const isDisabled = index < 3 && !completedItems.includes(index + 1);
              return (
                <View key={index} style={[styles.statusView, completedItems.includes(index) && { opacity: 0.5 }]}>
                  <View style={styles.statusImages}>
                    <Image source={require('../../Images/arrow.png')} style={styles.arrowImage} />
                    <Image source={item.image} style={styles.transportImage} />
                  </View>
                  <View style={styles.statusText}>
                    <View style={{ alignSelf: 'center' }}>
                      <Text style={styles.transportTime}>{item.time}</Text>
                      <Text style={styles.transportText}>{item.status}</Text>
                    </View>
                    <View style={styles.completeBtnView}>
                      <TouchableOpacity
                        style={[styles.completeBtn, isDisabled && { opacity: 0.5, backgroundColor: '#D3D3D3' }]}
                        disabled={isDisabled}
                        onPress={() => {
                          if (completedItems.includes(index)) {
                            setCompletedItems(completedItems.filter(itemIndex => itemIndex !== index));
                          } else {
                            setCompletedItems([...completedItems, index]);
                          }
                        }}
                      >
                        <Text style={styles.completeBtnText}>Complete</Text>
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
            <View style={{ width: '50%' }}>
              <Text style={{ color: '#9A9191' }}>From:</Text>
              <Text style={{ color: '#4F4D4D', fontSize: width * 0.045 }}>Sector no. 5,
                Chandigarh</Text>
            </View>
            <View style={{ width: '50%' }}>
              <Text style={{ color: '#9A9191' }}>To:</Text>
              <Text style={{ color: '#4F4D4D', fontSize: width * 0.045 }}>Sector no.45,
                Chandigarh</Text>
            </View>
          </View>
          <View style={{ paddingTop: 10 }}>
            <View style={styles.times}>
              <Text style={styles.timesText}>Time & Date:</Text>
              <Text style={styles.timesText}>9:00am, 20 Sep,2022</Text>
            </View>
            <View style={styles.times}>
              <Text style={styles.timesText}>Vechile Type:</Text>
              <Text style={styles.timesText}>Mini-Van ($12,000)</Text>
            </View>
          </View>
        </View>
        <View style={styles.informationView}>
          <View>
            <Text style={styles.infoHead}>Delivery Information</Text>
          </View>
          <View style={styles.pickDelivery}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: '#9A9191' }}>Pickup Address:</Text>
              <Text style={{ color: '#4F4D4D', fontSize: width * 0.047 }}>Ravindar chowk,Sector
                no. 5,Chandigarh</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  },
  statusImages: {
    marginRight: 20,
  },
  statusText: {
    marginRight: 20,
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    width: width * 0.65,
    justifyContent: 'space-between',
  },
  completeBtnText: {
    fontSize: width * 0.021,
    color: 'black',
  },
  completeBtnView: {
    alignSelf: 'center',
  },
  completeBtn: {
    backgroundColor: '#EBE206',
    padding: 4,
    borderRadius: 5,
  },
  transportTime: {
    color: '#9A9191',
    fontSize: width * 0.028,
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
    borderBottomColor: '#9A9191',
    borderBottomWidth: 0.45,
    paddingBottom: 15
  },
  infoHead: {
    color: 'black',
    paddingBottom: 10,
    fontWeight:'700',
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

const statusData = [
  {
    image: require('../../Images/transport-image.png'),
    time: 'Today - 10:00am',
    status: 'Package Deliver',
  },
  {
    image: require('../../Images/transport-image.png'),
    time: 'Today - 10:00am',
    status: 'Package Transit',
  },
  {
    image: require('../../Images/transport-image.png'),
    time: 'Today - 10:00am',
    status: 'Package Picked Up',
  },
  {
    image: require('../../Images/transport-image.png'),
    time: 'Today - 10:00am',
    status: 'Package Assigned',
  },
];
