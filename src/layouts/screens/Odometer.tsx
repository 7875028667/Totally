import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable, TextInput, Image } from 'react-native';
import Header from '../../component/Header';
import { postMethod, getMethod } from '../../utils/helper';
import Loader from '../../component/Loader';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Odometer = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [startOdometerValue, setStartOdometerValue] = useState('');
    const [endOdometerValue, setEndOdometerValue] = useState('');
    const [odometerData, setOdometerData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [startOdoMeterData, setStartOdoMeterData] = useState([]);
    const [endOdoMeterData, setEndOdoMeterData] = useState([]);
    const [startOdometerPressed, setStartOdometerPressed] = useState(false); 

    const handleStartOdometer = async () => {
        try {
            setLoading(true);
            const data = {
                start_odometer:startOdometerValue
            };
            const api:any = await postMethod(`api/start-odometer`, data);

            if (api.status === 200) {
                setStartOdoMeterData(api?.data.data)
                setLoading(false);
                setStartOdometerPressed(true); // Mark Start Odometer as pressed
            } else {
                console.log('error in start odometer api status', api.data);
                setLoading(false);
            }
        } catch (error) {
            console.log('error in start odometer api', error);
            setLoading(false);
        }
    };

    const handleEndOdometer = async () => {
        try {
            setLoading(true);
            // const total_distanceofspeedometer = startOdometerValue + endOdometerValue + ' km';
            const data = {
                end_odometer: endOdometerValue,
                odometer_id:startOdoMeterData?.odometer_id
            };

            const api:any = await postMethod(`api/end-odometer`, data);
            // console.log('aaaaaa', api.data);

            if (api.status == 200) {
                setEndOdoMeterData(api?.data.data)
                setStartOdometerPressed(false);
                setLoading(false);// Mark Start Odometer as not pressed
            } else {
                console.log('error in end odometer api status', api.data);
                setLoading(false);
            }
        } catch (error) {
            console.log('error in end odometer api', error);
            setLoading(false);
        }
    };

    const handleCheckHistory = () => {
        setShowDatePicker(true);
    };

    const handleConfirmDate = () => {
        setShowDatePicker(false);
        const serializableDate = selectedDate.toISOString();
        console.log('serializableDate',serializableDate);
        console.log('selectedDate',selectedDate);
        
        
        navigation.navigate('OdometerHistory', { selectedDatee: serializableDate });
    };

    const handleCancelDate = () => {
        setShowDatePicker(false);
    };

    return (
        <View style={styles.container}>
            <Header showBellIcon={false} title="Odometer" />
            <ScrollView>
                <Pressable 
                    style={[styles.historyBtn]} // Add disabled style if Start Odometer button is pressed
                    onPress={handleCheckHistory}
                    // disabled={startOdometerPressed}  startOdometerPressed && styles.disabledBtn // Disable button if Start Odometer button is pressed
                >
                    <Text style={styles.historyBtnText}>Check Odometer History</Text>
                </Pressable>
                {showDatePicker && (
                    <View style={styles.datePickerContainer}>
                        <Text style={styles.datePickerTitle}>Choose Date To Check Odometer History</Text>
                        <DatePicker  date={selectedDate} onDateChange={setSelectedDate} mode='date'  />
                        <View style={styles.datePickerBtnContainer}>
                            <Pressable style={styles.datePickerBtn} onPress={handleConfirmDate}> 
                                <Text style={styles.datePickerBtnText}>Confirm</Text>
                            </Pressable>
                            <Pressable style={styles.datePickerBtn} onPress={handleCancelDate}>
                                <Text style={styles.datePickerBtnText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
                <View style={styles.speedometerContainer}>
                    <Image source={require('../../Images/odometer.png')} />
                </View>
                <View style={styles.odometerReadings}>
                    <View style={styles.odometerReadingsInner}>
                        <Pressable 
                            style={[styles.startOdometer, startOdometerPressed && styles.disabledBtn]} 
                            onPress={handleStartOdometer}
                            disabled={startOdometerPressed} 
                        >
                            <Text style={styles.odometerReadingsText}>Start Odometer</Text>
                        </Pressable>
                        <TextInput
                            placeholder="Start Odometer"
                            keyboardType="decimal-pad"
                            value={startOdometerValue}
                            onChangeText={(text) => setStartOdometerValue(text)}
                            style={[styles.textInput, startOdometerPressed && styles.disabledTextInput]}
                            editable={!startOdometerPressed} 
                        />
                    </View>
                    <View style={[styles.odometerReadingsInner, { marginLeft: 10 }]}>
                        <Pressable style={styles.startOdometer} onPress={handleEndOdometer}>
                            <Text style={styles.odometerReadingsText}>End Odometer</Text>
                        </Pressable>
                        <TextInput
                            placeholder="End Odometer"
                            keyboardType="decimal-pad"
                            value={endOdometerValue}
                            onChangeText={(text) => setEndOdometerValue(text)}
                            style={styles.textInput}
                        />
                    </View>
                </View>
            </ScrollView>
            <Loader visible={loading} />
        </View>
    );
};

export default Odometer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    historyBtn: {
        marginTop:20,
        marginRight:10, 
        justifyContent:'center',
        borderRadius:8, 
        borderWidth:0.5,
        height:30, 
        width:width * 0.50, 
        alignItems:'center',
        alignSelf:'flex-end'
    },
    historyBtnText: {
        fontSize: width * 0.04,
        fontWeight: '500',
        color: 'black',
    },
    datePickerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    datePickerTitle: {
        fontSize: width * 0.035,
        fontWeight: '500',
        color: 'black',
    },
    datePickerBtnContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    datePickerBtn: {
        marginHorizontal: 10,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    datePickerBtnText: {
        fontSize: width * 0.04,
        fontWeight: '500',
        color: 'black',
    },
    speedometerContainer: {
        alignSelf: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        marginVertical: 20,
        paddingBottom: 40,
    },
    odometerReadings: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        padding: 10,
        elevation: 8,
        marginTop:width * 0.035,

    },
    odometerReadingsInner: {
        width: '48%',
        alignSelf: 'center',
    },
    startOdometer: {
        paddingVertical: 5,
        borderWidth: 0.8,
        borderRadius: 8,
        marginBottom: 10,
        width: '70%',
        alignSelf: 'center',
    },
    odometerReadingsText: {
        color: '#565252',
        fontSize: width * 0.038,
        fontWeight: '700',
        alignSelf: 'center',
        marginBottom: 5,
    },
    disabledBtn: {
        opacity: 0.5, // Reduce opacity to indicate disabled state
    },
    disabledTextInput: {
        backgroundColor: '#F6F6F6', // Change background color to indicate disabled state
    },
    textInput: {
        borderWidth: 1,
        color:'#000000',
        fontSize:15,
        fontWeight:'400'
    },
});


