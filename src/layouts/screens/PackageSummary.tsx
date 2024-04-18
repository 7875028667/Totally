import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';

const { width, height } = Dimensions.get('window');

const PackageSummary = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Header showBellIcon={true} title='Package Summary' />
            <ScrollView>
                <View style={styles.informationView}>
                    <View>
                        <Text style={styles.infoHead}>1. Product Information</Text>
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
                        <Text style={styles.infoHead}>2. Delivery Information</Text>
                    </View>
                    <View style={styles.pickDelivery}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ color: '#9A9191' }}>Pickup Address:</Text>
                            <Text style={{ color: '#4F4D4D', fontSize: width * 0.05 }}>Ravindar chowk,Sector
                                no. 5,Chandigarh</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ color: '#9A9191' }}>Delivery Address:</Text>
                            <Text style={{ color: '#4F4D4D', fontSize: width * 0.05 }}>Ravindar chowk,Sector
                                no. 5,Chandigarh</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <View style={styles.times}>
                            <Text style={styles.timesText}>Customer Name:</Text>
                            <Text style={styles.timesText}>Gerry prank</Text>
                        </View>
                        <View style={styles.times}>
                            <Text style={styles.timesText}>Phone Number:</Text>
                            <Text style={styles.timesText}>09764579043</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.informationView}>
                    <View>
                        <Text style={styles.infoHead}>3. Package Information</Text>
                    </View>
                    <View>
                        <Text style={styles.productDetails}>Groceries ,Toiletries & Vegetables</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.process}>
                        <Text style={styles.processText}>Process Pickup</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default PackageSummary

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#49AA67',
        height: '100%'
    },
    
    informationView: {
        backgroundColor: 'white',
        padding: 15,
        width: width * 0.9,
        marginLeft: '5%',
        marginBottom: 30,
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
        borderBottomColor: '#9A9191',
        borderBottomWidth: 0.45,
        paddingBottom: 15
    },
    productDetails: {
        fontSize: width * 0.05,
        color: '#777777',
        paddingBottom: 30
    },
    process: {
        backgroundColor: '#EBE206',
        width:width*0.9,
        marginLeft:'5%',
        padding:10,
        borderRadius:10,
        marginBottom:30,
    },
    processText: {
        color: 'black',
        alignSelf:'center',
        fontSize: width*0.06,
        fontWeight:'600',

    },


})