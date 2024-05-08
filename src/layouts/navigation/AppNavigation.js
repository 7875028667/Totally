import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen'
import LoginScreen from '../screens/LoginScreen';
import NewLeave from '../screens/NewLeave';
import AllLeaves from '../screens/AllLeaves';
import CategoryList from '../screens/CategoryList'
import Odometer from '../screens/Odometer';
import ProgressBar from '../screens/ProgressBar';
import PayslipSummary from '../screens/PayslipSummary';
import DrawerNavigator from './drawer/DrawerNavigator';
import HistoryAndTask from '../screens/HistoryAndTask';
import Profile from '../screens/Profile';
import ProfileDetails from '../screens/ProfileDetails';
import Attendance from '../screens/Attendance';
import MyAttendance from '../screens/MyAttendance';
import VehicleMaintenance from '../screens/VehicleMaintenance';
import AddMaintenance from '../screens/AddMaintenance';
import PackageSummary from '../screens/PackageSummary';
import PackageInformation from '../screens/PackageInformation';
import Notification from '../screens/Notification';
import Map from '../screens/Map';
import OrderCompleted from '../screens/OrderCompleted';
import TabNavigator from './bottomNav/TabNavigator';
import { getStorageData } from '../../utils/helper';
import { set } from 'react-hook-form';
import Loader from '../../component/Loader';
import Timesheet from '../screens/Timesheet';
import Delivery from '../screens/Delivery';
import OrderHistory from '../screens/OrderHistory';
import OrderHistoryDetails from '../screens/OrderHistoryDetails';
import OdometerHistory from '../screens/OdometerHistory';




const Stack = createStackNavigator();



const AppNavigation = () => {

  const [auth, setAuth] = useState('')
  const [load, setLoad] = useState(true)


  useEffect(() => {
    console.log('b');
    fetchData();
  }, [])

  
  const fetchData = async () => {
    try {
      setLoad(true)
      const getData = await getStorageData();
      setAuth(getData.data.token);
      setLoad(false)
    } catch (error) {
      setLoad(false)
      console.log('Initiate data error');
    }
  };


  if (load) {
    return <Loader visible={load} />
  }

  return (
    <Stack.Navigator
      initialRouteName={auth == '' ? 'LoginScreen' : 'DrawerNavigator'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name='TabNavigator' component={TabNavigator} />
      <Stack.Screen name="HistoryAndTask" component={HistoryAndTask} />
      <Stack.Screen name="ProgressBar" component={ProgressBar} />
      <Stack.Screen name="PayslipSummary" component={PayslipSummary} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="NewLeave" component={NewLeave} />
      <Stack.Screen name="AllLeaves" component={AllLeaves} />
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="Odometer" component={Odometer} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="VehicleMaintenance" component={VehicleMaintenance} />
      <Stack.Screen name="AddMaintenance" component={AddMaintenance} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="MyAttendance" component={MyAttendance} />
      <Stack.Screen name="PackageSummary" component={PackageSummary} />
      <Stack.Screen name="PackageInformation" component={PackageInformation} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
      <Stack.Screen name='Timesheet' component={Timesheet} />
      <Stack.Screen name='Delivery' component={Delivery} />
      <Stack.Screen name='OrderHistory' component={OrderHistory} />
      <Stack.Screen name='OdometerHistory' component={OdometerHistory} />
      <Stack.Screen name='OrderHistoryDetails' component={OrderHistoryDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
