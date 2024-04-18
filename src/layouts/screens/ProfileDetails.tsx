import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button, ScrollView, TouchableOpacity, Platform, PermissionsAndroid, TextInput, Alert, } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ProfileHeader from '../../component/ProfileHeader';
import { FormPostMethod, getStorageData, storeData } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import Loader from '../../component/Loader';



const { width, height } = Dimensions.get('window');

const ProfileDetails = ({ navigation, route }: any) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [imageUris, setImageUris] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { ufirst_name, uemail, ucountry, uphone, uaddress, uprofileImg } = route.params;
    

    

    const fetchUserDetails = async () => {
        setName(ufirst_name)
        setEmail(uemail)
        setCountry(ucountry)
        setMobileNo(uphone)
        setAddress(uaddress)
        setImageUri(uprofileImg)
        
    };

    useFocusEffect(
        useCallback(() =>{
            fetchUserDetails()
        },[])
    )

    const handleSubmit = async () => {
        setLoading(true)

        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('address',address);+
        formData.append('country',country);
        formData.append('phone',mobileNo)
        formData.append('image',{
            uri:imageUri,
            type:'image/jpg',
            name:'profile.jpg'
        });
        
        try {

            const api: any = await FormPostMethod(`api/update-profile`, formData);
           
            
            if (api.status === 200) {
                setLoading(false);
                const existingUserData = await getStorageData();                
               
               
                const updateUserDetails = {
                    ...existingUserData.data,
                    first_name: name,
                    email: email,
                    phone: mobileNo,
                    country: country,
                    address: address,
                    profile_img:imageUri || existingUserData.data.user.profile_img

                }

                const updaatedUserData = {
                    ...existingUserData,
                    user: updateUserDetails
                }
                await storeData(updaatedUserData);
                
                
                setLoading(false)
                navigation.dispatch(CommonActions.goBack())

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
            console.log(' catch error', error);
            Snackbar.show({
                text: "Some Error Occured" + error,
                duration: Snackbar.LENGTH_SHORT,
                textColor: '#AE1717',
                backgroundColor: '#F2A6A6',
            });
        }
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                    title: 'Camera Permission',
                    message: 'App needs camera permission to capture photos.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                });
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Camera permission granted');
                } else {
                    console.log('Camera permission denied');
                }
            } catch (error) {
                console.log('Error requesting camera permission:', error);
            }
        }
    };


    const openCamera = async () => {
        await requestCameraPermission();

        const options = {
            mediaType: 'photo',
            includeBase64: true,
            saveToPhotos: true,

        };

        launchCamera(options, (response: ImagePickerResponse) => {

            if (response.didCancel) {
                console.log('User cancelled');
                setImageUri(null);
            } else if (response.error) {
                console.log('ImagePicker Error:', response.error);
                setImageUri(null);
            } else {
                const source = response.assets[0].uri;
                const newUris = [...imageUris, source];
                setImageUri(source);
                setImageUris(newUris);

                if (selectedImage === null) {
                    setSelectedImage(source);
                }
            }
        });
    };

    return (
        <View style={{ backgroundColor: 'white', height: height * 1 }}>
            <ProfileHeader showBackIcon={true} showBellIcon={false} title='' showCamera={true} onPress={openCamera} image={imageUri}/>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: '30%', }}>
                <View style={styles.div}>
                    <View style={styles.iconView}>
                        <Text style={styles.viewHead}>Name</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <TextInput
                            style={[styles.viewData, { paddingVertical: 3 }]}
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />
                    </View>
                </View>
                <View style={styles.div}>
                    <View style={styles.iconView}>
                        <Text style={styles.viewHead}>Email</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <TextInput
                            style={[styles.viewData, { paddingVertical: 3 }]}
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                    </View>
                </View>
                <View style={styles.div}>
                    <View style={styles.iconView}>
                        <Text style={styles.viewHead}>Mobile no.</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <TextInput
                            style={[styles.viewData, { paddingVertical: 3 }]}
                            onChangeText={(text) => setMobileNo(text)}
                            value={mobileNo}
                        />
                    </View>
                </View>
                <View style={styles.div}>
                    <View style={styles.iconView}>
                        <Text style={styles.viewHead}>Country</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <TextInput
                            style={[styles.viewData, { paddingVertical: 3 }]}
                            onChangeText={(text) => setCountry(text)}
                            value={country}
                        />
                    </View>
                </View>
                <View style={styles.div}>
                    <View style={styles.iconView}>
                        <Text style={styles.viewHead}>Address</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <TextInput
                            style={[styles.viewData, { paddingVertical: 3 }]}
                            onChangeText={(text) => setAddress(text)}
                            value={address}
                        />
                    </View>
                </View>
                <View style={styles.buttonsView}>
                    <TouchableOpacity style={styles.signBtn} onPress={handleSubmit}>
                        <Text style={styles.signBtnText}>Save</Text>
                    </TouchableOpacity>
                </View>

                {/* <Modal isVisible={isModalVisible}>
                    <View style={styles.popUp}>
                        <View style={styles.crossBtn}>
                            <View><Text> </Text></View>
                            <TouchableOpacity onPress={toggleModal} >
                                <Text style={{ color: 'grey', fontSize: width * 0.06, paddingBottom: 3 }}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.optionBtns}>
                            <TouchableOpacity style={styles.optionS} onPress={openImageLibrary}>
                                <MaterialIcons name="insert-photo" size={width * 0.1} color="#49AA67" />
                                <Text>Library</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionS} onPress={openCamera}>
                                <MaterialCommunityIcons name="camera" size={width * 0.1} color="#49AA67" />
                                <Text>Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> */}
            </ScrollView>
            <Loader visible={loading} />
        </View>
    )
}

export default ProfileDetails

const styles = StyleSheet.create({

    div: {
        borderRadius: 7,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
        marginVertical: 15,
        paddingVertical: 8,
        marginHorizontal: 20,

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
        marginBottom: '10%'
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
    popUp: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#49AA67',
        backgroundColor: 'white',
        width: width * 0.8,
        padding: 10,
        marginLeft: '5%'
    },
    crossBtn: {
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        marginLeft: '5%',
        marginBottom: 10,
    },
    optionBtns: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom: 10,

    },
    optionS: {
        width: '30%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#49AA67',
        paddingTop: 7,
        paddingBottom: 7
    },
})