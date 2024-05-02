import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import { getMethod } from '../../utils/helper';
import Loader from '../../component/Loader';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Delivery = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [deliveryData, setDeliveryData] = useState([]);
    const [filterStatus, setFilterStatus] = useState(1);


    useFocusEffect(
        React.useCallback(() => {
            getDeliveryData();
            return () => {
                // Optionally, you can return a cleanup function
            };
        }, [])
    );


    const getDeliveryData = async () => {
        try {
            setLoading(true);
            const api = await getMethod('api/delivery');
            if (api.status === 200) {
                setDeliveryData(api.data.data.delivery);
                // console.log('api.data.data.delivery',api.data.data.delivery);
                
                setLoading(false);
            } else {
                console.log('error in api status delivery', api.data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log('error while delivery api', error);
            setLoading(false);
        }
    };

    const filterData = () => {
        if (filterStatus === 1) {
            return deliveryData.filter(item => [1, 2, 3].includes(item.delivery_status));
        } else if (filterStatus === 2) {
            return deliveryData.filter(item => item.delivery_status === 4);
        } else if (filterStatus === 3) {
            return deliveryData.filter(item => item.delivery_status === 5);
        } else {
            return deliveryData;
        }
    };


    const renderItem = ({ item }) => (
        (item.delivery_status === 1 || item.delivery_status === 2 || item.delivery_status === 3) ? (
            <Pressable
                style={styles.deliveryBox}
                onPress={() => navigation.navigate('Map', { data: item })}
            >
                <View>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: 'black' }}>OrderNo : {item?.order_number}</Text>
                    <Text style={[styles.packageDeliveryText, {
                        color: item.delivery_status === 1 ? 'blue' :
                            item.delivery_status === 2 ? '#3ba480' :
                                item.delivery_status === 3 ? '#000000' :
                                    item.delivery_status === 4 ? '#3BBA40' :
                                        '#F20000'
                    }]}>
                        {item.delivery_message}
                    </Text>
                    <Text style={styles.packageDeliverySubText}>{item.description}</Text>
                </View>
                <View style={styles.packagesBox}>
                    <Text style={[styles.packageText, { textAlign: 'center' }]}>{item.package_quantity}</Text>
                    <Text style={styles.packageText}>Packages</Text>
                </View>
            </Pressable>
        ) : (
            <View style={styles.deliveryBox}>
                <View>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: 'black' }}>OrderNo : {item?.order_number}</Text>
                    <Text style={[styles.packageDeliveryText, {
                        color: item.delivery_status === 1 ? 'blue' :
                            item.delivery_status === 2 ? '#3ba480' :
                                item.delivery_status === 3 ? '#000000' :
                                    item.delivery_status === 4 ? '#3BBA40' :
                                        '#F20000'
                    }]}>
                        {item.delivery_message}
                    </Text>
                    <Text style={styles.packageDeliverySubText}>{item.description}</Text>
                </View>
                <View style={styles.packagesBox}>
                    <Text style={[styles.packageText, { textAlign: 'center' }]}>{item.package_quantity}</Text>
                    <Text style={styles.packageText}>Packages</Text>
                </View>
            </View>
        )
    );
    

    return (
        <View style={styles.container}>
            <Header title="Delivery" showBellIcon={false} />
            <View style={styles.toptabbar}>
                <Pressable onPress={() => setFilterStatus(1)} style={[styles.tabButton, { backgroundColor: filterStatus == '1' ? 'green' : null }]}>
                    <Text style={[styles.deliveryTextBtn,{color:filterStatus =='1' ? 'white' : null}]}>Pending</Text>
                </Pressable>
                <Pressable onPress={() => setFilterStatus(2)} style={[styles.tabButton, { backgroundColor: filterStatus == '2' ? 'green' : null }]}>
                    <Text style={[styles.deliveryTextBtn,{color:filterStatus =='2' ? 'white' : null}]}>Completed</Text>
                </Pressable>
                <Pressable onPress={() => setFilterStatus(3)} style={[styles.tabButton, { backgroundColor: filterStatus == '3' ? 'green' : null }]}>
                    <Text style={[styles.deliveryTextBtn,{color:filterStatus =='3' ? 'white' : null}]}>Cancel</Text>
                </Pressable>
            </View>
            <FlatList
                data={filterData()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            <Loader visible={loading} />
        </View>
    );
};

export default Delivery;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    deliveryTextBtn: {
        fontSize: 14,
        fontWeight: '600',
        color: 'black'
    },
    toptabbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    deliveryBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 8,
        elevation: 1,
        backgroundColor: '#f2f2f2f2',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    packageDeliveryText: {
        fontSize: width * 0.045,
        fontWeight: '500'
    },
    packageDeliverySubText: {
        fontWeight: '600',
        fontSize: width * 0.032
    },
    packagesBox: {
        borderLeftWidth: 1,
        paddingLeft: 10
    },
    packageText: {
        fontWeight: '600',
        fontSize: width * 0.035,
        color: '#000000'
    },
    tabButton: {
        marginTop: 20,
        borderWidth: 1,
        height: 30,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 8
    }
});
