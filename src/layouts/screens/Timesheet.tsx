import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../../component/Header'
import { postMethod } from '../../utils/helper'
import moment from 'moment'

const Timesheet = ({ navigation, route }) => {
    // const data = route.params
    const date = route.params
    // console.log(date.data);

    const formattedDate = moment(date.data[0].attendance_date, 'DD-MM-YYYY').format('DD MMMM YYYY');


    const [timesheetData, setTimeSheetData] = useState([])

    const renderCheckInData = ({ item }) => {

        return (
            <View style={styles.checkInCheckOutData}>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.checkInCheckoutText}>Check-In</Text>
                    <Text style={styles.checkInTime}>{item.clock_in}</Text>
                </View>

                <View style={{ paddingHorizontal: 10 }}>
                    <Text>Check-out</Text>
                    <Text style={styles.checkInTime}>{item.clock_out}</Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            <Header title='Timesheet' showBellIcon={false} />
            <View style={{backgroundColor:'#ffffffff'}}>
                <View style={styles.container}>
                    <Text style={styles.dateformat}>{formattedDate}</Text>
                    <Text style={[styles.dateformat, { fontWeight: '600', marginTop: 10, fontSize: 20 }]}>Timesheet</Text>
                </View>

                <View style={styles.checkinCheckoutBox}>
                    <View style={styles.checkInRow}>

                        <View style={styles.checkInBox}>
                            <Text style={styles.checkInText}>Check In - Check Out</Text>
                        </View>

                        {/* <View style={[styles.checkInBox, { backgroundColor: '#fff', borderColor: '#00000040', borderWidth: 1 }]}>
                            <Text style={styles.checkInText}>Check Out</Text>
                        </View>

                        <View style={[styles.checkInBox, { backgroundColor: '#fff', borderColor: '#00000040', borderWidth: 1 }]}>
                            <Text style={[styles.checkInText, { color: 'green' }]}>Face Check In</Text>
                        </View> */}
                    </View>

                    <FlatList
                        data={date?.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderCheckInData}
                        showsVerticalScrollIndicator={false}
                    />

                </View>
            </View>
        </View>

    )
}

export default Timesheet

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginLeft: 20
    },
    dateformat: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500'
    },
    checkinCheckoutBox: {
        marginTop: 30,
        marginHorizontal: 15,
        backgroundColor: '#F6F6F6',
        height: '70%',
        borderRadius: 10,
        elevation:4
        
    },
    checkInRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    checkInBox: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#EBE206',
    },
    checkInText: {
        color: '#4F4D4D',
        fontSize: 15,
        fontWeight: '700'
    },
    checkInCheckOutData: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#00000040',
        marginHorizontal: 40,
        paddingBottom: 10
    },
    checkInTime:{
        color:'#525252',
        fontSize:18,
        fontWeight:'700',
        paddingVertical:5
    },
    checkInCheckoutText:{
        fontWeight:'700',
        fontSize:15,
        color:'#969393'
    }
})