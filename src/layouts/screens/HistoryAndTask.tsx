import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from 'react-native-vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';




const { width, height } = Dimensions.get('window');

const HistoryAndTask = ({ navigation }: any) => {

    const [search, setSearch] = useState('');


    const handleSearch = (text: React.SetStateAction<string>) => {
        setSearch(text);
    };
    
    const handleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };



    return (
        <View style={{ backgroundColor: 'pink', flex: 1 }}>
            <View style={{ backgroundColor: 'white', height: height * 1 }}>
                <View style={{ backgroundColor: '#49AA67', height: height * 0.17, }}>
                    <TouchableOpacity>
                        <IonIcon name="menu" color={'white'} size={width * 0.07}
                            style={styles.icon}
                            onPress={handleDrawer}
                        />
                    </TouchableOpacity>
                    {/* <View style={styles.searchView}>
                        <TextInput
                            style={styles.viewData}
                            onChangeText={handleSearch}
                            value={search}
                            placeholder='Search For Your Task'
                        />
                        <TouchableOpacity style={{ alignSelf: 'center', }}>
                            <IonIcon name="search" color={'#5E5D5D'} size={width * 0.055}
                                style={styles.micIcon}
                            />
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ width: '90%', marginLeft: '5%',marginTop:width * 0.18 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: height * 0.07 }}>
                            <View>
                                <TouchableOpacity style={styles.historyBtn} onPress={() => navigation.navigate('OrderHistory')}>
                                    <MaterialCommunityIcons name="history" color={"black"} size={60} />
                                </TouchableOpacity>
                                <Text style={{ alignSelf: 'center',color:'#5E5D5D', fontSize:18, fontWeight:'500' }}>History</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.taskBtn} onPress={() => navigation.navigate('Delivery')}>
                                    <Icon name="check-circle" size={48} color="black" />
                                </TouchableOpacity>
                                <Text style={{ alignSelf: 'center',color:'#5E5D5D', fontSize:18, fontWeight:'500' }}>Task</Text>
                            </View>
                        </View>
                        <View style={styles.vmView}>
                            <TouchableOpacity style={styles.maintenanceBtn} 
                            onPress={()=> navigation.navigate('VehicleMaintenance')}
                            >
                                <Text style={styles.maintenanceBtnText}>Vehicle Maintenance</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            {/* </ScrollView> */}
            {/* <TabNavigator/> */}
        </View>
    )
}

export default HistoryAndTask

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'flex-start',
        marginTop: height * 0.03,
        marginLeft: width * 0.03
    },
    cameraIcon: {
        width: width * 0.25,
        height: width * 0.25,
        marginTop: height * -0.06,
        marginLeft: width * 0.55,
    },
    deliveryData: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        width: '60%',
        justifyContent: 'space-between'
    },
    deliveryInnerData: {
        marginTop: '5%',
    },
    text: {
        color: 'black',
        fontWeight: '500',
        fontSize: width * 0.04
    },
    viewHead: {
        fontSize: width * 0.033,
        color: 'black',
    },
    viewData: {
        fontSize: width * 0.035,
        fontWeight: '400',
        paddingVertical: 3,
        width: '83%',
        paddingLeft: 10,
        marginLeft:5,
        color: '#5E5D5D',
    },
    div: {
        borderRadius: 7,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 10,

    },
    iconView: {
        width: '25%',
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
    },
    detailsView: {
        width: '70%',
        alignSelf: 'center',
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '2.5%',

    },
    buttonsView: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8%',
        alignSelf: 'center',
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

    },
    signBtnText: {
        color: 'black',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    searchView: {
        backgroundColor: 'lightgrey',
        width: "60%",
        alignSelf: 'center',
        marginTop: height * 0.06,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 8
    },
    micIcon: {
        alignSelf: 'center',
    },
    historyBtn: {
        backgroundColor: '#EBE206',
        borderRadius: 8,
        padding: 6
    },
    taskBtn: {
        backgroundColor: '#EBE206',
        borderRadius: 8,
        padding: 12
    },
    vmView: {
        marginTop: 40,
    },
    maintenanceBtn: {
        backgroundColor: '#F4F4F4',
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignSelf: 'center',
        borderRadius: 8,
    },
    maintenanceBtnText: {
        color: '#4F4D4D',
        fontWeight: '700',
        fontSize:20
    },
})