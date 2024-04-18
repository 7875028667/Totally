import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Header from '../../component/Header';




const { width, height } = Dimensions.get('window');

const PayslipSummary = ({ navigation }: any) => {
    return (
        <View style={{ backgroundColor: 'white', height: '100%', marginBottom: 20 }}>
            <Header showBellIcon={true} title='Payslip Summary' />
            <ScrollView>
                <View
                // style={{ marginBottom: 20 }}
                >
                    <View style={styles.odometerReadings}>
                        <Text style={{ color: '#525252', fontWeight: '600', fontSize: width * 0.041, }}>You have earned gross pay of <Text style={{ color: '#49AA67' }}>September</Text> month</Text>

                        <View style={styles.progressBarDetail}>
                            <View>
                                <AnimatedCircularProgress
                                    size={150}
                                    width={10}
                                    fill={35}
                                    tintColor="#F20000"
                                    onAnimationComplete={() => console.log('onAnimationComplete')}
                                    backgroundColor="white" />
                            </View>
                            <View style={styles.calculation}>
                                <View style={styles.details}>
                                    <View style={{ marginRight: 10, }}>
                                        <Text style={[styles.dot, { color: 'white' }]}>●</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.calculationText}>900$</Text>
                                        <Text style={styles.calculationText}>Earnings</Text>
                                    </View>
                                </View>
                                <View style={styles.details}>
                                    <View style={{ marginRight: 10 }}>
                                        <Text style={[styles.dot, { color: '#F20000' }]}>●</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.calculationText}>2500$</Text>
                                        <Text style={styles.calculationText}>Deduction</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 15, marginTop: 30, marginBottom: 0, }}>
                        <Text style={{ color: '#000000', fontWeight: '600', }}>Earning Details</Text>
                    </View>
                    <View style={styles.salaryReadings}>
                        <View style={styles.salaryInnerView}>
                            <View style={styles.payHead}><Text style={styles.payHeadText}>Basic pay</Text></View>
                            <View><Text style={styles.payValueText}>5500$</Text></View>
                        </View>
                        <View style={styles.salaryInnerView}>
                            <View style={styles.payHead}><Text style={styles.payHeadText}>HRA</Text></View>
                            <View><Text style={styles.payValueText}>1500$</Text></View>
                        </View>
                        <View style={styles.salaryInnerView}>
                            <View style={styles.payHead}><Text style={styles.payHeadText}>Other Allowance</Text></View>
                            <View><Text style={styles.payValueText}>500$</Text></View>
                        </View>
                        <View style={styles.salaryInnerView}>
                            <View style={styles.payHead}><Text style={styles.payHeadText}>SPL Allowance</Text></View>
                            <View><Text style={styles.payValueText}>1500$</Text></View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default PayslipSummary

const styles = StyleSheet.create({
    odometerReadings: {
        display: 'flex',
        // flexDirection: 'row',
        backgroundColor: '#F1F1F1',
        padding: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 8,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },

    progressBarDetail: {
        marginTop: 30,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',

    },

    calculation: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        width: '55%',

    },
    calculationText: {
        fontSize: width * 0.035,
        color: 'black',
        fontWeight: '700'
    },
    details: {
        display: 'flex',
        flexDirection: 'row',

    },
    dot: {
        fontSize: width * 0.085,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '500',
        alignSelf: 'center',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,

    },
    salaryReadings: {
        display: 'flex',
        backgroundColor: '#F1F1F1',
        padding: 10,
        justifyContent: 'center',
    },
    salaryInnerView: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center'
    },
    payHead: {
        width: '60%',
    },
    payHeadText: {
        color: 'black',
        fontWeight: '400',
    },
    payValueText: {
        color: 'black',
        fontWeight: '800',
    },

})