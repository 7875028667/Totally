import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getStorageData } from '../../../utils/helper';
import Loader from '../../../component/Loader';


const { width, height } = Dimensions.get('window');

const CustomDrawer = (props: any) => {

  const navigation = useNavigation();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false)

  // console.log(userData);


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setLoading(true)
      const userData = await getStorageData();
      setUserData(userData.data.user)
      setLoading(false)
    } catch (error) {
      console.log('error in getstorage data in custom drawer', error);
      setLoading(false)
    }

  }

  const goToAttendance = () => {
    navigation.navigate('Attendance');
  };
  const goToLeave = () => {
    navigation.navigate('AllLeaves');
  };
  const goToPayroll = () => {
    navigation.navigate('PayslipSummary');
  };
  const goToOdometer = () => {
    navigation.navigate('Odometer');
  };
  const goToProfile = () => {
    navigation.navigate('Profile');
  };
  const goToDelivery = () => {
    navigation.navigate('Delivery');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'purple', height: height * 1.5 }}>
      <ImageBackground
        source={require('../../../Images/drawerbg.png')} style={styles.container} >
        <View style={styles.logoContainer}>
          <Image source={require('../../../Images/logo.png')} style={styles.logo} />
        </View>
        <DrawerContentScrollView {...props}>
          {/* <DrawerItemList {...props} /> */}
          <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.5, marginBottom: 15, marginTop: 50 }}>
            <DrawerItem
              label="Attendance"
              icon={() => (
                <View style={styles.iconContainer}>
                  <Ionicons name="calendar" size={width * 0.05} color="white" />
                  <Text style={styles.iconText}>Attendance</Text>
                </View>
              )}
              onPress={goToAttendance}
              labelStyle={styles.labelStyle}
            />
            <DrawerItem
              label="leave"
              icon={() => (
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="calendar-alert" size={width * 0.05} color="white" />
                  <Text style={styles.iconText}>Leave</Text>
                </View>
              )}
              onPress={goToLeave}
              labelStyle={styles.labelStyle}
            />
            <DrawerItem
              label="payroll"
              icon={() => (
                <View style={styles.iconContainer}>
                  <Ionicons name="wallet-outline" size={width * 0.05} color="white" />
                  <Text style={styles.iconText}>Pay Roll</Text>
                </View>
              )}
              onPress={goToPayroll}
              labelStyle={styles.labelStyle}
            />
            <DrawerItem
              label="odometer"
              icon={() => (
                <View style={styles.iconContainer}>
                  <MaterialIcons name="speed" size={width * 0.05} color="white" />
                  <Text style={styles.iconText}>Odometer</Text>
                </View>
              )}
              onPress={goToOdometer}
              labelStyle={styles.labelStyle}
            />
          </View>
          <View>
            <Text style={styles.accText}>
              ACCOUNT
            </Text>
            <DrawerItem
              label="profile"
              icon={() => (
                <View style={styles.iconContainer}>
                  <Ionicons name="person" size={width * 0.05} color="white" />
                  <Text style={styles.iconText}>My Profile</Text>
                </View>
              )}
              onPress={goToProfile}
              labelStyle={styles.labelStyle}
            />
            <DrawerItem
              label="Delivery Details"
              icon={() => (
                <View style={styles.iconContainer}>
                  <Ionicons name="cart" size={width * 0.05} color="white" />
                  <Text style={styles.iconText}>Delivery Details</Text>
                </View>
              )}
              onPress={goToDelivery}
              labelStyle={styles.labelStyle}
            />
          </View>
          <View style={{marginTop:width * 0.2}}>
            <TouchableOpacity style={styles.logoutBtn}>
              <View>
                {userData?.profile_img ?
                  <Image source={{ uri: userData?.profile_img }} style={styles.profileImage} />
                  :
                  <Image source={require('../../../Images/profile.png')} style={styles.profileImage} />
                }
              </View>
              <View style={styles.personDetail}>
                <Text style={styles.personName}>{userData?.first_name}</Text>
                <Text style={styles.personEmail}>{userData?.email}</Text>
              </View>
              {/* <View style={styles.threeDot}>
                <Text style={{ fontWeight: '900' }}>•••</Text>
              </View> */}
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
        <Loader visible={loading} />
      </ImageBackground>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'flex-start',
    backgroundColor: 'red',
    paddingLeft: 20,
    paddingTop: 20,
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 40,
  },
  logo: {
    width: width * 0.2,
    height: width * 0.1,
  },
  labelStyle: {
    color: 'red',
    display: 'none',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
    padding: -10,
    margin: 0,
  },
  iconText: {
    color: 'white',
    fontSize: width * 0.04,
    marginLeft: 10,
    padding: -10,
    margin: 0,

  },
  drawerItemContainer: {
    margin: 0,
    padding: 0,
  },
  drawerItemLabel: {
    marginLeft: 0,
  },
  drawerItemIconContainer: {
    marginLeft: 0,
    marginRight: 10,
    padding: 0,
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius:width * 0.05  },
  logoutBtn: {
    backgroundColor: '#EBE206',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: width * 0.60
  },
  personDetail: {
    display: 'flex',
    marginLeft:10
  },
  personName: {
    fontSize: 13,
    fontWeight: '700',
    color:'#000000'
  },
  personEmail: {
    fontSize: 13,
    fontWeight: '400',
    color:'#000000'

  },
  threeDot: {
    display: 'flex',
    justifyContent: 'center',
  },
  accText: {
    color: 'white',
    fontSize: width * 0.025
  }
})