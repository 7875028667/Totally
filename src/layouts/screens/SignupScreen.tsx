import { StyleSheet, Text, View, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'



const { width, height } = Dimensions.get('window');

const SignupScreen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../Images/bgimage.png')} style={styles.mainImagebg}>
                <View style={{}}>
                    <Image source={require('../../Images/background.png')}
                        style={{
                            width: width * 0.55,
                            height: height * 0.12,
                            resizeMode: 'cover',
                            marginTop: height * 0.35,
                            alignSelf: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />
                </View>
                <View style={styles.buttonsView}>
                    <TouchableOpacity style={styles.signBtn}>
                        <Text style={styles.signBtnText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signBtn}>
                        <Text style={styles.signBtnText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
       
    },
    mainImagebg: {
        width:'100%',
        height:'100%'
    },
    buttonsView: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '80%',
        marginLeft: '10%',
        marginTop:'10%',
    },
    signBtn: {
        backgroundColor: '#EBE206',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 20
    },
    signBtnText: {
        color: 'black',
        fontSize:width*0.052,
        // fontWeight:'bold'
    }
})