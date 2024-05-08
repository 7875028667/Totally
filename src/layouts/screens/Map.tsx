import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { getMethod, postMethod } from '../../utils/helper';
import Loader from '../../component/Loader';
import Snackbar from 'react-native-snackbar';


const { width, height } = Dimensions.get('window');

const Map = ({ route, navigation }) => {
    const data = route.params;



    const [loading, setLoading] = useState(false)
    const [orderData, setOrderData] = useState([])
    const mapRef = useRef(null);
    const [deliveryCoordinates, setDeliveryCoordinates] = useState({ latitude: 0, longitude: 0 });
    console.log('deliveryCoordinates', deliveryCoordinates);


    useEffect(() => {
        getOrderData()
    }, [])

    const getOrderData = async () => {
        try {
            setLoading(true);
            const requestData = {
                order_id: data.data.order_id
            };
            const api = await postMethod(`api/order`, requestData);
            if (api.status === 200) {
                setOrderData(api.data.data);
                setDeliveryCoordinates({
                    latitude: parseFloat(api?.data?.data?.latitude),
                    longitude: parseFloat(api?.data?.data?.longitude)
                });
                setLoading(false);
            } else {
                console.log('Error in status code of order', api.data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log('Error in order API', error);
            setLoading(false);
        }
    };


    const handleDeclineBtn = async () => {
        try {
            setLoading(true)
            const requestBody = {
                order_id: data.data.order_id
            }
            const api: any = await postMethod(`api/decline-order`, requestBody)
            if (api.status == 200) {
                Snackbar.show({
                    text: 'You have Decline The Order',
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: '#AE1717',
                    backgroundColor: '#F2A6A6',
                });
                navigation.navigate('Notification')
                setLoading(false)
            } else {
                console.log('error while api status in package summary', api.data.message);
                setLoading(false)
            }

        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }


    const handleAceeptBtn = async () => {
        try {
            setLoading(true)
            const requestBody = {
                order_id: data.data.order_id
            }
            const api: any = await postMethod(`api/package-summary`, requestBody)
            if (api.status == 200) {
                navigation.navigate('PackageSummary', { orderData: api.data.data, orderId: data.data.order_id })
                setLoading(false)
            } else {
                console.log('error while api status in package summary', api.data.message);
                setLoading(false)
            }

        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mapView}>
                <MapView
                    ref={mapRef}
                    zoomControlEnabled={true}
                    showsMyLocationButton={true}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                // region={{
                //     latitude: (pickupCoordinates.latitude + deliveryCoordinates.latitude) / 2,
                //     longitude: (pickupCoordinates.longitude + deliveryCoordinates.longitude) / 2,
                //     latitudeDelta: Math.abs(pickupCoordinates.latitude - deliveryCoordinates.latitude) * 1.5,
                //     longitudeDelta: Math.abs(pickupCoordinates.longitude - deliveryCoordinates.longitude) * 1.5,
                // }}
                >
                    <Marker
                        coordinate={deliveryCoordinates}
                        title="Drop-off Location"
                    />
                </MapView>
            </View>
            <View style={styles.pickDrop}>

                <View>
                    <Text style={styles.deliveryHeading}>Delivery Address</Text>
                    <Text style={styles.deliveryText}>{orderData?.drop_off}</Text>
                </View>

                <View style={styles.btns}>
                    <TouchableOpacity style={styles.btnDecline} onPress={handleDeclineBtn}>
                        <Text style={styles.btnDeclineText}>Decline</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnAccept} onPress={handleAceeptBtn}>
                        <Text style={styles.btnAcceptText}>Accept</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Loader visible={loading} />
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEFEF',
        height: '100%',

    },
    mapView: {
        backgroundColor: 'lightgrey',
        height: "70%",
        // alignSelf: 'center',
    },
    map: {
        width: width * 1,
        height: height * 0.8,

    },
    pickDrop: {
        backgroundColor: 'white',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        borderRadius: 5
    },
    deliveryHeading: {
        fontSize: 18,
        fontWeight: '700',
        color: '#363535',
        textAlign: 'center',
        marginBottom: 20
    },
    deliveryText: {
        color: '#888787',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 20
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    btnDecline: {
        backgroundColor: '#F20000',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'center',
        borderRadius: 6,
    },
    btnAccept: {
        backgroundColor: '#FFF500',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'center',
        borderRadius: 6,
    },
    btnAcceptText: {
        color: '#4F4D4D',
        fontSize: width * 0.040,
        fontWeight: '600'
    },
    btnDeclineText: {
        color: 'white',
        fontSize: width * 0.040,
        fontWeight: '600'
    },


})