import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button, ScrollView, TouchableOpacity, Platform, PermissionsAndroid, TextInput, } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Header from '../../component/Header';



const { width, height } = Dimensions.get('window');
const AddMaintenance = ({navigation}:any) => {


    // // PHOTO UPLOAD USESTATE----------------------------------------------------------------


    const [imageUri, setImageUri] = useState<string | null>(null);
    const [imageUris, setImageUris] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);



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

    const openImageLibrary = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,

        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
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
            toggleModal();
        });
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
            toggleModal();
        });
    };

    // // PHOTO UPLOAD USESTATE ENDED----------------------------------------------------------------


    // MODAL USESTATE----------------------------------------------------------------


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    useEffect(() => {
        console.log('Image URI:', imageUri);
    }, [imageUri]);

    // MODAL USESTATE ENDED----------------------------------------------------------------

    return (
        <View style={{ height: '100%' }}>
            <Header title='Add Maintenance' showBellIcon={true}/>
            <ScrollView>
                <View style={styles.btnView}>
                    <View style={styles.vehicleDetailView}>
                        <View style={styles.vehicleDetailInnerViewOne}>
                            <Text style={styles.vehicleDetailsTextOne}>Vehicle Details : </Text>
                        </View>
                        <View>
                            <Image source={require('../../Images/truck.png')}
                                style={styles.vehicleImage} />
                            <Text style={{ color: 'grey', fontSize: width * 0.03 }}>Small Cargo Truck</Text>
                        </View>
                    </View>
                    <View style={styles.vehicleDetailView}>
                        <View style={styles.vehicleDetailInnerViewTwo}>
                            <Text style={styles.vehicleDetailsText}>Modal No : </Text>
                        </View>
                        <View style={styles.detailDiv}>
                            <Text style={{ color: 'black', fontSize: width * 0.04 }}>2020</Text>
                        </View>
                    </View>
                    <View style={styles.vehicleDetailView}>
                        <View style={styles.vehicleDetailInnerViewTwo}>
                            <Text style={styles.vehicleDetailsText}>ID : </Text>
                        </View>
                        <View style={styles.detailDiv}>
                            <Text style={{ color: 'black', fontSize: width * 0.04 }}>HM234701VR</Text>
                        </View>
                    </View>
                    <View style={[styles.vehicleDetailView, { paddingBottom: 10 }]}>
                        <View style={styles.vehicleDetailInnerViewTwo}>
                            <Text style={styles.vehicleDetailsText}>RC : </Text>
                        </View>
                        <View style={styles.detailDiv}>
                            <Text style={{ color: 'black', fontSize: width * 0.04 }}>REH10345#GH233</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.billDetail}>
                    <View style={styles.billDetailInner}>
                        <Text style={styles.billHead}>Bill Name : </Text>
                        <Text style={styles.billText}>Truck Roof Services</Text>
                    </View>
                    <View style={styles.billDetailInner}>
                        <Text style={styles.billHead}>Bill Date : </Text>
                        <Text style={styles.billText}>12/09/2022</Text>
                    </View>
                    <View style={styles.billDetailInner}>
                        <Text style={styles.billHead}>Bill Amount : </Text>
                        <Text style={styles.billText}>$ 300</Text>
                    </View>
                    <View style={styles.billDetailInner}>
                        <Text style={styles.billHead}>Bill Type : </Text>
                        <Text style={styles.billText}>Vehicle Maintenance</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.cameraView}
                        onPress={toggleModal}
                    >
                        <IonIcon name="camera-outline" color={'#4F4D4D'} size={width * 0.07}
                            style={styles.cameraIcon}
                        />
                    </TouchableOpacity>
                </View>

                {selectedImage ? (
                    <View style={{ alignSelf: 'center' }}>
                        <Image source={{ uri: selectedImage }} style={styles.profileImage} />
                    </View>
                ) : (
                    <View style={{ alignSelf: 'center', marginTop: 10 }}>
                        <Text>No Image is selected</Text>
                    </View>
                )}

                <View style={styles.buttonsView}>
                    <TouchableOpacity style={styles.signBtn}
                    // onPress={handleSubmit}
                    >
                        <Text style={styles.signBtnText}>Submit</Text>
                    </TouchableOpacity>
                </View>


                {/* MODAL VIEW--------------------------------------------------------- */}

                <Modal isVisible={isModalVisible}>
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
                            <TouchableOpacity style={styles.optionS} onPress={openCamera} >
                                <MaterialCommunityIcons name="camera" size={width * 0.1} color="#49AA67" />
                                <Text>Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* MODAL VIEW ENDED--------------------------------------------------------- */}



            </ScrollView>
        </View>
    )
}

export default AddMaintenance

const styles = StyleSheet.create({
    
    btnView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingLeft: '5%',
        marginTop: 20,
        paddingTop: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 10,
    },
    vehicleDetailView: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
    },
    vehicleDetailInnerViewOne: {
        width: '60%',
        paddingLeft: 8

    },
    vehicleDetailInnerView: {
        width: '55%',
    },
    vehicleDetailInnerViewTwo: {
        width: '40%',
    },
    vehicleDetailsTextOne: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: 'black',
    },
    vehicleDetailsText: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: 'black',
        alignSelf: 'flex-end',
        marginRight: 15,
    },
    vehicleImage: {
        width: width * 0.23,
        height: width * 0.12,
        resizeMode: 'cover',
    },
    detailDiv: {
        backgroundColor: '#D9D9D9',
        width: '47%',
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3
    },
    billDetail: {
        width: '76%',
        marginLeft: '12%',
        backgroundColor: 'white',
        marginTop: 25,
        marginBottom: 25,
    },
    billDetailInner: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 1,
    },
    billHead: {
        padding: 12,
        width: '38%',
        color: 'black',
        fontWeight: '600',
        fontSize: width * 0.03,
        paddingLeft: 20
    },
    billText: {
        padding: 12,
        color: 'black',
        fontSize: width * 0.03
    },
    cameraIcon: {

    },
    cameraView: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 4,
    },

    buttonsView: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8%',
        alignSelf: 'center',
        paddingBottom: 30,

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


    // MODAL CSS-------------------------

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

    // MODAL CSS ENDED-------------------------


    profileImage: {
        width: width * 0.4,
        height: width * 0.4,
        resizeMode: 'cover',
        marginTop: height * 0.03,
        // marginLeft: width * 0.4,
    },

})