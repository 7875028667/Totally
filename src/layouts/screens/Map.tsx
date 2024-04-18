import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'
import IonIcon from 'react-native-vector-icons/Ionicons';


const { width, height } = Dimensions.get('window');

const Map = () => {

    const mapRef = useRef();
    return (
        <View style={styles.container}>
            <View style={styles.mapView}>
                <MapView ref={mapRef} zoomControlEnabled={true} showsMyLocationButton={true} provider={PROVIDER_GOOGLE} style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    {/* <Marker 
                    // key={index} 
                    // coordinate={coordinate} 
                    />

                    <Polyline
                        // key={index}
                        // coordinates={polylineCoordinates}
                        strokeColor="red"
                        strokeWidth={2}
                    /> */}
                </MapView>
            </View>
            <View style={styles.pickDrop}>
                <View style={styles.details}>
                    <View style={styles.pick}>
                        <Text style={styles.pickText}>PICK UP</Text>
                        <Text style={styles.pickName}>Woltar</Text>
                        <Text style={styles.address}>Ravindra chowk,sector
                            no.5Chandigarh</Text>
                    </View>

                    <View style={{ alignSelf: 'center',paddingHorizontal:8, }}>
                        <IonIcon name="arrow-forward" color={'grey'} size={width * 0.08} style={styles.icon} />
                    </View>
                    <View style={styles.drop}>
                        <Text style={styles.pickText}>DROP OFF</Text>
                        <Text style={styles.pickName}>Mary smith</Text>
                        <Text style={styles.address}>Gopan nagar,sector
                            no. 45 Chandigarh</Text>
                    </View>
                </View>
                <View style={styles.priceDetails}>
                    <View>
                        <Text style={styles.priceHeadText}>Delivery Fee</Text>
                        <Text style={styles.priceText}>$12,200</Text>
                    </View>
                    <View>
                        <Text style={styles.priceHeadText}>Total Distance</Text>
                        <Text style={styles.priceText}>6.2km</Text>
                    </View>
                    <View>
                        <Text style={styles.priceHeadText}>Payment code</Text>
                        <Text style={styles.priceText}>000</Text>
                    </View>
                </View>
                <View style={styles.btns}>
                    <TouchableOpacity style={styles.btnDecline}><Text style={styles.btnDeclineText}>Decline</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btnAccept}><Text style={styles.btnAcceptText}>Accept</Text></TouchableOpacity>
                </View>
            </View>
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
        height: "60%",
        // alignSelf: 'center',
    },
    map: {
        width: width * 1,
        height: height * 0.7,

    },
    pickDrop: {
        height: height * 0.3,
        width: width * 0.8,
        backgroundColor: 'white',
        alignSelf: 'center',
        padding: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomColor: '#888787',
        borderBottomWidth: 0.5,
        paddingBottom: 7,
    },
    icon: {
        // alignSelf: 'flex-start',
        alignSelf: 'center',

    },
    pick: {
        width: '43%',
    },
    drop: {
        width: '43%',
    },
    pickText: {
        fontSize: width * 0.03,
        color: 'black',
        fontWeight: '600'
        // backgroundColor:'red'
    },

    pickName: {
        fontSize: width * 0.04,
        fontWeight: '900',
        color: '#777777',
    },

    address: {
        color: '#888888',
        fontSize: width * 0.03
    },
    priceDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 7,
        borderBottomColor: '#888787',
        borderBottomWidth: 0.5,
        paddingBottom: 7,
    },
    priceHeadText: {
        color: '#9A9191',
        fontSize: width * 0.035,
        alignSelf: 'center',

    },
    priceText: {
        color: '#9A9191',
        fontSize: width * 0.03,
        alignSelf: 'center',

    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 5
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
        fontSize: width * 0.03,

    },
    btnDeclineText: {
        color: 'white',
        fontSize: width * 0.03,

    },


})