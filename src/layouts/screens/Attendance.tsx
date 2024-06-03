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
import ProminentDisclosure from '../../component/ProminentDisclosure';

const { width } = Dimensions.get('window');

const Attendance = ({ navigation }) => {
    const isFocused = useIsFocused();

    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [isPunchedIn, setIsPunchedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [userAddress, setUserAddress] = useState('');
    const [showDisclosure, setShowDisclosure] = useState(false);

    useEffect(() => {
        if (isFocused) {
            checkLocationPermissionAccepted();
            punchData();
        }
    }, [isFocused]);

    const checkLocationPermissionAccepted = async () => {
        const accepted = await AsyncStorage.getItem('locationPermissionAccepted');
        if (!accepted) {
            setShowDisclosure(true);
        } else {
            requestLocationPermission();
        }
    };

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
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getLocationAsync();
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getLocationAsync = async () => {
        setLoading(true);
        try {
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                    fetchAddress(latitude, longitude);
                },
                error => {
                    console.error('Error fetching location:', error);
                    setLoading(false);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
            );
        } catch (error) {
            console.error('Error requesting location:', error);
            setLoading(false);
        }
    };

    const fetchAddress = async (latitude, longitude) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB0sTJadohiz4yL1uLBrO8MsCQD_VxfLvU&language&language=en`);
            const addressComponents = response.data.results[0].address_components;
            const address = `${addressComponents[1].long_name}, ${addressComponents[2].long_name}\n${addressComponents[addressComponents.length - 2].long_name} - ${addressComponents[addressComponents.length - 1].long_name}\n${addressComponents[addressComponents.length - 3].long_name}`;
            setUserAddress(address);
        } catch (error) {
            console.error('Error fetching address:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptDisclosure = () => {
        setShowDisclosure(false);
        requestLocationPermission();
    };

    const punchData = async () => {
        setLoading(true);
        try {
            const api = await getMethod('api/punch-status');
            if (api.status === 200) {
                setIsPunchedIn(api.data.data.is_punch);
            } else {
                console.log('Error in punch status API', api.data);
                setIsPunchedIn(false);
            }
        } catch (error) {
            console.log('Error fetching punch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePunch = async (type) => {
        setLoading(true);
        const currentDate = new Date();
        const formattedDateTime = moment(currentDate).format('DD-MM-YYYY HH:mm:ss');
        const latitude = currentLocation ? currentLocation.latitude : '';
        const longitude = currentLocation ? currentLocation.longitude : '';
        const requestBody = {
            clock_in: type === 'in' ? formattedDateTime : null,
            clock_out: type === 'out' ? formattedDateTime : null,
            latitude,
            longitude
        };

        try {
            const endpoint = type === 'in' ? 'api/clock-in' : 'api/clock-out';
            const api = await postMethod(endpoint, requestBody);

            if (api.status === 200) {
                punchData();
                setIsPunchedIn(type === 'in');
                const formattedDate = moment(currentDate).format('DD-MM-YYYY');
                const formattedTime = moment(currentDate).format('HH:mm:ss');
                setCurrentTime(formattedDate);
                setCurrentDate(formattedTime);

                Snackbar.show({
                    text: type === 'in' ? 'Punch In Successfully' : 'Punch Out Successfully',
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
            } else {
                Snackbar.show({
                    text: 'Problem While Punching',
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'red',
                });
                console.log('API did not work correctly', api.data);
            }
        } catch (error) {
            console.log(`Error while punching ${type}:`, error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {showDisclosure && <ProminentDisclosure onAccept={handleAcceptDisclosure} />}
            {!showDisclosure && (
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
                                <Text style={styles.addressText}>{userAddress}</Text>
                            </View>
                        </View>
                        <View style={[styles.liveAddress, { marginBottom: 50 }]}>
                            <Text style={styles.time}>{currentTime}</Text>
                            <Text style={styles.date}>{currentDate}</Text>
                            <View>
                                <View style={{ alignSelf: 'center', margin: 15 }}>
                                    {isPunchedIn ? (
                                        <TouchableOpacity style={styles.punchInBtn} onPress={() => handlePunch('out')}>
                                            <Text style={{ alignSelf: 'center', marginTop: width * 0.13, color: '#4F4D4D', fontWeight: '600', fontSize: width * 0.05 }}>Punch Out</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.punchInBtn} onPress={() => handlePunch('in')}>
                                            <Text style={{ alignSelf: 'center', marginTop: width * 0.13, color: '#4F4D4D', fontWeight: '600', fontSize: width * 0.05 }}>Punch In</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <Text style={styles.startWork}>{isPunchedIn ? 'End Your Work' : 'Start Your Work'}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <Loader visible={loading} />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'flex-start',
    },
    addressText: {
        fontSize: width * 0.04,
        color: '#484A4B',
        textAlign: 'center',
        fontWeight: '500',
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
        marginBottom: 5,
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
        fontSize: width * 0.035,
    },
});

export default Attendance;
