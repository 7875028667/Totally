import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Platform, PermissionsAndroid, TextInput, Alert, } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Header from '../../component/Header';
import { getMethod, postMethod } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import Loader from '../../component/Loader';



const { width, height } = Dimensions.get('window');
const AddMaintenance = ({ navigation }: any) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [vehicleDetail, setVehicleDetail] = useState([])
    const [billName, setBillName] = useState('');
    const [billDate, setBillDate] = useState('');
    const [billAmount, setBillAmount] = useState('');
    const [billType, setBillType] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [imageUris, setImageUris] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    
    useEffect(() =>{
        getData()
    },[])

    const getData = async() =>{
        
        try {
            setLoading(true)
            const api:any = await getMethod(`api/vehicle-detail`);
            console.log('api',api);
            
            if(api.status === 200){
                setLoading(false)
                setVehicleDetail(api?.data?.data?.vehicle)
            }else{
                Snackbar.show({
                    text: api.data.message,
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: '#AE1717',
                    backgroundColor: '#F2A6A6',
                });
                setLoading(false);
            }
        } catch (error) {
            console.log('error in vehoicle detail api',error);
            Snackbar.show({
                text: error,
                duration: Snackbar.LENGTH_SHORT,
                textColor: 'black',
                backgroundColor: 'red',
            });
            setLoading(false)
        }
    }


    const submitData = async () => {

        try {
            setLoading(true)
            const data = {
                bill_name: billName,
                bill_date: billDate,
                bill_amount: billAmount,
                bill_type: billType,
                image: imageUri
            }

            const api: any = await postMethod(`api/add-maintenance`, data);
            if (api.status === 200) {
                console.log('POST api',api);
                Snackbar.show({
                    text: 'Submit Successfully',
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: '#ffffff',
                    backgroundColor: 'green',
                });
                setBillName('');
                setBillDate('');
                setBillAmount('');
                setBillType('');
                setImageUri(null);
                setSelectedImage(null);
                setLoading(false)
            } else {
                
                console.log('else block in api');
                Snackbar.show({
                    text: 'Something Went Wrong',
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'green',
                    backgroundColor: '#F2A6A6',
                });
                setLoading(false);
            }
        } catch (error) {
            console.log('errorrrr inadd maintaince', error);

            Snackbar.show({
                text: error,
                duration: Snackbar.LENGTH_SHORT,
                textColor: '#AE1717',
                backgroundColor: '#F2A6A6',
            });
            setLoading(false)
        }

    }

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

        Alert.alert(
            'Choose Image',
            'Select the image from Camera / Gallery',
            [
                {
                    text: 'Camera',
                    onPress: () => launchCamera(options, handleImagePickerResponse),
                },
                {
                    text: 'Gallery',
                    onPress: () => launchImageLibrary(options, handleImagePickerResponse),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    const handleImagePickerResponse = (response) => {
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
    };


    return (
        <View style={{ height: '100%' }}>
            <Header title='Add Maintenance' showBellIcon={false} />
            <ScrollView>
                <View style={styles.btnView}>
                    <View style={styles.vehicleDetailView}>
                        <View style={styles.vehicleDetailInnerViewOne}>
                            <Text style={styles.vehicleDetailsTextOne}>Vehicle Details : </Text>
                        </View>
                        <View>
                            <Image source={{uri:vehicleDetail?.image}}
                                style={styles.vehicleImage} />
                            <Text style={{ color: 'grey', fontSize: width * 0.035, textAlign:'center' }}>{vehicleDetail?.vehicle_modal}</Text>
                        </View>
                    </View>
                    <View style={styles.vehicleDetailView}>
                        <View style={styles.vehicleDetailInnerViewTwo}>
                            <Text style={styles.vehicleDetailsText}>  license_plate :</Text>
                        </View>
                        <View style={styles.detailDiv}>
                            <Text style={{ color: 'black', fontSize: width * 0.04 }}>{vehicleDetail?.license_plate}</Text>
                        </View>
                    </View>
                    <View style={styles.vehicleDetailView}>
                        <View style={styles.vehicleDetailInnerViewTwo}>
                            <Text style={styles.vehicleDetailsText}>Horsepower :</Text>
                        </View>
                        <View style={styles.detailDiv}>
                            <Text style={{ color: 'black', fontSize: width * 0.04 }}>{vehicleDetail?.horsepower}</Text>
                        </View>
                    </View>
                    <View style={[styles.vehicleDetailView, { paddingBottom: 10 }]}>
                        <View style={styles.vehicleDetailInnerViewTwo}>
                            <Text style={styles.vehicleDetailsText}>Model colour :</Text>
                        </View>
                        <View style={styles.detailDiv}>
                            <Text style={{ color: 'black', fontSize: width * 0.04 }}>{vehicleDetail?.model_color}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.billDetail}>
                    <View style={styles.billDetailInner}>
                        <Text style={styles.billHead}>Bill Name : </Text>
                        <TextInput placeholder='Enter Bill Name' value={billName} onChangeText={(text) => setBillName(text)}  style={{color:'#000000', fontSize:16, fontWeight:'400', width:'60%'}}/>
                    </View>
                    <View style={styles.billDetailInner}>
                        <Text style={styles.billHead}>Bill Date : </Text>
                        <TextInput placeholder='Enter Bill Date' value={billDate} onChangeText={(text) => setBillDate(text)} keyboardType='decimal-pad'  style={{color:'#000000', fontSize:16, fontWeight:'400',width:'60%'}}/>
                    </View>
                    <View style={styles.billDetailInner}>
                        <Text style={styles.billHead}>Bill Amount : </Text>
                        <TextInput placeholder='Enter Bill Amount' value={billAmount} onChangeText={(text) => setBillAmount(text)} keyboardType='decimal-pad' style={{color:'#000000', fontSize:16, fontWeight:'400',width:'60%'}}/>
                    </View>
                    <View style={styles.billDetailInner}>
                        <Text style={styles.billHead}>Bill Type : </Text>
                        <TextInput placeholder='Enter Bill Type' value={billType} onChangeText={(text) => setBillType(text)} style={{color:'#000000', fontSize:16, fontWeight:'400',width:'60%'}}/>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.cameraView}
                        onPress={() => openCamera()}
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
                    <View style={{ alignSelf: 'center', marginTop: 10 , }}>
                        <Text style={{color:'#000000',fontSize:14, }}>No Image is selected</Text>
                    </View>
                )}

                <View style={styles.buttonsView}>
                    <TouchableOpacity style={styles.signBtn}
                        onPress={submitData}
                    >
                        <Text style={styles.signBtnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Loader visible={loading} />
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