import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';
import { getMethod, postMethod } from '../../utils/helper';
import Loader from '../../component/Loader';

const { width, height } = Dimensions.get('window');

const PackageSummary = ({ navigation,route }: any) => {
    const packageData = route.params
    // console.log('packageData',packageData.orderId);
    
    // const [packageData, setPackageData] = useState([])
    const [loading, setLoading] = useState(false)


    const handleProcessPickup = async () => {

        navigation.navigate('PackageInformation',{orderId:packageData.orderId})
    }

    return (
        <View style={styles.container}>
            <Header showBellIcon={false} title='Package Summary' />
            <ScrollView>
                <View style={styles.informationView}>
                    <View>
                        <Text style={styles.infoHead}>1. Product Information</Text>
                    </View>
                    <View style={styles.fromTo}>

                        <FlatList
                            data={packageData?.orderData?.productDetails}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={{ marginBottom: 15 }}>
                                    {/* <View style={{ width: '50%', flexDirection:"row", alignItems:'center',}}>
                                        <Text style={{ color: '#9A9191', fontSize: width * 0.035 }}>Order Number : </Text>
                                        <Text style={{ color: '#4F4D4D', fontSize: width * 0.035 }}>{item.order_number}</Text>
                                    </View> */}

                                    <View style={{ width: '50%', flexDirection: "row", alignItems: 'center', }}>
                                        <Text style={{ color: '#9A9191', fontSize: width * 0.035 }}>Product Name : </Text>
                                        <Text style={{ color: '#4F4D4D', fontSize: width * 0.035 }}>{item.product_name}</Text>
                                    </View>

                                    <View style={{ width: '50%', flexDirection: "row", alignItems: 'center', }}>
                                        <Text style={{ color: '#9A9191', fontSize: width * 0.035 }}>Quantity : </Text>
                                        <Text style={{ color: '#4F4D4D', fontSize: width * 0.035 }}>{item.quantity}</Text>
                                    </View>
                                    {/* <View style={{ width: '50%',flexDirection:"row", alignItems:'center' }}>
                                        <Text style={{ color: '#9A9191',fontSize: width * 0.035 }}>Gross Amount : </Text>
                                        <Text style={{ color: '#4F4D4D', fontSize: width * 0.035 }}>{item.gross_amount}</Text>
                                    </View> */}
                                </View>
                            )}
                        />
                    </View>
                </View>
                <View style={styles.informationView}>
                    <View>
                        <Text style={styles.infoHead}>2. Delivery Information</Text>
                    </View>
                    <View style={styles.pickDelivery}>
                        <View style={{ marginBottom: 10, }}>
                            <Text style={{ color: '#9A9191', fontSize: width * 0.035 }}>Pickup Address:</Text>
                            <Text style={{ color: '#4F4D4D', fontSize: width * 0.035 }}>{packageData?.orderData?.deleveryDetails?.pickup_address}</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ color: '#9A9191', fontSize: width * 0.035 }}>Delivery Address:</Text>
                            <Text style={{ color: '#4F4D4D', fontSize: width * 0.035 }}>{packageData?.orderData?.deleveryDetails?.delivery_address}</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <View style={styles.times}>
                            <Text style={styles.timesText}>Customer Name:</Text>
                            <Text style={[styles.timesText, { color: '#4F4D4D', }]}>{packageData?.orderData?.deleveryDetails?.customer_name}</Text>
                        </View>
                        <View style={styles.times}>
                            <Text style={styles.timesText}>Phone Number:</Text>
                            <Text style={[styles.timesText, { color: '#4F4D4D', }]}>{packageData?.orderData?.deleveryDetails?.mobile_number}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.informationView}>
                    <View>
                        <Text style={styles.infoHead}>3. Package Information</Text>
                    </View>
                    {
                        packageData?.orderData?.productDetails?.map((item) => (
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={styles.productDetails}>Product Type : </Text>
                                <Text style={[styles.productDetails, { color: '#4F4D4D', }]}>{item.product_type}</Text>
                            </View>
                        ))
                    }

                </View>
                <View>
                    <TouchableOpacity style={styles.process} onPress={handleProcessPickup}>
                        <Text style={styles.processText}>Start Delivery</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Loader visible={loading} />
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
        fontSize: width * 0.035,
    },
    pickDelivery: {
        borderBottomColor: '#9A9191',
        borderBottomWidth: 0.45,
        paddingBottom: 15
    },
    productDetails: {
        fontSize: width * 0.035,
        color: '#777777',
        paddingVertical: 5,

        // paddingBottom: 30
    },
    process: {
        backgroundColor: '#EBE206',
        width: width * 0.9,
        marginLeft: '5%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 30,
    },
    processText: {
        color: 'black',
        alignSelf: 'center',
        fontSize: width * 0.06,
        fontWeight: '600',

    },


})