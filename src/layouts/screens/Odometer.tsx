import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Speedometer, { Background, Arc, Needle, Progress, Marks, Indicator } from 'react-native-cool-speedometer';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Header from '../../component/Header';
import { getMethod } from '../../utils/helper';


const { width, height } = Dimensions.get('window');

const Odometer = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false)
    const [startodometerValue, setstartodometerValue] = useState('')
    const [endodometerValue, setEndOdometerValue] = useState('')

    const getData = async () => {

        try {
            setLoading(false)
            const api: any = await getMethod(`api/odometer`)
            console.log('api', api);
            if (api.status === 200) {
                setLoading(false)
            } else {
                console.log('api message', api.data.message);
                setLoading(false)
            }
        } catch (error) {
            console.log('error while odometer api', error);
            setLoading(false)

        }

    }


    const handleStartOdometer = () =>{
        console.log('startodometerValue',startodometerValue);
        setstartodometerValue('')
        console.log('startodometerValue',startodometerValue);
    }

    const handleEndOdometer = () =>{
        console.log('endodometerValue',endodometerValue);
        setEndOdometerValue('')
        console.log('endodometerValue',endodometerValue);
    }


    return (
        <View style={{ backgroundColor: 'white', height: '100%',  }}>
            <Header showBellIcon={false} title='Odometer' />
            <ScrollView>
                <View style={styles.speedometerContainer}>
                    <Speedometer
                        value={128}
                        fontFamily='squada-one'
                        >
                        <Background />
                        <Arc />
                        <Needle />
                        <Progress />
                        <Marks />
                        <Indicator fixValue={false} />
                    </Speedometer>
                </View>
                <View style={styles.dates}>
                    <Text style={styles.datesText}>01, Sep 22 - 02, Oct 22</Text>
                </View>
                <View style={styles.odometerReadings}>
                    <View style={styles.odometerReadingsInner}>
                        <Pressable style={styles.startOdometer} onPress={handleStartOdometer}>
                            <Text style={styles.odometerReadingsText}>Start Odometer</Text>
                        </Pressable>
                        <TextInput
                            placeholder='Start Odometer'
                            keyboardType='decimal-pad'
                            value={startodometerValue}
                            onChangeText={(text) => setstartodometerValue(text)}
                            style={{ borderWidth: 1 }}
                        />
                    </View>
                    <View style={[styles.odometerReadingsInner, { marginLeft: 10 }]}>
                        <Pressable style={styles.startOdometer} onPress={handleEndOdometer}>
                            <Text style={styles.odometerReadingsText}>End Odometer</Text>
                        </Pressable>
                        <TextInput
                            placeholder='End Odometer'
                            keyboardType='decimal-pad'
                            value={endodometerValue}
                            onChangeText={(text) => setEndOdometerValue(text)}
                            style={{ borderWidth: 1 }}
                        />
                    </View>

                </View>
                {/* <View style={styles.graphView}>
                    <Text style={styles.onTimeText}>Total - On time</Text>
                    <View style={styles.progressBarDetail}>
                        <View>
                            <AnimatedCircularProgress
                                size={100}
                                width={10}
                                fill={75}
                                tintColor="#49AA67"
                                onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="#EBE206" />
                        </View>
                        <View style={styles.calculation}>
                            <View style={styles.details}>
                                <View style={{ marginRight: 20 }}>
                                    <Text style={[styles.dot, { color: '#49AA67' }]}>●</Text>
                                </View>
                                <View>
                                    <Text style={styles.calculationText}>Total driving time </Text>
                                    <Text style={styles.calculationText}>16th 25min</Text>
                                </View>
                            </View>
                            <View style={styles.details}>
                                <View style={{ marginRight: 20 }}>
                                    <Text style={[styles.dot, { color: '#EBE206' }]}>●</Text>
                                </View>
                                <View>
                                    <Text style={styles.calculationText}>Total idle time </Text>
                                    <Text style={styles.calculationText}>2h 49min</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View> */}
                {/* <View style={styles.vehicleStatusView}>
                    <Text style={{ color: '#969393', fontSize: width * 0.045, fontWeight: '600' }}>Vehicle Status</Text>
                </View> */}
            </ScrollView>
        </View>
    )
}

export default Odometer

const styles = StyleSheet.create({
    speedometerContainer: {
        alignSelf: 'center',
        // width: width * 0.8,
        // height: width * 0.8,
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        marginVertical: 20,
        paddingBottom:40

    },
    dates: {
        alignSelf: 'center',
        paddingVertical: 15,
    },
    datesText: {
        color: 'black'
    },
    odometerReadings: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        padding: 10,
        elevation: 8,
    },
    odometerReadingsInner: {
        width: '48%',
        alignSelf: 'center',
    },
    startOdometer:{
        paddingVertical:5, 
        borderWidth: 0.8,
        borderRadius:8, 
        marginBottom: 10, 
        width: '70%', 
        alignSelf: 'center'
    },
    odometerReadingsText: {
        color: '#565252',
        fontSize: width * 0.038,
        fontWeight: '700',
        alignSelf: 'center',
        marginBottom: 5


    },
    odometerReadingsNo: {
        color: 'black',
        fontSize: width * 0.06,
        alignSelf: 'center',
        fontWeight: '800',

    },
    odometerReadingsTimes: {
        color: '#565252',
        fontSize: width * 0.035,
        alignSelf: 'center',
    },
    graphView: {
        padding: 20,
    },
    onTimeText: {
        color: '#565252',
        fontSize: width * 0.05,
        fontWeight: '700',
        paddingBottom: 10,
    },
    progressBarDetail: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    calculation: {
        width: '50%',
    },
    calculationText: {
        fontSize: width * 0.035,
        color: '#888888'
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent:'space-between',

    },
    dot: {
        fontSize: width * 0.085,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '500',
        alignSelf: 'center'

    },
    vehicleStatusView: {
        backgroundColor: '#ECECEC',
        padding: 15,
        marginBottom: 30,
    }
})