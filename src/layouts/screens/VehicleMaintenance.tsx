import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';
import { getMethod } from '../../utils/helper';
import Loader from '../../component/Loader';



const { width, height } = Dimensions.get('window');


const VehicleMaintenance = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [vehicleMaintainceData, setvehicleMaintainceData] = useState([])

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {

        try {
            setLoading(true)
            const api: any = await getMethod(`api/vehicle-maintenance`)
            setvehicleMaintainceData(api.data.data.servicing)
            // console.log('api.data.data.servicing', api.data.data.servicing);

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('error', error);

        }
    }

    const renderVehicleData = ({ item, index }) => {
        return (
            <View style={styles.maintenance}>
                <View>
                    <Text style={styles.vehicleModal}>{item.vehicle_name}</Text>
                    <Text style={styles.vehicleService}>{item.service_type}</Text>
                </View>
                <View>
                    <Text style={styles.serviceDate}>{item.date}</Text>
                    <Text style={styles.serviceCharge}>{item.bill_amount}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{ height: height * 1 }}>
            <Header title='Vehicle Maintenance' />
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.signBtn} onPress={() => navigation.navigate('AddMaintenance')}>
                    <Text style={styles.signBtnText}>+  Add Maintenance</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#F4F4F4', flex:1,marginBottom:50}}>
                <View style={styles.lastMaintenanceHead}>
                    <Text style={styles.lastMaintenanceText}>Last Maintenance</Text>
                </View>
                <FlatList
                    data={vehicleMaintainceData}
                    keyExtractor={(item, index) => index}
                    renderItem={renderVehicleData}
                    // style={{marginBottom:50,}}
                />

            </View>
            <Loader visible={loading} />
        </View>
    )
}

export default VehicleMaintenance

const styles = StyleSheet.create({
    btnView: {
        backgroundColor: 'white',
        height: height * 0.2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signBtn: {
        backgroundColor: '#EBE206',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 6,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
        alignSelf: 'center',

    },
    signBtnText: {
        color: '#4F4D4D',
        fontSize: width * 0.045,
        fontWeight: '700',
    },
    
    lastMaintenanceHead: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#BAB7B7",
    },
    lastMaintenanceText: {
        color: 'black',

    },
    maintenance: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#BAB7B7",

    },

    vehicleModal: {
        fontSize: width * 0.03,
        color: '#9A9191',

    },
    serviceDate: {
        color: 'black',
        fontSize: width * 0.035,
        fontWeight: '600',

    },
    vehicleService: {
        color: 'black',
        fontSize: width * 0.035,

    },
    serviceCharge: {
        color: '#11AF18',
        fontSize: width * 0.03,
        alignSelf: 'center',
        fontWeight: '700',
    }
})