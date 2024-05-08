import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';
import { getMethod, postMethod } from '../../utils/helper';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import Loader from '../../component/Loader';
import Snackbar from 'react-native-snackbar';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

const Attendance = ({ navigation }: any) => {

    const isFocused = useIsFocused();

    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [isPunchedIn, setIsPunchedIn] = useState<boolean>();
    const [loading, setLoading] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<any>(false);
    const [useraddress, setuserAddress] = useState('')
    const [attendanceid, setAttendanceid] = useState<number>()
    console.log('attendanceid', attendanceid);
    console.log('isPunchedIn',isPunchedIn);
    

    useEffect(() => {
        const loadAttendanceId = async () => {
            try {
                const storedAttendanceId = await AsyncStorage.getItem('attendanceId');
                if (storedAttendanceId) {
                    setAttendanceid(parseInt(storedAttendanceId, 10));
                }
            } catch (error) {
                console.log('Error loading attendance id from AsyncStorage:', error);
            }
        };

        getLocationAsync();
        if (isFocused) {
            loadAttendanceId();
            punchData();
        }

        return () => {
            // Cleanup function
        };
    }, [isFocused]);



    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location to function properly.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                return true
            } else {
                console.log('Location permission denied');
                return false
            }
        } catch (err) {
            console.warn(err);
            return false
        }
    };

    const getLocationAsync = async () => {
        setLoading(true);
        const result = requestLocationPermission();
        result.then(res => {
            if (res) {
                Geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation(position.coords);
                        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB0sTJadohiz4yL1uLBrO8MsCQD_VxfLvU&language=en`)
                            .then((resp) => {
                                const addressComponents = resp.data.results[0].address_components
                                const address = `${addressComponents[1].long_name}, ${addressComponents[2].long_name}\n${addressComponents[addressComponents.length - 2].long_name} - ${addressComponents[addressComponents.length - 1].long_name}\n${addressComponents[addressComponents.length - 3].long_name}`;
                                // console.log('address', address);
                                setuserAddress(address)
                                setLoading(false);

                            })
                            .catch((error) => {
                                console.log('error while google map api', error);
                                setLoading(false)
                            })
                    },
                    error => {
                        console.error('Error fetching location:', error);
                        setCurrentLocation(false)
                        setLoading(false)
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
                );
            } else {
                console.log('Location permission not granted.');
                setLoading(false)

            }
        })
    };

    const punchData = async (attendanceid: number) => {
        try {
            setLoading(true)
            const api: any = await getMethod(`api/punch-status`)
            // console.log('api punchData',api.data);

            if (api.status === 200) {
                setIsPunchedIn(api?.data?.data?.is_punch)
                // setAttendanceid(attendanceid)
                setLoading(false)
            } else {
                console.log('error in punch status api', api.data);
                setIsPunchedIn(false)
                setLoading(false)
            }
        } catch (error) {
            console.log('error while punch data api call', error);
            setLoading(false)
        }
    }

    const handlePunchIn = async () => {
        try {
            setLoading(true);
            const currentDate = new Date();
            const formattedDateTime = moment(currentDate).format('DD-MM-YYYY HH:mm:ss');
            const latitude = currentLocation ? currentLocation.latitude : '';
            const longitude = currentLocation ? currentLocation.longitude : '';
            const formattedDate = moment(currentDate).format('DD-MM-YYYY');
            const formattedTime = moment(currentDate).format('HH:mm:ss');
            const requestbody = {
                clock_in: formattedDateTime,
                latitude: latitude,
                longitude: longitude
            }
            const api: any = await postMethod(`api/clock-in`, requestbody);
            console.log('clockv', api?.data);
            console.log('api?.data?.data?.attendance_id', api?.data?.data?.attendance?.attendance_id);

            if (api.status === 200) {
                punchData(api?.data?.data?.attendance?.attendance_id)
                setAttendanceid(api?.data?.data?.attendance?.attendance_id)
                setIsPunchedIn(true)
                setCurrentTime(formattedDate)
                setCurrentDate(formattedTime)
                Snackbar.show({
                    text: 'Punch In Successfully',
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                const attendanceIdFromAPI = api?.data?.data?.attendance?.attendance_id;
                if (attendanceIdFromAPI) {
                    await AsyncStorage.setItem('attendanceId', attendanceIdFromAPI.toString()); // Save the attendanceid to AsyncStorage
                    // setAttendanceid(attendanceIdFromAPI);
                }
                setLoading(false)
            } else {
                console.log('api not work correctly');
                Snackbar.show({
                    text: 'Problem While PunchIn',
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'black',
                    backgroundColor: 'red',
                });
                setLoading(false)
            }
        } catch (error) {
            console.log('Error while punching in punch in::', error);
            setLoading(false);
        }
    };

    const handlePunchOut = async () => {
        if (attendanceid) {
            try {
                setLoading(true)
                const currentDate = new Date();
                const formattedDateTime = moment(currentDate).format('DD-MM-YYYY HH:mm:ss');
                const latitude = currentLocation ? currentLocation.latitude : '';
                const longitude = currentLocation ? currentLocation.longitude : '';
                const formattedDate = moment(currentDate).format('DD-MM-YYYY');
                const formattedTime = moment(currentDate).format('HH:mm:ss');
                const punchoutdata = {
                    clock_out: formattedDateTime,
                    latitude: latitude,
                    longitude: longitude,
                    attendance_id: attendanceid
                }
                // console.log('punchoutdata', punchoutdata)
                const api: any = await postMethod(`api/clock-out`, punchoutdata)
                // console.log('apiiiiiout', api);

                if (api.status === 200) {
                    setCurrentTime(formattedDate)
                    setCurrentDate(formattedTime)
                    Snackbar.show({
                        text: 'Punch out Successfully',
                        duration: Snackbar.LENGTH_SHORT,
                        textColor: 'black',
                        backgroundColor: 'green',
                    });
                    setIsPunchedIn(false)
                    await AsyncStorage.removeItem('attendanceId');
                    setLoading(false)
                    console.log('out');
                    
                } else {
                    console.log('api not work correctly');
                    setLoading(false)

                }

            } catch (error) {
                console.log('Error while punching in punch_out', error);
                Snackbar.show({
                    text: 'Problem While PunchIn',
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'black',
                    backgroundColor: 'red',
                });
                setLoading(false)
            }
        } else {
            console.log('Please Try Again');

        }
    }

    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>
            <Header title='Attendance' showBellIcon={false} />
            <ScrollView>
                <View style={{ marginTop: 25, marginBottom: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MyAttendance')}>
                        <Text style={{ color: '#49AA67', alignSelf: 'center' }}>View Report</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.liveAddress}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <IonIcon name="location" color={'skyblue'} size={width * 0.06} style={styles.icon} />
                            <Text style={[styles.addressText, { marginBottom: 10, paddingLeft: 10 }]}>Live Location</Text>
                        </View>
                        <Text style={styles.addressText}>{useraddress}</Text>
                        {/* <Text style={styles.addressText}>India</Text> */}
                    </View>
                </View>
                <View style={[styles.liveAddress, { marginBottom: 50 }]}>
                    <Text style={styles.time}>{currentTime}</Text>
                    <Text style={styles.date}>{currentDate}</Text>

                    <View>
                        <View style={{ alignSelf: 'center', margin: 15, }}>
                            {
                                isPunchedIn ?
                                    <TouchableOpacity style={styles.punchInBtn} onPress={handlePunchOut}>
                                        <Text style={{ alignSelf: 'center', marginTop: width * 0.13, color: '#4F4D4D', fontWeight: '600', fontSize: width * 0.05 }}>Punch Out</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.punchInBtn} onPress={handlePunchIn}>
                                        <Text style={{ alignSelf: 'center', marginTop: width * 0.13, color: '#4F4D4D', fontWeight: '600', fontSize: width * 0.05 }}>Punch In</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                        <Text style={styles.startWork}>{isPunchedIn ? 'End Your Work' : 'Start Your Work'}</Text>
                    </View>
                </View>
            </ScrollView>
            <Loader visible={loading} />
        </View>
    );
};

export default Attendance;

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'flex-start',
    },
    addressText: {
        fontSize: width * 0.04,
        color: '#484A4B',
        textAlign: 'center',
        fontWeight: '500'
    },
    liveAddress: {
        backgroundColor: '#F6F6F6',
        width: '80%',
        marginLeft: '10%',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 20,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
    },
    time: {
        fontSize: width * 0.055,
        fontWeight: '900',
        color: '#484A4B',
        alignSelf: 'center',
        marginBottom: 5

    },
    date: {
        fontSize: width * 0.045,
        color: '#7E7E7E',
        alignSelf: 'center',
    },
    punchInBtn: {
        backgroundColor: '#EBE206',
        borderRadius: 50,
        height: width * 0.32,
        width: width * 0.32,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
    },
    startWork: {
        alignSelf: 'center',
        color: '#4F4D4D',
        fontWeight: '600',
        fontSize: width * 0.035
    }
});
