import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import ProfileHeader from '../../component/ProfileHeader';
import { getMethod } from '../../utils/helper';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../component/Loader';
import Snackbar from 'react-native-snackbar';




const { width, height } = Dimensions.get('window');



const Profile = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState([])
    
    

    useFocusEffect(
        useCallback(() => {
            getData()
        }, [])

    )

    const getData = async () => {
        setLoading(true)
        try {
            const api: any = await getMethod(`api/user-profile`);
            // console.log('api,api',api.data);
            
            if (api.status === 200) {
                setLoading(false)
                setProfileData(api.data.data.user)
            } else {
                setLoading(false);
                Snackbar.show({
                    text: api.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: '#AE1717',
                    backgroundColor: '#F2A6A6',
                });
            }
        } catch (error) {
            setLoading(false)
            Snackbar.show({
                text: error,
                duration: Snackbar.LENGTH_SHORT,
                textColor: '#AE1717',
                backgroundColor: '#F2A6A6',
            });
        }

    }

    return (
        <View style={{ backgroundColor: 'white', height: height * 1 }}>
            <ProfileHeader
                showBackIcon={true}
                title={'Profile'}
                showBellIcon={true}
                image={profileData?.profile_img}

            />


            <Pressable style={styles.editBtn} onPress={() => navigation.navigate('ProfileDetails', { ufirst_name: profileData.first_name, uemail: profileData.email, ucountry: profileData.country, uphone: profileData.phone, uaddress: profileData.address, uprofileImg: profileData.profile_img })}>
                <Text style={{ textAlign: 'left', fontSize: 15, fontWeight: '500', color: 'black' }}>Edit</Text>
                <View style={{ backgroundColor: 'black' }}>
                    <IonIcon name="pencil-outline" color={'white'} size={22} />
                </View>
            </Pressable>
            <ScrollView  >
                {/* <View>
                    <View>
                        <Text style={{ color: '#4F4D4D', fontWeight: 'bold', alignSelf: 'center', marginTop: height * 0.04, fontSize: width * 0.06 }}>{profileData?.first_name}</Text>
                    </View>
                    <View style={styles.deliveryData}>
                        <View style={styles.deliveryInnerData}>
                            <Text style={[styles.text, { textAlign: 'center' }]}>100</Text>
                            <Text style={styles.text}>Delivery</Text>
                        </View>
                        <View style={styles.deliveryInnerData}>
                            <Text style={[styles.text, { textAlign: 'center' }]}>500</Text>
                            <Text style={styles.text}>Month</Text>
                        </View>
                    </View>
                </View> */}
                <View style={{ marginTop: 50, width: '84%', marginLeft: '8%'}}>
                    <Pressable style={styles.div} onPress={() => navigation.navigate('ProfileDetails',{ ufirst_name: profileData.first_name, uemail: profileData.email, ucountry: profileData.country, uphone: profileData.phone, uaddress: profileData.address, uprofileImg: profileData.profile_img })}>
                        <View style={styles.iconView}>
                            <IonIcon name="person" color={'#49AA67'} size={width * 0.05} />
                        </View>
                        <View>
                            <Text style={styles.viewHead}>Your Details</Text>
                            <Text style={styles.viewData}>Name . Email . Phone number</Text>
                        </View>
                    </Pressable>
                    {/* <View style={styles.div}>
                        <View style={styles.iconView}>
                            <IonIcon name="settings" color={'#49AA67'} size={width * 0.05} />

                        </View>
                        <View>
                            <Text style={styles.viewHead}>Settings</Text>
                            <Text style={styles.viewData}>Profile . Security . App</Text>
                        </View>
                    </View> */}
                    <Pressable style={styles.div} onPress={() =>navigation.navigate('VehicleMaintenance')}>
                        <View style={styles.iconView}>
                            <Image source={require('../../Images/van.png')}
                                style={styles.vanIcon}
                            />
                        </View>
                        <View>
                            <Text style={styles.viewHead}>Vehicle Maintainance</Text>
                            <Text style={styles.viewData}>Services</Text>
                        </View>
                    </Pressable>
                    <Pressable style={[styles.div, { marginBottom: 40 }]} onPress={() => navigation.navigate('Notification')}>
                        <View style={styles.iconView}>
                            <IonIcon name="notifications" color={'#49AA67'} size={width * 0.055} />
                        </View>
                        <View>
                            <Text style={styles.viewHead}>Notification</Text>
                            <Text style={styles.viewData}>Delivery Status</Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
            <Loader visible={loading} />
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    editBtn: {
        alignSelf: 'flex-end',
        marginTop: 20,
        marginRight: 15,
        borderRadius: 6,
        borderWidth: 1,
        width: 80,
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10

    },
    icon: {
        alignSelf: 'flex-end',
        marginTop: height * 0.02,
        marginRight: width * 0.03
    },
    deliveryData: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        // backgroundColor:'red',
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
        fontSize: width * 0.04,
        color: 'black',
        fontWeight: '500',
    },
    viewData: {
        fontSize: width * 0.035,
        color: 'grey',
        fontWeight: '400',
    },
    div: {
        borderRadius: 7,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 7,
        backgroundColor: 'white',
        paddingVertical: 8,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
        marginVertical: 10
    },
    iconView: {
        width: '20%',
        alignSelf: 'center',
        paddingLeft: 5
    },
    vanIcon: {
        width: width * 0.05,
        height: width * 0.05,
        resizeMode: 'cover',
    }
})