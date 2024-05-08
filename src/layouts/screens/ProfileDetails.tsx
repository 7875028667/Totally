import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button, ScrollView, TouchableOpacity, Platform, PermissionsAndroid, TextInput, Alert, } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ProfileHeader from '../../component/ProfileHeader';
import { FormPostMethod, getStorageData, storeData } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import Loader from '../../component/Loader';
import { useForm, Controller } from "react-hook-form"


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
    const { setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: ufirst_name, // Set default values to profile data received from route.params
            email: uemail,
            mobileNo: uphone,
            country: ucountry,
            address: uaddress
        }
    });



    const fetchUserDetails = async () => {
        setName(ufirst_name)
        setEmail(uemail)
        setCountry(ucountry)
        setMobileNo(uphone)
        setAddress(uaddress)
        setImageUri(uprofileImg)

    };

    useFocusEffect(
        useCallback(() => {
            fetchUserDetails()
        }, [])
    )


    const onSubmit = (data:any) => {
        SaveDetail(data)
    }


    const SaveDetail = async (data:any) => {
    console.log('adatat',data);
    
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('name', data?.name);
            formData.append('email', data?.email);
            formData.append('address', data?.address); +
            formData.append('country', data?.country);
            formData.append('phone', data?.mobileNo)
            formData.append('image', {
                uri: imageUri,
                type: 'image/jpg',
                name: 'profile.jpg'
            });
    
            console.log('formData', formData);


            const api: any = await FormPostMethod(`api/update-profile`, formData);
            // console.log('api', api);

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
                    profile_img: imageUri || existingUserData.data.user.profile_img

                }

                const updaatedUserData = {
                    ...existingUserData,
                    user: updateUserDetails
                }
                await storeData(updaatedUserData);


                setLoading(false)
                navigation.navigate('DrawerNavigator')

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
        <View style={{ backgroundColor: 'white', height: height * 1 }}>
            <ProfileHeader showBackIcon={true} showBellIcon={false} title='' showCamera={true} onPress={openCamera} image={imageUri} />

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: '30%', }}>
                <View style={styles.div}>
                    <View style={styles.iconView}>
                        <Text style={styles.viewHead}>Name</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name='name'
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.viewData, { paddingVertical: 3 }]}
                                    onChangeText={(text) => onChange(text)}
                                    value={value}
                                />
                            )}
                        />
                    </View>

                </View>
                {errors.email && errors.email.type === "required" && (
                    <View>
                        <Text style={{ color: 'red', fontSize: 14, marginLeft: 20 }}>Name is required.</Text>
                    </View>
                )}

                <View style={styles.div}>
                    <View style={styles.iconView}>
                        <Text style={styles.viewHead}>Email</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Controller
                            control={control}
                            name='email'
                            rules={{
                                required: true,
                                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.viewData, { paddingVertical: 3 }]}
                                    onChangeText={(text) => onChange(text)}
                                    value={value}
                                />
                            )}
                        />

                    </View>

                </View>
                {errors.email && errors.email.type === "required" && (
                    <View>
                        <Text style={{ color: 'red', fontSize: 14, marginLeft: 20 }}>Email is required.</Text>
                    </View>
                )}
                {errors.email && errors.email.type === "pattern" && (
                    <View >
                        <Text style={{ color: 'red', fontSize: 14, marginLeft: 20 }}>Email is not valid.</Text>
                    </View>
                )}

                <View style={styles.div}>
                    <View style={styles.iconView}>
                        <Text style={styles.viewHead}>Mobile no.</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Controller
                            control={control}
                            name='mobileNo'
                            rules={{
                                required: true,
                                maxLength: 10,
                                pattern: /^[0-9]*$/
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.viewData, { paddingVertical: 3 }]}
                                    onChangeText={(text) => onChange(text)}
                                    value={value}
                                />
                            )}
                        />
                    </View>
                </View>
                {errors.mobileNo && errors.mobileNo.type === "required" && (
                    <View >
                        <Text style={{ color: 'red', fontSize: 14, marginLeft: 20 }}>Mobile Number is required.</Text>
                    </View>
                )}
                {errors.mobileNo && errors.mobileNo.type === "maxLength" && (
                    <View >
                        <Text style={{ color: 'red', fontSize: 14, marginLeft: 20 }}>
                            Mobile Number should be  10 characters.
                        </Text>
                    </View>
                )}
                {errors.mobileNo && errors.mobileNo.type === "pattern" && (
                    <View >
                        <Text style={{ color: 'red', fontSize: 14, marginLeft: 20 }}>Only Number is Accepted </Text>
                    </View>
                )}

                <View style={styles.div}>
                    <View style={styles.iconView}>
                        <Text style={styles.viewHead}>Country</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Controller
                            control={control}
                            name='country'
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.viewData, { paddingVertical: 3 }]}
                                    onChangeText={(text) => onChange(text)}
                                    value={value}
                                />
                            )}
                        />
                    </View>

                </View>
                {errors.country && errors.country.type === "required" && (
                    <View>
                        <Text style={{ color: 'red', fontSize: 14, marginLeft: 20 }}>Country Name is  required.</Text>
                    </View>
                )}

                <View style={styles.div}>
                    <View style={styles.iconView}>
                        <Text style={styles.viewHead}>Address</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Controller
                            control={control}
                            name='address'
                            rules={{
                                required: true
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.viewData, { paddingVertical: 3 }]}
                                    onChangeText={(text) => onChange(text)}
                                    value={value}
                                />
                            )}
                        />
                    </View>

                </View>
                {errors.address && errors.address.type === "required" && (
                    <View>
                        <Text style={{ color: 'red', fontSize: 14, marginLeft: 20 }}>Address is  required.</Text>
                    </View>
                )}

                <View style={styles.buttonsView}>
                    <TouchableOpacity style={styles.signBtn} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.signBtnText}>Save</Text>
                    </TouchableOpacity>
                </View>
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
    viewHead: {
        color: '#363535',
        fontSize: 14,
        fontWeight: '500'
    },
    detailsView: {
        width: '70%',
        alignSelf: 'center',
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '2.5%',
    },
    viewData: {
        color: '#363535',
        fontWeight: '500',
        fontSize: 16
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
})