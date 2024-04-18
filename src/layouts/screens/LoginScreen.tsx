import { StyleSheet, Text, View, Dimensions, ImageBackground, Image, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native'
import React, { FC, useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { postMethod, storeData } from '../../utils/helper';
import Snackbar from 'react-native-snackbar';
import Loader from '../../component/Loader';
import { useForm, Controller } from "react-hook-form"
import Feather from 'react-native-vector-icons/Feather';



const { width, height } = Dimensions.get('window');
interface Props {

}


const LoginScreen: FC<Props> = () => {
    const navigation = useNavigation();

    // const [isLoading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        Login(data)
    }


    const Login = async (props: any) => {
        const raw = {
            email: props.email,
            password: props.password,
        }
        
        try {
            // setLoading(true);
            const api: any = await postMethod(`api/login`, raw);
            
            if (api.data.status === true) {
                // setLoading(false);
                await storeData(api.data)
                Snackbar.show({
                    text: 'Login Succesfully',
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: 'white',
                    backgroundColor: 'green',
                });
                navigation.navigate('DrawerNavigator')
            } else {
                // setLoading(false);
                Snackbar.show({
                    text: api.data.message,
                    duration: Snackbar.LENGTH_LONG,
                    textColor: '#AE1717',
                    backgroundColor: '#F2A6A6',
                });
                
            }
            
        }
        catch (e) {
            console.log('catch error', e);
        }
    }


    const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm({
        defaultValues: {
            email: '',
            password: '',

        }
    });

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../Images/loginbg.png')} style={styles.mainImagebg}>
                <View style={styles.loginBox}>
                    <View>
                        <View style={styles.inputView}>
                            <View style={styles.inputarea}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                            <IonIcon name="person" color={'black'} size={width * 0.06}
                                                style={styles.icon}
                                            />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Username or Email"
                                                underlineColorAndroid="transparent"
                                                value={value}
                                                onChangeText={(text) => onChange(text)}
                                            />
                                        </>
                                    )}
                                    name="email"

                                />
                            </View>
                            {errors.email && errors.email.type === "required" && (
                                <View style={{ flexDirection: 'row', marginTop: 7 }}>
                                    <Feather
                                        name="alert-circle"
                                        size={9}
                                        color='red'
                                        style={{ marginRight: 4, marginTop: -3 }} />
                                    <Text style={styles.error}>Email is required.</Text>
                                </View>
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <View style={{ flexDirection: 'row', marginTop: 7 }}>
                                    <Feather
                                        name="alert-circle"
                                        size={9}
                                        color='red'
                                        style={{ marginRight: 4, marginTop: -3 }} />

                                    <Text style={styles.error}>Email is not valid.</Text>
                                </View>
                            )}

                        </View>


                        <View style={styles.inputView}>
                            <View style={styles.inputarea}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        minLength: 6,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                            <IonIcon name="lock-closed" color={'black'} size={width * 0.06}
                                                style={styles.icon}
                                            />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Password"
                                                underlineColorAndroid="transparent"
                                                value={value}
                                                onChangeText={(text) => onChange(text)}
                                            />
                                        </>
                                    )}
                                    name="password"
                                />
                            </View>
                            {errors.password && errors.password.type === "required" && (
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Feather
                                        name="alert-circle"
                                        size={9}
                                        color='red'
                                        style={{ marginRight: 4, marginTop: -3 }} />
                                    <Text style={styles.error}>Password is required.</Text>
                                </View>
                            )}
                            {errors.password && errors.password.type === "minLength" && (
                                <View style={{ flexDirection: 'row', marginTop: 7 }}>
                                    <Feather
                                        name="alert-circle"
                                        size={9}
                                        color='red'
                                        style={{ marginRight: 4, marginTop: -3 }} />
                                    <Text style={styles.error}>
                                        Password should be at least 6 characters.
                                    </Text>
                                </View>
                            )}
                        </View>

                    </View>


                    <TouchableOpacity style={styles.signBtn} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.signBtnText}>Log In</Text>
                    </TouchableOpacity>

                    <View>
                        <Text style={{ marginTop: '3%', color: 'black' }}>
                            New user ?{' '}
                            <Text style={{ fontWeight: 'bold', color: '#49AA67' }}>Register</Text>
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            {/* <Loader visible={isLoading} /> */}
        </View>
    )
}


export default LoginScreen


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',

    },
    mainImagebg: {
        width: '100%',
        height: '100%'
    },
    loginBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signBtn: {
        marginTop: 40,
        backgroundColor: '#EBE206',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,

    },
    signBtnText: {
        color: 'black',
        fontSize: width * 0.052,
        fontWeight: 'bold',
    },
    inputView: {
        marginTop: '5%',
    },
    inputarea: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        width: width * 0.8,
        paddingLeft: 10,
        borderRadius: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        borderColor: 'lightgrey',
        borderWidth: 1,
    },
    input: {
        flex: 1,
        fontSize: width * 0.045,
        width: "90%",
        color: 'grey',
        marginLeft: "5%",
        borderWidth: 0,
        // outlineWidth: 1,
    },
    error: {
        color: 'red',
        fontSize: 10,
        marginTop: -5
    },
    errorMsgText: {
        color: 'red',
        marginLeft: 20
    },
    icon: {
        marginTop: '5%'
    },
})