import { StyleSheet, Text, View, Image, Dimensions, Button, ScrollView, TouchableOpacity, } from 'react-native';
import React, { useState, useEffect } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';

const { width, height } = Dimensions.get('window');

const Attendance = ({ navigation }: any) => {

    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');


    useEffect(() => {
        // Function to update the current time
        const updateCurrentTime = () => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const timeString = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
            setCurrentTime(timeString);
        };
        // Function to update the current date
        const updateCurrentDate = () => {
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() + 1; // Adding 1 to get the correct month index
            const year = date.getFullYear();
            const dateString = `${day}-${month}-${year}`;
            setCurrentDate(dateString);
        };
        updateCurrentTime();
        updateCurrentDate();

        const timer = setInterval(() => {
            updateCurrentTime();
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    // ------------------------TOGGLE DATA------------
    // const [attendanceData, setAttendanceData] = useState([]);

    const [isPunchedIn, setIsPunchedIn] = useState(true);

    const handlePunchIn = () => {
        setIsPunchedIn(true);
    };
    const handlePunchOut = () => {
        setIsPunchedIn(false);
    };
    // ------------------------TOGGLE DATA ENDED-------------



    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>
            <Header title='Attendance' showBellIcon={true} />
            <ScrollView>
                <View style={{ marginTop: 25, marginBottom: 15 }}>
                    <TouchableOpacity onPress={()=> navigation.navigate('MyAttendance')}>
                        <Text style={{ color: '#49AA67', alignSelf: 'center' }}>View Report</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.liveAddress}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                        <Text style={[styles.addressText, { marginBottom: 10 }]}>
                            <IonIcon name="location" color={'skyblue'} size={width * 0.06} style={styles.icon} />  Live Location</Text>
                        <Text style={styles.addressText}>Gopan nagar,sector no. 45  Chandigarh - 321456M </Text>
                        <Text style={styles.addressText}>India</Text>
                    </View>
                </View>
                <View style={[styles.liveAddress, { marginBottom: 50 }]}>
                    <Text style={styles.time}>{currentTime}</Text>
                    <Text style={styles.date}>{currentDate}</Text>

                    {isPunchedIn ? (
                        <View>
                            <View style={{ alignSelf: 'center', margin: 15, }}>
                                <TouchableOpacity style={styles.punchInBtn} onPress={handlePunchOut}>
                                    <Text style={{ alignSelf: 'center', marginTop: width * 0.13, color: '#4F4D4D', fontWeight: '600', fontSize: width * 0.05 }}>Punch In</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.startWork}>Start Your Work</Text>
                        </View>
                    ) : (
                        <View>
                            <View style={{ alignSelf: 'center', margin: 15, }}>
                                <TouchableOpacity style={styles.punchInBtn} onPress={handlePunchIn}>
                                    <Text style={{ alignSelf: 'center', marginTop: width * 0.13, color: '#4F4D4D', fontWeight: '600', fontSize: width * 0.05 }}>Punch Out</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.startWork}>End Your Work</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

export default Attendance

const styles = StyleSheet.create({
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
    addressText: {
        fontSize: width * 0.04,
        color: '#484A4B'
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
    startWork: { alignSelf: 'center', color: '#4F4D4D', fontWeight: '600', fontSize: width * 0.035 }
})